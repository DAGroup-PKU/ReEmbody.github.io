# ReEmbody project page

Static GitHub Pages site for **ReEmbody: Cross-Embodiment Data Reuse for Real-World Robot Learning**.

## Publish

The contents of this folder are committed to `DAGroup-PKU/ReEmbody.github.io`. In repository **Settings → Pages**, set the build and deployment source to **Deploy from a branch**, select **main** and **/(root)**, then save. The paper button points to the included `assets/ReEmbody-paper.pdf`; replace it with the public arXiv URL when available. The repository button points to this page's target repository; replace it with the public code repository when released.

## Assets

Figures are raster exports of the final PDFs in `/pfs/yichen/Arxiv-RSSR/fig`. The paper PDF comes from `/pfs/yichen/Arxiv-RSSR/main.pdf`. Six videos are representative real-robot recordings listed in the supplied asset manifest. `franka_draw_1.mp4` is used for the Franka Drawer card because the figure source clip is stored in an attachment path rather than the dataset directory.

The page now includes 31 recordings: three COBOT source demonstrations, six target-view replays for S1 and Franka, a 4-task × 4-embodiment RoboTwin target-execution matrix, and six real-robot recordings. The simulation and target replay clips use H.264, while the six real-robot clips retain their source HEVC encoding. Browser playback of those real-robot clips depends on HEVC support. The page is buildless and has no runtime dependencies beyond the optional Google Fonts request.
