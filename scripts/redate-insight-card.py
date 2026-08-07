#!/usr/bin/env python3
"""Repaint the five dates inside the homepage insight-card artwork (mbz-et8e.53).

The card is a raster Manu supplied, and it carries its date in five places: once
beside the COMPETITOR LAUNCH label and once under each of the four sources. They
were fifteen months stale and only he could re-render them, which is why they sat
open for weeks. This paints them instead. Run it again when they go stale, or
after any re-render from him, rather than editing pixels by hand.

    python3 scripts/redate-insight-card.py            # writes src/assets/*
    python3 scripts/redate-insight-card.py --check    # report only, touch nothing

WHY IT WORKS ON THE PNG AND NOT THE SHIPPED FILES: src/assets holds lossy WEBP
and AVIF. Editing those decodes and re-encodes the whole 1536x1024 frame, so
every pixel degrades to move eleven characters. The lossless master lives in
drop_03 in the design repo, so this starts there and encodes both outputs once.

EVERY RENDER PARAMETER WAS MEASURED OFF THE MASTER, none guessed:

  font    Inter 400, confirmed by overlaying letterforms on the original.
  size    16px header, 12px source captions, from matching ink width.
  raster  4x supersample then LANCZOS. A native 1x FreeType render hints glyph
          advances to whole pixels and opens 2px and 5px gaps where the original
          has 1px and 4px -- at this size that reads as "2 026". Supersampling
          reproduces the browser's subpixel advances.
  colour  solved by matching TOTAL INK against the run being replaced. Not by
          the darkest pixel: at 12px no pixel reaches full coverage, so that
          estimate lands about three shades too dark.

THE DATE RULE, which is content rather than craft: the four source dates must
all fall in the week before the card's own date, and on weekdays. A source that
postdates the insight it feeds is the kind of detail that makes a mockup read as
a mistake.
"""

from __future__ import annotations

import argparse
import io
import re
import sys
import urllib.request
import zipfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parent.parent
DESIGN = REPO.parent / "marketbuzzr_landing_page_design"
DROP = DESIGN / "drop_03_Marketbuzzr_Homepage_CTO_Handoff_file_aug3.zip"
MASTER = "03-insight-card-medicalcomp.png"
ASSETS = REPO / "src" / "assets"

FONT_CSS = "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap"
CACHE = REPO / "node_modules" / ".cache" / "inter-400.ttf"

BG = (243, 244, 253)
SS = 4
HDR = (53, 64, 106)
CAP = (65, 75, 115)

# text, ink-left x, cap-top y, px size, fill, erase box
# Two spaces around the header bullet: that is the air the original carries.
RUNS = [
    ("Aug 5, 2026  •  10:23 AM", 641, 82, 16, HDR, (636, 76, 840, 103)),
    ("Aug 5, 2026", 432, 805, 12, CAP, (427, 800, 512, 822)),
    ("Aug 4, 2026", 620, 805, 12, CAP, (615, 800, 700, 822)),
    ("Aug 3, 2026", 802, 805, 12, CAP, (797, 800, 882, 822)),
    ("Jul 31, 2026", 995, 805, 12, CAP, (990, 800, 1080, 822)),
]

# Chosen to land just under what the previous assets weighed, so the page does
# not get heavier for this. Re-check if the artwork itself is ever replaced.
WEBP_Q = 81
AVIF_Q = 58


def load_master() -> Image.Image:
    if not DROP.exists():
        sys.exit(f"missing {DROP}\nThe design repo is expected beside this one.")
    with zipfile.ZipFile(DROP) as z:
        name = next(n for n in z.namelist() if n.endswith(MASTER))
        return Image.open(io.BytesIO(z.read(name))).convert("RGB")


def load_font(size: int) -> ImageFont.FreeTypeFont:
    if not CACHE.exists():
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        css = urllib.request.urlopen(FONT_CSS).read().decode()
        url = re.search(r"url\((https://[^)]+\.ttf)\)", css).group(1)
        CACHE.write_bytes(urllib.request.urlopen(url).read())
    return ImageFont.truetype(str(CACHE), size)


def repaint(im: Image.Image) -> Image.Image:
    arr = np.asarray(im).astype(float)
    for text, lx, capy, size, fill, box in RUNS:
        x0, y0, x1, y1 = box
        w, h = x1 - x0, y1 - y0

        # The card ground is flat across every erase box. Prove it before painting:
        # if the artwork is ever re-rendered with different geometry, this is what
        # catches it, instead of a silently blanked-out slab of card.
        patch = arr[y0:y1, x0:x1]
        edge = np.concatenate([patch[0], patch[-1], patch[:, 0], patch[:, -1]])
        if np.abs(edge - np.array(BG)).max() > 6:
            sys.exit(f"{text!r}: erase box crosses non-background — artwork changed, re-measure")

        f = load_font(size * SS)
        bb = f.getbbox(text)  # ink offset from draw origin: anchor by ink, not line box
        big = Image.new("L", (w * SS, h * SS), 0)
        ImageDraw.Draw(big).text(
            ((lx - x0) * SS - bb[0], (capy - y0) * SS - bb[1]), text, font=f, fill=255
        )
        m = np.clip(np.asarray(big.resize((w, h), Image.LANCZOS)).astype(float) / 255, 0, 1)
        m = m[..., None]
        arr[y0:y1, x0:x1] = np.array(BG, float) * (1 - m) + np.array(fill, float) * m
    return Image.fromarray(np.round(arr).astype("uint8"))


def report(before: Image.Image, after: Image.Image) -> None:
    a = np.asarray(after).astype(int)
    o = np.asarray(before).astype(float)
    dist = np.abs(a - np.array(BG)).sum(2)
    for text, lx, capy, size, fill, box in RUNS:
        x0, y0, x1, y1 = box
        ys, xs = np.nonzero(dist[y0:y1, x0:x1] > 55)
        ink_new = (np.array(BG, float) - a[y0:y1, x0:x1]).clip(0).sum()
        ink_old = (np.array(BG, float) - o[y0:y1, x0:x1]).clip(0).sum()
        print(
            f"  {text:<26} left={x0 + xs.min():4d}(want {lx})"
            f"  cap-top={y0 + ys.min():4d}(want {capy})"
            f"  ink {ink_new / ink_old * 100:5.1f}% of what it replaced"
        )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="measure and report, write nothing")
    args = ap.parse_args()

    master = load_master()
    out = repaint(master)
    report(master, out)

    if args.check:
        print("--check: nothing written")
        return

    for fmt, q in (("WEBP", WEBP_Q), ("AVIF", AVIF_Q)):
        path = ASSETS / f"insight-medicalcomp.{fmt.lower()}"
        kw = {"quality": q} | ({"method": 6} if fmt == "WEBP" else {})
        out.save(path, fmt, **kw)
        print(f"  wrote {path.relative_to(REPO)}  {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
