import io
import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from pypdf import PdfReader
from .cbse_kb import CBSE_KB, retrieve_context
from .moderation import is_inappropriate

load_dotenv()

app = FastAPI(title="AI Tutor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

GRADE_PROFILES = {
    1:  "Use very simple words. Short sentences (5-8 words). One idea at a time. Fun and friendly tone.",
    2:  "Use simple words. Short sentences. Relatable examples from daily life.",
    3:  "Simple vocabulary. Use short paragraphs. Give one clear example.",
    4:  "Clear simple language. Use examples from school life. Avoid jargon.",
    5:  "Plain language. Brief explanations. Use bullet points where helpful.",
    6:  "Clear language. Introduce subject-specific terms with simple definitions.",
    7:  "Moderate complexity. Define new terms. Use examples and analogies.",
    8:  "Standard school language. Explain with definitions and examples.",
    9:  "Academic but clear. Use proper terminology. Structured explanation.",
    10: "Clear academic language. Board-exam level depth. Use definitions and examples.",
    11: "Detailed and precise. Use subject-specific terminology. Analytical tone.",
    12: "High school level. Comprehensive. Use proper subject terminology throughout.",
}

CONTENT_GUARD = (
    "IMPORTANT: Only respond to educational questions related to school subjects. "
    "Do NOT generate any inappropriate, sexual, violent, or harmful content. "
    "If the question is not related to education or learning, politely decline and redirect to studies."
)


class ChatRequest(BaseModel):
    message: str
    grade: str
    subject: str = ""
    tool: str
    topic: str = ""             # optional specific chapter/topic title
    format: str = "default"     # "notes" | "paragraph" | "default" (for summarizer)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/curriculum")
def curriculum():
    """Return the grade -> subject -> [{ch, title, concepts}] map so frontend
    can show grade-specific subjects and topic pickers."""
    return CBSE_KB


MAX_PDF_BYTES = 10 * 1024 * 1024  # 10 MB
MAX_EXTRACTED_CHARS = 30_000      # cap text sent back so AI prompt stays reasonable


@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    data = await file.read()
    if len(data) > MAX_PDF_BYTES:
        raise HTTPException(status_code=413, detail="PDF too large (max 10MB)")

    try:
        reader = PdfReader(io.BytesIO(data))
        text_parts = []
        total = 0
        for page in reader.pages:
            page_text = page.extract_text() or ""
            text_parts.append(page_text)
            total += len(page_text)
            if total >= MAX_EXTRACTED_CHARS:
                break
        text = "\n\n".join(text_parts).strip()[:MAX_EXTRACTED_CHARS]
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read PDF: {str(e)[:120]}")

    if not text:
        raise HTTPException(status_code=400, detail="No readable text found in this PDF (it may be a scanned image)")

    return {"text": text, "pages": len(reader.pages), "filename": file.filename}


@app.post("/api/chat")
async def chat(req: ChatRequest):
    # Content moderation check — block inappropriate input before sending to Groq
    if is_inappropriate(req.message):
        return {
            "response": "Let's keep our conversation focused on learning. Please ask a question related to your studies.",
            "blocked": True,
        }

    grade_num = int(req.grade.replace("Grade ", "").strip()) if req.grade.replace("Grade ", "").strip().isdigit() else 5
    profile = GRADE_PROFILES.get(grade_num, GRADE_PROFILES[5])

    # If the student picked a specific topic from the popup, search that title
    # against the KB first to get exact-chapter context; otherwise keyword-match the message.
    rag_query = req.topic if req.topic else req.message
    rag_context = retrieve_context(rag_query, req.grade, req.subject) if req.subject else ""
    rag_block = f"\n\n{rag_context}\n\nUse this curriculum context to ground your answer when relevant.\n" if rag_context else ""

    topic_line = f" The student has chosen the chapter: '{req.topic}'. Focus your answer on this chapter." if req.topic else ""

    if req.tool == "summarizer":
        if req.format == "notes":
            style = "Present the summary as short bullet-point notes (one idea per bullet, easy to revise from). Group related points under bold headings."
        elif req.format == "paragraph":
            style = "Present the summary as 1-2 flowing paragraphs (no bullets). Keep it concise and readable."
        else:
            style = "Use bullet points for key points. Keep it short and easy to understand."

        focus = f" The student wants you to focus specifically on this topic from the text: '{req.message.split(chr(10))[0][:120]}'." if req.topic else ""

        system = (
            f"You are an AI summarizer for a {req.grade} student. {profile} "
            f"Summarize the provided text in a clear way appropriate for {req.grade}. {style}{focus} "
            f"{CONTENT_GUARD}{rag_block}"
        )
    else:
        system = (
            f"You are a friendly AI tutor for a {req.grade} student studying {req.subject} (CBSE curriculum). "
            f"{profile}{topic_line} "
            f"Explain the concept clearly and thoroughly. Use simple examples. "
            f"If relevant, mention how it fits in the CBSE {req.grade} {req.subject} syllabus. "
            f"{CONTENT_GUARD}{rag_block}"
        )

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": req.message},
            ],
            max_tokens=600,
            temperature=0.7,
        )
        return {"response": response.choices[0].message.content, "blocked": False}
    except Exception as e:
        return {"response": f"Sorry, I couldn't get a response right now. Please try again. ({str(e)[:80]})", "blocked": False}


# ── Serve React frontend ──

DIST = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST, "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        candidate = os.path.join(DIST, full_path)
        if full_path and os.path.isfile(candidate):
            return FileResponse(candidate)
        return FileResponse(os.path.join(DIST, "index.html"))
