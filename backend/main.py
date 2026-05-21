import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI(title="AI Tutor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── API routes (defined first so they take precedence over catch-all) ──

@app.get("/api/health")
def health():
    return {"status": "ok"}


# ── Serve React frontend ──

DIST = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(DIST):
    # Serve Vite's hashed assets (JS/CSS)
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST, "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        # Serve exact file if it exists (favicon, icons, etc.)
        candidate = os.path.join(DIST, full_path)
        if full_path and os.path.isfile(candidate):
            return FileResponse(candidate)
        # Fallback: let React Router handle the path
        return FileResponse(os.path.join(DIST, "index.html"))
