"""Export the versioned topic research as printable PDF reports."""

import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "due-diligence"
INK = colors.HexColor("#171717")
MUTED = colors.HexColor("#525252")
BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=10, leading=14, textColor=INK, spaceAfter=5)
META = ParagraphStyle("meta", parent=BODY, fontSize=9, leading=12, textColor=MUTED)
TITLE = ParagraphStyle("title", parent=BODY, fontName="Times-Bold", fontSize=30, leading=34, spaceAfter=8)
HEADING = ParagraphStyle(
    "section", parent=BODY, fontName="Helvetica-Bold", spaceBefore=7, keepWithNext=True
)


def paragraph(text, style=BODY):
    return Paragraph(escape(text.replace("–", "-").replace("—", "-")), style)


def footer(canvas, document):
    width, _ = A4
    canvas.setStrokeColor(colors.HexColor("#D4D4D4"))
    canvas.line(document.leftMargin, 43, width - document.rightMargin, 43)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(document.leftMargin, 30, "NEXUS  /  TOPIC RESEARCH")
    canvas.drawRightString(width - document.rightMargin, 30, str(document.page))


def export_topic(topic):
    slug = topic["slug"]
    if not re.fullmatch(r"[a-z0-9-]+", slug):
        raise ValueError(f"Invalid topic slug: {slug}")

    document = SimpleDocTemplate(
        str(OUTPUT / f"{slug}.pdf"), pagesize=A4, leftMargin=49, rightMargin=49,
        topMargin=44, bottomMargin=60, title=f'{topic["name"]} | Nexus due diligence',
        author="NexusNews", invariant=1,
    )
    story = [
        paragraph("NEXUS  /  DUE DILIGENCE", META),
        paragraph(topic["name"], TITLE),
        paragraph(f'{topic["category"]}  /  Research snapshot: {topic["updated"]}', META),
        paragraph(topic["definition"]),
    ]
    sections = [
        ("What is happening?", [topic["happening"]]),
        ("Why it matters", [topic["why"]]),
        ("Risk assessment", [topic["risk"]]),
        ("What to monitor", [f"{index:02d}  {item}" for index, item in enumerate(topic["monitor"], 1)]),
        ("Timeline", [f'{item["year"]}  {item["event"]}' for item in topic["timeline"]]),
        ("Sources and limitations", [
            "Sources listed in the original topic: " + ", ".join(topic["sources"]) + ".",
            "This edition reproduces the existing NexusNews topic research as of the date above. "
            "It is a structured synthesis. Figures on the topic page are illustrative.",
        ]),
    ]
    for heading, lines in sections:
        story.append(paragraph(heading, HEADING))
        story.extend(paragraph(line) for line in lines)
    document.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for source in sorted((ROOT / "content" / "topics").glob("*.json")):
        export_topic(json.loads(source.read_text(encoding="utf-8")))
