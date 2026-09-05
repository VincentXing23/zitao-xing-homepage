# Local typography assets

Space Grotesk is used for Latin letters. Noto Serif SC (600) is used for Chinese headings; Noto Sans SC (400/600) is used for Chinese body copy and label fallbacks.

Sources: Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`). Upstream font directories and licenses:
- https://github.com/google/fonts/tree/main/ofl/spacegrotesk
- https://github.com/google/fonts/tree/main/ofl/notosanssc
- https://github.com/google/fonts/tree/main/ofl/notoserifsc

The Noto webfonts contain the non-ASCII characters present in app, components, lib, and content source at generation time. They are self-hosted WOFF subsets. Future characters that are absent fall back to the configured system fonts. After editing Chinese copy, run `python3 scripts/update-chinese-fonts.py` from the project root (requires fontTools and curl). The script uses the Google Fonts CSS API's `text` parameter and verifies glyph coverage before replacing any public assets. Keep the accompanying OFL license files when distributing these assets.
