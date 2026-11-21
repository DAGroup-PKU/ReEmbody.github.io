# ReEmbody project page

Static GitHub Pages site for **ReEmbody: Cross-Embodiment Data Reuse for Real-World Robot Learning**.

## Publish

The contents of this folder are committed to `DAGroup-PKU/ReEmbody.github.io`. In repository **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The included workflow then deploys on pushes to `main`. The paper button points to the included `assets/ReEmbody-paper.pdf`; replace it with the public arXiv URL when available. The repository button points to this page's target repository; replace it with the public code repository when released.

## Assets

Figures are raster exports of the final PDFs in `/pfs/yichen/Arxiv-RSSR/fig`. The paper PDF comes from `/pfs/yichen/Arxiv-RSSR/main.pdf`. Six videos are representative real-robot recordings listed in the supplied asset manifest. `franka_draw_1.mp4` is used for the Franka Drawer card because the figure source clip is stored in an attachment path rather than the dataset directory.

The videos retain their source HEVC encoding. Browser playback depends on HEVC support; transcode them to H.264 before public release if broad browser compatibility is required. The page is otherwise buildless and has no runtime dependencies beyond the optional Google Fonts request.
