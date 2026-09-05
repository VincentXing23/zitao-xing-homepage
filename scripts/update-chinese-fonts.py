"""Refresh self-hosted Chinese glyph subsets after copy edits.

Run with Python 3, fontTools, and curl installed. Temporary files stay in this
workspace; the existing public assets are replaced only after all fonts pass.
"""

from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import urlencode
import re
import subprocess

from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
FONTS = (
    ("noto-sans-sc-regular", "Noto Sans SC:wght@400"),
    ("noto-sans-sc-semibold", "Noto Sans SC:wght@600"),
    ("noto-serif-sc-semibold", "Noto Serif SC:wght@600"),
)


def fetch(url: str) -> bytes:
    return subprocess.check_output(
        ["curl", "--fail", "--silent", "--show-error", "--retry", "1",
         "--max-time", "40", url]
    )


def main() -> None:
    chars = set()
    for directory in ("app", "components", "lib", "content"):
        for path in (ROOT / directory).rglob("*"):
            if path.suffix in (".tsx", ".ts", ".mdx"):
                chars.update(c for c in path.read_text() if ord(c) > 127)
    text = "".join(sorted(chars))
    required = {ord(c) for c in chars if "\u4e00" <= c <= "\u9fff"}

    with TemporaryDirectory(prefix=".font-subsets-", dir=ROOT) as directory:
        staging = Path(directory)

        def prepare(item: tuple[str, str]) -> Path:
            name, family = item
            css = fetch("https://fonts.googleapis.com/css2?" + urlencode(
                {"family": family, "text": text, "display": "swap"}
            )).decode()
            match = re.search(r"src: url\(([^)]+)\)", css)
            if not match or not match[1].startswith("https://fonts.gstatic.com/"):
                raise RuntimeError(f"No expected font source for {name}")
            raw = staging / f"{name}.font"
            raw.write_bytes(fetch(match[1]))
            font = TTFont(raw)
            missing = required - set(font.getBestCmap())
            if missing:
                raise RuntimeError(f"{name} is missing {len(missing)} Chinese glyphs")
            font.flavor = "woff"
            output = staging / f"{name}.woff"
            font.save(output)
            font.close()
            return output

        with ThreadPoolExecutor(max_workers=3) as pool:
            outputs = list(pool.map(prepare, FONTS))
        for path in outputs:
            size = path.stat().st_size
            path.replace(ROOT / "public" / "fonts" / path.name)
            print(f"{path.name}: {len(required)} Chinese glyphs verified, {size} bytes")


if __name__ == "__main__":
    main()
