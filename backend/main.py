import base64
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
    1:  ("Use very simple words a 6-7 year old can understand. Short sentences (5-8 words). "
         "Be playful, warm, and use LOTS of emojis (🐱 📦 ✨ 🌈 🎈 ⭐ 🎉). Use child-friendly analogies "
         "(toys, animals, family, food). Sound effects like 'Boom!', 'Yay!' make it fun."),
    2:  ("Use simple words a 7-8 year old understands. Short sentences. "
         "Use emojis often (📚 🌟 🎨 🐰). Give examples from playground, school, and home."),
    3:  ("Simple vocabulary, short paragraphs. Use emojis (✏️ 🌳 🎯 📖). "
         "Give concrete examples from a 8-9 year old's daily life."),
    4:  ("Clear simple language with some new words explained gently. Use emojis where helpful (🔬 📊 🗺️). "
         "Give school-life and nature examples."),
    5:  ("Plain language with brief explanations. Use emojis selectively (🧪 📐 🌍). "
         "Use bullet points and short examples. Introduce key terms with simple definitions."),
    6:  ("Clear language with subject-specific terms (define each on first use). Use emojis sparingly. "
         "Include step-by-step examples and short formulas in code blocks."),
    7:  ("Moderate complexity. Define new terms inline. Use examples, analogies, and ASCII diagrams. "
         "Include important formulas with explanations."),
    8:  ("Standard school language with clear definitions and worked examples. "
         "Use diagrams (ASCII) and tables for comparisons."),
    9:  ("Academic but clear. Use proper terminology. Provide structured explanations with diagrams, "
         "formulas, and worked-out problems where relevant."),
    10: ("Clear board-exam level depth. Definitions, formulas, derivations, worked examples. "
         "Use markdown tables and ASCII diagrams to organize information."),
    11: ("Detailed and precise. Use proper subject terminology and notation throughout. "
         "Include derivations, formulas in code blocks, and step-by-step worked problems."),
    12: ("Comprehensive board-exam level. Use proper terminology, derivations, formula tables. "
         "Structure with markdown headings and worked examples in detail."),
}

CONTENT_GUARD = (
    "IMPORTANT: Only respond to educational questions related to school subjects. "
    "Do NOT generate any inappropriate, sexual, violent, or harmful content. "
    "If the question is not related to education or learning, politely decline and redirect to studies."
)

STRUCTURE_GUIDE = (
    "\n\nCONTENT STRUCTURE (always follow this layout — output markdown only):\n"
    "1. **Intro line** with 1-2 emojis matching the topic\n"
    "2. **## What is it?** — clear definition in 1-2 sentences\n"
    "3. **## Key Ideas** — numbered list of the main concepts (one idea per line, bold the term)\n"
    "4. **## Examples** — 2-3 simple examples relevant to the grade level\n"
    "5. If the topic involves comparison, process, geometry, or hierarchy, include a simple "
    "ASCII diagram or flowchart inside a ```code block``` (e.g. inside/outside, water cycle, food chain, "
    "triangle types, etc.)\n"
    "6. **## Remember!** — 2-3 short bullet points of key takeaways\n"
    "\nFORMATTING RULES:\n"
    "- Use markdown headings (##, ###), **bold** for key terms, bullet points, and tables where helpful\n"
    "- For formulas/equations, use inline `code` or fenced ```code blocks```\n"
    "- For diagrams, use simple ASCII art in ```code blocks``` — only when the topic naturally has a visual\n"
    "- Use emojis appropriate to the grade and subject (more emojis for Grade 1-5, fewer for Grade 9-12)\n"
    "- NEVER write a wall of plain text — always break content into short readable chunks\n"
)


class HistoryMsg(BaseModel):
    role: str  # 'user' or 'assistant'
    content: str


class ChatRequest(BaseModel):
    message: str
    grade: str
    subject: str = ""
    tool: str
    topic: str = ""             # optional specific chapter/topic title (for concept)
    format: str = "default"     # summarizer format (e.g. 2_paragraphs, bullets, notes...)
    focus: str = ""             # optional focus keyword/tag for summarizer
    history: list[HistoryMsg] = []  # prior turns in this conversation


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


MAX_IMAGE_BYTES = 4 * 1024 * 1024  # 4 MB (vision API has size limit)


