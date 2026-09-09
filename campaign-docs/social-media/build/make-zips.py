#!/usr/bin/env python3
"""Package the campaign into downloadable ZIP files.

Every archive is verified after it is written: the central directory is read
back, each member is decompressed in full and its CRC checked, and the member
list is compared against what was meant to go in. A ZIP that fails any of that
is deleted rather than handed over.

Videos are split across archives so no single download is unwieldy; the split
point moves automatically if the videos ever grow.
"""

import json
import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DOCS = ROOT / "campaign-docs/social-media"
OUT = ROOT / "campaign-docs/social-media/export"

# Comfortably under the limits for uploading into another task, with room for
# the archive overhead.
MAX_MB = 20.0

plan = json.loads((DOCS / "campaign-plan.json").read_text())
posts = plan["posts"]


def rel(p: Path) -> str:
    return str(p.relative_to(ROOT))


def build(name: str, members: list[tuple[Path, str]]) -> Path:
    """Write one archive and prove it opens before returning it."""
    path = OUT / name
    missing = [str(src) for src, _ in members if not src.is_file()]
    if missing:
        sys.exit(f"{name}: source file(s) missing:\n  " + "\n  ".join(missing))

    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for src, arc in members:
            z.write(src, arc)

    # Read it back the way a recipient's unzip tool would.
    with zipfile.ZipFile(path) as z:
        bad = z.testzip()
        if bad is not None:
            path.unlink()
            sys.exit(f"{name}: CRC failure in {bad}")
        got = sorted(i.filename for i in z.infolist())
        want = sorted(arc for _, arc in members)
        if got != want:
            path.unlink()
            sys.exit(f"{name}: contents do not match what was requested")
        for info in z.infolist():
            with z.open(info) as fh:
                while fh.read(1 << 20):
                    pass
            if info.file_size == 0:
                path.unlink()
                sys.exit(f"{name}: {info.filename} is empty")

    size_mb = path.stat().st_size / 1024 / 1024
    if size_mb > MAX_MB:
        sys.exit(f"{name}: {size_mb:.1f} MB exceeds the {MAX_MB:.0f} MB limit")
    return path


def video_batches() -> list[list[dict]]:
    """Posts 1-6 and 7-12, split further if a batch would run too large."""
    batches, current, running = [], [], 0.0
    for p in posts:
        mb = (ROOT / "public/social-posts/videos" / p["media"]["video"]).stat().st_size / 1024 / 1024
        # The brief asks for 1-6 and 7-12; only break earlier if size demands it.
        if current and (len(current) == 6 or running + mb > MAX_MB * 0.9):
            batches.append(current)
            current, running = [], 0.0
        current.append(p)
        running += mb
    if current:
        batches.append(current)
    return batches


if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

built = []

# --- posters -------------------------------------------------------------
poster_members = []
for p in posts:
    poster_members.append((
        ROOT / "public/social-posts/posters/square" / p["media"]["square"],
        f"posters/square/{p['media']['square']}",
    ))
    poster_members.append((
        ROOT / "public/social-posts/posters/vertical" / p["media"]["vertical"],
        f"posters/vertical/{p['media']['vertical']}",
    ))
assert len(poster_members) == 24, f"expected 24 posters, assembled {len(poster_members)}"
built.append(build("prestige-campaign-posters.zip", poster_members))

# --- videos --------------------------------------------------------------
batches = video_batches()
total_videos = sum(len(b) for b in batches)
assert total_videos == 12, f"expected 12 videos, assembled {total_videos}"
for i, batch in enumerate(batches, start=1):
    members = [
        (ROOT / "public/social-posts/videos" / p["media"]["video"], p["media"]["video"])
        for p in batch
    ]
    built.append(build(f"prestige-campaign-videos-part-{i}.zip", members))

# --- documents -----------------------------------------------------------
doc_names = [
    "captions-and-hashtags.md",
    "campaign-calendar.csv",
    "linkedin-posting-guide.md",
    "media-manifest.md",
    "media-manifest.csv",
    "campaign-plan.md",
    "campaign-plan.json",
    "README.md",
]
built.append(build(
    "prestige-campaign-documents.zip",
    [(DOCS / n, n) for n in doc_names],
))

# --- report --------------------------------------------------------------
print(f"{'Archive':<42} {'Size':>9}  Contents")
print("-" * 78)
for path in built:
    with zipfile.ZipFile(path) as z:
        n = len(z.infolist())
    print(f"{path.name:<42} {path.stat().st_size / 1024 / 1024:>7.2f} MB  {n} files")
print("-" * 78)
grand = sum(p.stat().st_size for p in built) / 1024 / 1024
print(f"{'total':<42} {grand:>7.2f} MB  {len(built)} archives")
print(f"\nAll archives verified: opened, member lists matched, every file decompressed and CRC-checked.")
print(f"Written to {rel(OUT)}/")
