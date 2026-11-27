# ReEmbody Project Page

Static GitHub Pages site for **ReEmbody: Cross-Embodiment Data Reuse for Real-World Robot Learning** (Peking University).

## Publish

Commit the contents of this folder to `DAGroup-PKU/ReEmbody.github.io`. In repository **Settings → Pages**, set the source to **Deploy from a branch**, select **main** and **/(root)**, then save.

- The paper button links to `assets/ReEmbody-paper.pdf` (includes Appendix A–D); update it to the public arXiv URL once posted.
- The repository button links to `https://github.com/DAGroup-PKU/ReEmbody`.

## Structure & Assets

- `index.html`, `styles.css`, `script.js` — Buildless static site with zero external JS runtime dependencies (only optional Google Fonts).
- `assets/ReEmbody-paper.pdf` — Paper PDF with appendix.
- `assets/figures/` — High-resolution figures exported from the paper (`icon.png`, `pku.png`, `teaser_svg_v23.jpg`, `overview_svg_v35.jpg`, `real_svg_v20.jpg`, `robotwin_synthesis_bars.jpg`, `qualitative_components_v01.jpg`).
- `assets/videos/reembody-pipeline.mp4` — Sequential 5-stage animated pipeline (21.6 s, 2016×640 H.264) illustrating Real 1 → Sim 1 → Sim 2 → Real 2 (3-view Cycles training data) → zero-shot Dual-Arm Franka deployment.
- `assets/videos/reembody-showcase.mp4` — Custom-edited 2-minute (120 s, 1280×720 H.264) introductory showcase covering cross-embodiment data construction, zero-shot real-world deployments on Astribot S1 and Dual-Arm Franka, and the 4×4 RoboTwin 2.0 benchmark.
- `assets/videos/hero-bg.mp4` — Lightweight (~960 KB) looping 3×2 real-robot ambient background mosaic.
- `assets/videos/real/` — All 16 real-world autonomous evaluation recordings from `cvpr-sup` (Astribot S1: 2 Cups, 3 Blocks, 3 Drawer; Dual-arm Franka: 2 Cups, 3 Blocks, 3 Drawer), transcoded to web-standard H.264 (`avc1`, faststart) for universal browser playback.
- `assets/videos/` — 3 COBOT-Magic source demonstrations (`v16`, `v19`, `v22`), 6 synchronized target-view replays for S1 and Franka (`v49`–`v54`), and the 4×4 RoboTwin 2.0 cross-embodiment execution matrix (`v25`–`v40`).
- `assets/posters/` — Mid-action JPEG poster thumbnails generated for all 41 videos for instant visual rendering before playback.
