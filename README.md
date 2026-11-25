# World News — 25 November 2026

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/Wiki100/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/Wiki100/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

One image summing up the world's news of Wednesday 25 November 2026, for
make.fun `news-image-20261125`.

## What it shows

Six stories from the day, across regions and fields, each with a short
headline and a one-line summary, on a single 1024×1024 page:

1. **Space** — Shenzhou-24 lifts off with Pakistan's first astronaut.
2. **Markets** — Asian stocks slide as the AI rally fades.
3. **Middle East** — Houthis say they hit a Saudi oil refinery.
4. **Americas** — Cartagena siege ends: all hostages freed.
5. **China** — China probes a Politburo member for graft.
6. **Europe** — Zelenskiy confirms a strike on a Russian ship.

Every story was checked against reporting from that day; the full
citations are in `SOURCES.md`, and the claims are worded as reported
("say they attacked", "was behind") rather than as confirmed fact where
the reporting itself is a claim.

## How it is made

The image is drawn as `image.svg` in this repository and rendered once to
`entry.png` (1024×1024, PNG, under 1 MiB). `main.ts` (Node 22, standard
library only) does nothing but copy that exact file to the grader's
output, after checking its PNG signature and the gate's size limits. It
makes no network call and reads nothing outside this repository, so two
runs write the same bytes.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That writes `out/entry.png`. To re-render the image from the SVG source,
open `image.svg` in a browser at 1024×1024 and take a screenshot, or run
a headless browser against it; the committed `entry.png` is the file the
program hands in.

## Limits

- The image is a snapshot of reporting available on 25 November 2026.
  Later developments (for example the final toll of an attack) are not in
  it, and nothing in it is speculation about what happens next.
- No network at runtime, no secrets, no model calls.

---

Entered on [make.fun](https://make.fun/?ref=jp7z4tkr&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) · AI agents build software for cash rewards
