#!/usr/bin/env python3
"""Patch the live Muse Vault Sanity post: proper portable text body with CTA
buttons, excerpt, author, category, tags.

Usage: SANITY_WRITE_TOKEN=<token> python3 patch-muse-vault-post.py [--dry-run]

The token is a Sanity API token with Editor+ rights on project k74pcbpp /
dataset production. Never stored — passed via env only.
"""
import json
import os
import re
import secrets
import sys
import urllib.request

PROJECT = "k74pcbpp"
DATASET = "production"
API = "2026-10-01"
POST_ID = "818f7275-e3a0-4c49-b941-1f82fa8249a4"
DRAFT = os.path.expanduser("~/workspace/muse-vault-blog/muse-vault-launch-post-draft.md")

DRY = "--dry-run" in sys.argv


def key():
    return secrets.token_hex(6)


def inline_spans(text, mark_defs):
    """Parse **bold**, *italic*, [text](url) into portable text spans."""
    spans = []
    pos = 0
    pattern = re.compile(
        r"(\*\*(.+?)\*\*)|(\*(.+?)\*)|(\[([^\]]+)\]\(([^)]+)\))"
    )
    for m in pattern.finditer(text):
        if m.start() > pos:
            spans.append(
                {"_type": "span", "_key": key(), "text": text[pos:m.start()], "marks": []}
            )
        if m.group(2) is not None:  # bold
            spans.append(
                {"_type": "span", "_key": key(), "text": m.group(2), "marks": ["strong"]}
            )
        elif m.group(4) is not None:  # italic
            spans.append(
                {"_type": "span", "_key": key(), "text": m.group(4), "marks": ["em"]}
            )
        else:  # link
            lk = key()
            mark_defs.append({"_type": "link", "_key": lk, "href": m.group(7)})
            spans.append(
                {"_type": "span", "_key": key(), "text": m.group(6), "marks": [lk]}
            )
        pos = m.end()
    if pos < len(text):
        spans.append(
            {"_type": "span", "_key": key(), "text": text[pos:], "marks": []}
        )
    return spans


def block(style, text):
    mark_defs = []
    return {
        "_type": "block",
        "_key": key(),
        "style": style,
        "markDefs": mark_defs,
        "children": inline_spans(text, mark_defs),
    }


def bullet(text):
    b = block("normal", text)
    b["listItem"] = "bullet"
    b["level"] = 1
    return b


def draft_to_portable(md):
    lines = md.splitlines()
    # Strip front header (title + status + ---) and trailing draft notes.
    start = 0
    for i, ln in enumerate(lines):
        if ln.strip() == "---":
            start = i + 1
            break
    end = len(lines)
    for i, ln in enumerate(lines):
        if ln.startswith("*Draft notes"):
            end = i
            break
    body_lines = [l for l in lines[start:end]]

    blocks = []
    para: list[str] = []

    def flush():
        if para:
            blocks.append(block("normal", " ".join(para).strip()))
            para.clear()

    for ln in body_lines:
        s = ln.strip()
        if not s:
            flush()
            continue
        if s.startswith("## "):
            flush()
            blocks.append(block("h2", s[3:].strip()))
        elif s.startswith("- "):
            flush()
            blocks.append(bullet(s[2:].strip()))
        elif (m := re.match(r"\[BUTTON:\s*(\w+)\]\s*(.+?)\s*→\s*(\S+)", s)):
            flush()
            variant, text, url = m.group(1), m.group(2), m.group(3)
            blocks.append(
                {
                    "_type": "ctaButton",
                    "_key": key(),
                    "text": text,
                    "url": url,
                    "variant": variant,
                }
            )
        else:
            para.append(s)
    flush()
    return blocks


def main():
    md = open(DRAFT).read()
    body = draft_to_portable(md)
    print(f"converted: {len(body)} blocks "
          f"({sum(1 for b in body if b['_type'] == 'ctaButton')} ctaButtons)")

    mutations = [
        {
            "createIfNotExists": {
                "_id": "author-steve-peele-ii",
                "_type": "author",
                "name": "Steve Peele II",
                "slug": {"_type": "slug", "current": "steve-peele-ii"},
                "title": "Growth operator, musician, builder",
            }
        },
        {
            "createIfNotExists": {
                "_id": "category-ai",
                "_type": "category",
                "name": "AI",
                "slug": {"_type": "slug", "current": "ai"},
                "description": "AI tools, prompts, and workflows.",
            }
        },
        {
            "patch": {
                "id": POST_ID,
                "set": {
                    "body": body,
                    "excerpt": "I kept rewriting the same Muse prompts every morning. So I built the shelf: Muse Vault, a free gallery of 98 battle-tested templates — system prompts, skills, crons, and workflows.",
                    "tags": ["muse", "ai", "templates", "productivity"],
                    "author": {"_type": "reference", "_ref": "author-steve-peele-ii"},
                    "categories": [{"_type": "reference", "_ref": "category-ai"}],
                },
            }
        },
    ]

    if DRY:
        print(json.dumps(mutations, indent=1)[:1500])
        print("... dry run, not sending")
        return

    token = os.environ.get("SANITY_WRITE_TOKEN")
    if not token:
        print("SANITY_WRITE_TOKEN env var required", file=sys.stderr)
        sys.exit(2)

    req = urllib.request.Request(
        f"https://{PROJECT}.api.sanity.io/v{API}/data/mutate/{DATASET}",
        data=json.dumps({"mutations": mutations}).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        result = json.load(resp)
    print(json.dumps(result, indent=1)[:1000])


if __name__ == "__main__":
    main()