@app.post("/api/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    """Send image to Groq's vision model and return extracted text + description."""
    if not (file.content_type or "").startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload an image file (JPG, PNG, etc.)")

    data = await file.read()
    if len(data) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Image too large (max 4MB). Please compress or crop it.")

    mime = file.content_type or "image/jpeg"
    img_b64 = base64.b64encode(data).decode("utf-8")

    try:
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": (
                        "You are helping a student study from this image. "
                        "Extract ALL text visible in the image word-for-word. "
                        "If the image contains diagrams, formulas, or figures, also describe them clearly. "
                        "If there is no text, describe the image in detail so the student can study from it. "
                        "Output only the extracted/described content — no preamble."
                    )},
                    {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{img_b64}"}}
                ]
            }],
            max_tokens=1500,
            temperature=0.3,
        )
        text = (response.choices[0].message.content or "").strip()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Could not analyze image: {str(e)[:120]}")

    if not text:
        raise HTTPException(status_code=400, detail="Could not extract anything useful from this image")

    return {"text": text, "filename": file.filename}


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

    topic_line = (
        f" The student has chosen the chapter: '{req.topic}'. "
        f"Explain it strictly following the CBSE {req.grade} {req.subject} syllabus pattern: "
        f"start with a clear definition or introduction, then explain the key concepts in order, "
        f"give simple examples or worked-out steps where relevant, and finish with important points to remember."
    ) if req.topic else ""

    if req.tool == "summarizer":
        # Document-only on the FIRST turn. Once a document has been summarized,
        # follow-up questions can be short ("summarize about management", "explain
        # the database part more", etc.) because the document is in conversation context.
        has_history = len(req.history) > 0
        if not has_history and len(req.message.strip()) < 100:
            return {
                "response": "📄 The AI Summarizer works only with documents. Please upload a PDF/image/text file, or paste at least one paragraph of study material to summarize.",
                "blocked": False,
            }

        LENGTH_INSTRUCTIONS = {
            "1_paragraph":  "Summarize in exactly 1 paragraph.",
            "2_paragraphs": "Summarize in exactly 2 paragraphs.",
            "3_paragraphs": "Summarize in exactly 3 paragraphs.",
            "4_paragraphs": "Summarize in exactly 4 paragraphs.",
            "5_paragraphs": "Summarize in exactly 5 paragraphs.",
            "bullets":      "Summarize as a list of concise bullet points (use `- ` for each point). Include 5-8 bullets.",
            "notes":        "Summarize in notes format: use markdown `## SECTION HEADINGS` (in ALL CAPS) followed by brief bullet points under each, like structured study notes.",
            "short":        "Summarize in 2-3 sentences only. Be extremely concise.",
            "medium":       "Summarize in 1-2 paragraphs (5-8 sentences). Capture key ideas.",
            "long":         "Write a detailed summary in 3-4 paragraphs covering all main points.",
        }
        style = LENGTH_INSTRUCTIONS.get(req.format, LENGTH_INSTRUCTIONS["2_paragraphs"])

        # Focus keyword/tag filter — when present, the summary zooms in on those terms
        focus_block = ""
        if req.focus.strip():
            focus_block = (
                f"\nFOCUS FILTER: The student wants the summary focused specifically on "
                f"these keywords/tags: '{req.focus.strip()}'. "
                f"Extract and summarize ONLY the parts of the document that relate to these "
                f"keywords. Ignore unrelated sections. If the document does not mention these "
                f"keywords, say so clearly in one line.\n"
            )

        system = (
            f"You are a world-class text summarizer for a CBSE {req.grade} student. {profile}\n\n"
            f"SUMMARIZE THE PROVIDED DOCUMENT following these rules:\n"
            f"- Only include information present in the original text — never add outside knowledge\n"
            f"- Never repeat the same idea twice, even in different words\n"
            f"- Use active voice and specific, concrete language\n"
            f"- Start directly with the content — never begin with 'This text discusses...'\n"
            f"- Match the exact format requested\n"
            f"- Return ONLY the summary — no labels, no preamble, no sign-off\n\n"
            f"RICH MARKDOWN OUTPUT (always use these):\n"
            f"- Wrap KEY TERMS in **bold** so the student can spot them quickly\n"
            f"- Use markdown ## headings for sections (especially in notes format)\n"
            f"- Use `code spans` for formulas/equations/specific values\n"
            f"- Use ```code blocks``` for any ASCII diagram or flowchart that helps comprehension\n"
            f"- Use bullet lists (`- `) for enumerations\n"
            f"- Use 1-2 relevant emojis for visual cues in headings (📚 📊 ⚡ 🔬 etc.)\n\n"
            f"FORMAT: {style}\n{focus_block}"
            f"{CONTENT_GUARD}"
        )
    else:
        system = (
            f"You are a friendly AI tutor for a {req.grade} student studying {req.subject} (CBSE curriculum). "
            f"{profile}{topic_line} "
            f"Explain concepts clearly. {STRUCTURE_GUIDE}"
            f"{CONTENT_GUARD}{rag_block}"
        )

    # Build messages array with prior conversation context (last 6 turns)
    messages = [{"role": "system", "content": system}]
    for h in (req.history or [])[-6:]:
        if h.role in ("user", "assistant") and h.content:
            messages.append({"role": h.role, "content": h.content})
    messages.append({"role": "user", "content": req.message})

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=1200,
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
