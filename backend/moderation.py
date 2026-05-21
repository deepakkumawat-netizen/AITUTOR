"""Lightweight content moderation for student input.
Blocks sexual, abusive, violent, and harmful content (English + Hindi).
"""
import re

# Keep this list non-exhaustive — Groq's system prompt also enforces topic guardrails.
BLOCKED_PATTERNS = [
    # Sexual / explicit
    r"\bsex\w*", r"\bporn\w*", r"\bnud\w*", r"\bxxx\b", r"\bnaked\b",
    # Profanity (English)
    r"\bfuck\w*", r"\bshit\w*", r"\basshole\w*", r"\bbitch\w*", r"\bbastard\w*",
    r"\bdick\w*", r"\bcunt\w*", r"\bwhore\w*",
    # Profanity (Hindi-Latin transliteration)
    r"\bbsdk\b", r"\bmadarchod\w*", r"\bbehnchod\w*", r"\bchutiy\w*", r"\bgaand\w*",
    r"\brand\w*", r"\bharami\w*", r"\bkutt[ae]\b", r"\bsaal[ae]\b",
    # Violent / harmful
    r"\bkill (myself|me|him|her|them)\b", r"\bsuicide\b", r"\bbomb\w+ (make|build)\b",
    r"\bhow to (make|build) (a )?bomb\b", r"\bdrug\w* (make|sell|buy)\b",
    # Hate
    r"\bnigger\w*", r"\bfaggot\w*",
]

_compiled = [re.compile(p, re.IGNORECASE) for p in BLOCKED_PATTERNS]


def is_inappropriate(text: str) -> bool:
    if not text:
        return False
    return any(p.search(text) for p in _compiled)
