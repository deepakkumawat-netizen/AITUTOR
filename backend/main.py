import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

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
    subject: str
    tool: str


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/chat")
async def chat(req: ChatRequest):
    grade_num = int(req.grade.replace("Grade ", "").strip()) if req.grade.replace("Grade ", "").strip().isdigit() else 5
    profile = GRADE_PROFILES.get(grade_num, GRADE_PROFILES[5])

    if req.tool == "summarizer":
        system = (
            f"You are an AI summarizer for a {req.grade} student. {profile} "
            f"Summarize the provided text in a clear, concise way appropriate for {req.grade}. "
            f"Use bullet points for key points. Keep it short and easy to understand. "
            f"{CONTENT_GUARD}"
        )
    else:
        system = (
            f"You are a friendly AI tutor for a {req.grade} student studying {req.subject} (CBSE curriculum). "
            f"{profile} "
            f"Explain the concept clearly and thoroughly. Use simple examples. "
            f"If relevant, mention how it fits in the CBSE {req.grade} {req.subject} syllabus. "
            f"{CONTENT_GUARD}"
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
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"response": f"Sorry, I couldn't get a response right now. Please try again. ({str(e)[:80]})"}


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
