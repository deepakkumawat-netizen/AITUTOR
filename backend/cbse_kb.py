"""CBSE curriculum RAG knowledge base — loaded from cbse_toc.json
(generated from GRADE Wise TOC.xlsx by extract_toc.py).

Each entry under CBSE_KB[grade][subject] is a list of chapters:
    {ch, title, concepts, unit?, stream?}
"""
import json
import os

_HERE = os.path.dirname(__file__)
_TOC = os.path.join(_HERE, "cbse_toc.json")

with open(_TOC, encoding="utf-8") as _f:
    CBSE_KB = json.load(_f)


STOP_WORDS = {
    "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
    "to", "of", "in", "on", "at", "by", "for", "with", "about", "as",
    "i", "you", "he", "she", "it", "we", "they", "what", "where", "when",
    "why", "how", "which", "who", "this", "that", "these", "those",
    "and", "or", "but", "if", "then", "so", "than", "do", "does", "did",
    "have", "has", "had", "can", "could", "will", "would", "should", "may",
    "me", "my", "your", "his", "her", "us", "them", "explain", "tell",
    "give", "show", "please", "chapter",
}


def _tokenize(text):
    text = (text or "").lower()
    words = "".join(c if c.isalnum() or c.isspace() else " " for c in text).split()
    return {w for w in words if len(w) > 2 and w not in STOP_WORDS}


def get_subjects(grade):
    """Subjects available for a grade (as a list)."""
    return list(CBSE_KB.get(grade, {}).keys())


def get_chapters(grade, subject):
    """All chapters under a grade+subject."""
    return CBSE_KB.get(grade, {}).get(subject, [])


def get_topics(grade, subject):
    """Unique unit/stream labels under a grade+subject. Empty list if subject is flat."""
    chapters = get_chapters(grade, subject)
    topics = []
    seen = set()
    for ch in chapters:
        label = ch.get("unit") or ch.get("stream")
        if label and label not in seen:
            seen.add(label)
            topics.append(label)
    return topics


def retrieve_context(query, grade, subject, top_k=3):
    """Return top-k most relevant CBSE chapters as a formatted context string.

    `query` can be a free-text question OR a chapter title (when the student
    has picked one from the popup) — in both cases we do keyword overlap with
    title + concepts to find the most relevant entries.
    """
    chapters = get_chapters(grade, subject)
    if not chapters:
        return ""

    q_tokens = _tokenize(query)
    if not q_tokens:
        return ""

    scored = []
    for ch in chapters:
        text = (ch.get("title", "") + " " + ch.get("concepts", "")
                + " " + ch.get("unit", "") + " " + ch.get("stream", ""))
        ch_tokens = _tokenize(text)
        score = len(q_tokens & ch_tokens)
        if score > 0:
            scored.append((score, ch))

    scored.sort(key=lambda x: x[0], reverse=True)
    top = scored[:top_k]
    if not top:
        return ""

    lines = [f"Relevant CBSE {grade} {subject} curriculum context:"]
    for _, ch in top:
        unit = ch.get("unit") or ch.get("stream")
        unit_str = f" (Unit/Stream: {unit})" if unit else ""
        lines.append(f"- {ch['ch']}: {ch['title']}{unit_str} — {ch.get('concepts','')}")
    return "\n".join(lines)
