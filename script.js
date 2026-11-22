/* ==========================================================================
   ReEmbody — Cross-Embodiment Showcase Controller
   Source Body (Far Left) → New Target Bodies (Right) on every task row.
   ========================================================================== */

(() => {
  'use strict';

  const REAL_CROSS_ROWS = [
    {
      key: 'drawer',
      title: 'Drawer — Open, Insert & Close',
      predicate: 'open(d) → inside(b,d) → closed(d)',
      source: { body: 'COBOT-Magic', file: 'v22' },
      targets: [
        {
          body: 'Astribot S1',
          score: '18/20 · 90%',
          replay: 'v51',
          trials: [
            { id: '01', file: 's1-drawer-1' },
            { id: '02', file: 's1-drawer-2' },
            { id: '03', file: 's1-drawer-3' },
          ],
        },
        {
          body: 'Dual-Arm Franka',
          score: '19/20 · 95%',
          replay: 'v54',
          trials: [
            { id: '01', file: 'franka-drawer-1' },
            { id: '02', file: 'franka-drawer-2' },
            { id: '03', file: 'franka-drawer-3' },
          ],
        },
      ],
    },
    {
      key: 'block',
      title: 'Blocks — Support & Stacking',
      predicate: 'placed(b2) → on(b1,b2) → released(b1,b2)',
      source: { body: 'COBOT-Magic', file: 'v19' },
      targets: [
        {
          body: 'Astribot S1',
          score: '15/20 · 75%',
          replay: 'v50',
          trials: [
            { id: '01', file: 's1-block-1' },
            { id: '02', file: 's1-block-2' },
            { id: '03', file: 's1-block-3' },
          ],
        },
        {
          body: 'Dual-Arm Franka',
          score: '16/20 · 80%',
          replay: 'v53',
          trials: [
            { id: '01', file: 'franka-block-1' },
            { id: '02', file: 'franka-block-2' },
            { id: '03', file: 'franka-block-3' },
          ],
        },
      ],
    },
    {
      key: 'cup',
      title: 'Cups — Precision Nesting',
      predicate: 'placed(c2) → inside(c1,c2) → released(c1,c2)',
      source: { body: 'COBOT-Magic', file: 'v16' },
      targets: [
        {
          body: 'Astribot S1',
          score: '14/20 · 70%',
          replay: 'v49',
          trials: [
            { id: '01', file: 's1-cup-1' },
            { id: '02', file: 's1-cup-2' },
          ],
        },
        {
          body: 'Dual-Arm Franka',
          score: '16/20 · 80%',
          replay: 'v52',
          trials: [
            { id: '01', file: 'franka-cup-1' },
            { id: '02', file: 'franka-cup-2' },
          ],
        },
      ],
    },
  ];

  const ROBOTWIN_ROWS = [
    {
      key: 'handover',
      title: 'Block Handover',
      subtitle: 'Bimanual mid-air object transfer',
      sourceThumb: 'assets/posters/src-aloha-handover.jpg',
      targets: [
        { body: 'ARX-X5', file: 'v29', ctrl: '97%', pol: '89%' },
        { body: 'Franka Panda', file: 'v30', ctrl: '98%', pol: '22%' },
        { body: 'Piper', file: 'v31', ctrl: '78%', pol: '41%' },
        { body: 'UR5-WSG', file: 'v32', ctrl: '99%', pol: '68%' },
      ],
    },
    {
      key: 'switch',
      title: 'Turn Switch',
      subtitle: 'Articulated switch actuation',
      sourceThumb: 'assets/posters/src-aloha-switch.jpg',
      targets: [
        { body: 'ARX-X5', file: 'v37', ctrl: '85%', pol: '60%' },
        { body: 'Franka Panda', file: 'v38', ctrl: '96%', pol: '65%' },
        { body: 'Piper', file: 'v39', ctrl: '97%', pol: '68%' },
        { body: 'UR5-WSG', file: 'v40', ctrl: '95%', pol: '53%' },
      ],
    },
    {
      key: 'pot',
      title: 'Lift Pot',
      subtitle: 'Coordinated dual-handle lift',
      sourceThumb: 'assets/posters/src-aloha-pot.jpg',
      targets: [
        { body: 'ARX-X5', file: 'v33', ctrl: '53%', pol: '87%' },
        { body: 'Franka Panda', file: 'v34', ctrl: '54%', pol: '70%' },
        { body: 'Piper', file: 'v35', ctrl: '50%', pol: '52%' },
        { body: 'UR5-WSG', file: 'v36', ctrl: '53%', pol: '45%' },
      ],
    },
    {
      key: 'bin',
      title: 'Bin Transfer',
      subtitle: 'Long-horizon container emptying',
      sourceThumb: null,
      targets: [
        { body: 'ARX-X5', file: 'v25', ctrl: '35%', pol: '34%' },
        { body: 'Franka Panda', file: 'v26', ctrl: '35%', pol: '28%' },
        { body: 'Piper', file: 'v27', ctrl: '23%', pol: '4%' },
        { body: 'UR5-WSG', file: 'v28', ctrl: '35%', pol: '43%' },
      ],
    },
  ];

  const OVERVIEW_FIGS = {
    method: {
      src: 'assets/figures/overview_svg_v35.jpg',
      alt: 'Figure 2: ReEmbody four-stage overview',
      cap: 'Figure 2 — Reconstruct source scene & contact evidence (01), bind task-family contract Φ (02), revise target controller under measured relation & physical diagnostics (03), and render synchronized moving-camera observations to fine-tune π0.5 (04). Click to zoom.',
    },
    teaser: {
      src: 'assets/figures/teaser_svg_v23.jpg',
      alt: 'Figure 1: Cross-embodiment data reuse with ReEmbody',
      cap: 'Figure 1 — (a) Same relations realized across COBOT-Magic, Astribot S1, and Franka, (b) one simulated source transferred to four RoboTwin targets, (c) zero-shot real Astribot S1 deployment, and (d) RoboTwin 2.0 summary. Click to zoom.',
    },
  };

  const RESULT_FIGS = {
    bars: {
      src: 'assets/figures/robotwin_synthesis_bars.jpg',
      alt: 'Figure 4: Cross-embodiment controller synthesis on RoboTwin 2.0',
      cap: 'Figure 4 — Cross-embodiment controller success across 16 RoboTwin 2.0 task–body pairs (67.7% ReEmbody vs. 50.9% RT, 32.3% Expert, 15.1% MimicGen). Click to zoom.',
    },
    stages: {
      src: 'assets/figures/real_svg_v20.jpg',
      alt: 'Figure 3: Interaction stages across real and simulated embodiments',
      cap: 'Figure 3 — Six chronological execution frames across real Astribot S1, real Dual-Arm Franka, and RoboTwin 2.0 target bodies. Click to zoom.',
    },
    diag: {
      src: 'assets/figures/qualitative_components_v01.jpg',
      alt: 'Figure 5: Qualitative component removal cases',
      cap: 'Figure 5 — Released successful references beside runs without relation contracts (w/o C) or mechanical diagnostics (w/o D): omitting opening, +32.8 mrad gripper limit excess, 99.5 mm lift halt, and joint-speed bound rejection. Click to zoom.',
    },
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const realSrc = (stem) => `assets/videos/real/${stem}.mp4`;
  const simSrc = (stem) => `assets/videos/${stem}.mp4`;
  const posterSrc = (stem) => `assets/posters/${stem}.jpg`;

  /* -------------------- CUSTOM 2-MINUTE SHOWCASE PLAYER -------------------- */

  const mainVideo = $('#main-showcase-video');
  const centerPlayBtn = $('#center-play-btn');
  const playPauseBtn = $('#play-pause-btn');
  const iconPlay = $('#icon-play');
  const iconPause = $('#icon-pause');
  const scrubber = $('#scrubber-wrap');
  const scrubberFill = $('#scrubber-fill');
  const scrubberThumb = $('#scrubber-thumb');
  const scrubberTooltip = $('#scrubber-tooltip');
  const timeReadout = $('#time-readout');
  const fullscreenBtn = $('#fullscreen-btn');
  const chapterBtns = $$('[data-seek]');
  const speedBtns = $$('[data-player-speed]');

  function fmtTime(sec) {
    const s = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  }

  if (mainVideo && scrubber) {
    let dragging = false;

    const getDur = () => (Number.isFinite(mainVideo.duration) && mainVideo.duration > 0 ? mainVideo.duration : 120);

    const updatePlayState = () => {
      const playing = !mainVideo.paused && !mainVideo.ended;
      centerPlayBtn?.classList.toggle('is-playing', playing);
      iconPlay?.classList.toggle('hidden', playing);
      iconPause?.classList.toggle('hidden', !playing);
    };

    const updateScrubberUI = (timeOverride) => {
      const dur = getDur();
      const cur = typeof timeOverride === 'number' ? timeOverride : mainVideo.currentTime;
      const pct = Math.max(0, Math.min(100, (cur / dur) * 100));
      scrubberFill.style.width = `${pct}%`;
      scrubberThumb.style.left = `${pct}%`;
      scrubber.setAttribute('aria-valuemax', String(Math.round(dur)));
      scrubber.setAttribute('aria-valuenow', String(Math.round(cur)));
      timeReadout.textContent = `${fmtTime(cur)} / ${fmtTime(dur)}`;

      // Highlight active chapter jump button
      let activeSeek = 0;
      chapterBtns.forEach((b) => {
        const s = parseFloat(b.dataset.seek);
        if (cur >= s - 0.5) activeSeek = s;
      });
      chapterBtns.forEach((b) => b.classList.toggle('active', parseFloat(b.dataset.seek) === activeSeek));
    };

    const togglePlayback = () => {
      if (mainVideo.paused || mainVideo.ended) mainVideo.play().catch(() => {});
      else mainVideo.pause();
    };

    const seekByClientX = (clientX, commit = true) => {
      const rect = scrubber.getBoundingClientRect();
      const frac = Math.max(0, Math.min(1, (clientX - rect.left) / Math.max(rect.width, 1)));
      const target = frac * getDur();
      scrubberTooltip.style.left = `${frac * 100}%`;
      scrubberTooltip.textContent = fmtTime(target);
      if (commit) {
        mainVideo.currentTime = target;
        updateScrubberUI(target);
      }
    };

    mainVideo.addEventListener('click', togglePlayback);
    centerPlayBtn?.addEventListener('click', (e) => { e.stopPropagation(); togglePlayback(); });
    playPauseBtn?.addEventListener('click', togglePlayback);
    mainVideo.addEventListener('play', updatePlayState);
    mainVideo.addEventListener('pause', updatePlayState);
    mainVideo.addEventListener('ended', updatePlayState);
    mainVideo.addEventListener('loadedmetadata', () => updateScrubberUI());
    mainVideo.addEventListener('timeupdate', () => { if (!dragging) updateScrubberUI(); });

    scrubber.addEventListener('pointerdown', (e) => {
      dragging = true;
      scrubber.classList.add('dragging');
      scrubber.setPointerCapture(e.pointerId);
      seekByClientX(e.clientX, true);
    });

    scrubber.addEventListener('pointermove', (e) => {
      seekByClientX(e.clientX, dragging);
    });

    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      scrubber.classList.remove('dragging');
      if (e.pointerId !== undefined && scrubber.hasPointerCapture(e.pointerId)) {
        scrubber.releasePointerCapture(e.pointerId);
      }
    };
    scrubber.addEventListener('pointerup', endDrag);
    scrubber.addEventListener('pointercancel', endDrag);

    scrubber.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { mainVideo.currentTime = Math.min(getDur(), mainVideo.currentTime + 5); updateScrubberUI(); }
      else if (e.key === 'ArrowLeft') { mainVideo.currentTime = Math.max(0, mainVideo.currentTime - 5); updateScrubberUI(); }
      else if (e.key === ' ') { e.preventDefault(); togglePlayback(); }
    });

    chapterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = parseFloat(btn.dataset.seek);
        mainVideo.currentTime = target;
        updateScrubberUI(target);
        mainVideo.play().catch(() => {});
      });
    });

    speedBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const rate = parseFloat(btn.dataset.playerSpeed);
        mainVideo.playbackRate = rate;
        speedBtns.forEach((b) => b.classList.toggle('active', b === btn));
      });
    });

    fullscreenBtn?.addEventListener('click', () => {
      const target = $('#showcase-player');
      if (document.fullscreenElement) document.exitFullscreen?.();
      else (target?.requestFullscreen || mainVideo.requestFullscreen)?.call(target || mainVideo);
    });

    updateScrubberUI(0);
    updatePlayState();
  }

  /* -------------------- REAL-WORLD CROSS-EMBODIMENT ROWS -------------------- */

  let realMode = 'expanded';

  function renderRealRows() {
    const container = $('#real-rows-container');
    if (!container) return;
    container.innerHTML = '';

    REAL_CROSS_ROWS.forEach((row) => {
      const el = document.createElement('div');
      el.className = 'cross-row';
      el.innerHTML = `
        <div class="cross-row-head">
          <div class="cross-row-title">
            <h3>${row.title}</h3>
            <code>${row.predicate}</code>
          </div>
          <button class="row-sync-btn" type="button">Play row</button>
        </div>
        <div class="real-cross-grid"></div>
      `;

      const grid = $('.real-cross-grid', el);

      // FAR LEFT: Source Body (COBOT-Magic)
      const srcTile = document.createElement('article');
      srcTile.className = 'v-tile is-source';
      srcTile.innerHTML = `
        <div class="v-media">
          <span class="v-badge source">${row.source.body} · source</span>
          <button class="v-expand" type="button" aria-label="Expand source video">↗</button>
          <video controls muted loop playsinline preload="none" poster="${posterSrc(row.source.file)}" src="${simSrc(row.source.file)}"></video>
        </div>
        <div class="v-foot">
          <strong>Source</strong>
          <span>2×6-DoF · Head View</span>
        </div>
      `;
      const srcVid = $('video', srcTile);
      $('.v-expand', srcTile).addEventListener('click', () => {
        srcVid.pause();
        openVideoLightbox(simSrc(row.source.file), `${row.source.body} · source (${row.title})`, row.predicate);
      });
      grid.appendChild(srcTile);

      // FLOW DIVIDER
      const sep = document.createElement('div');
      sep.className = 'flow-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.innerHTML = '→<span>NEW</span>';
      grid.appendChild(sep);

      // RIGHT: Featured New Target Bodies (Astribot S1 & Dual-Arm Franka)
      row.targets.forEach((tgt) => {
        const isReplay = realMode === 'replay';
        const initialStem = isReplay ? tgt.replay : tgt.trials[0].file;
        const initialSrc = isReplay ? simSrc(initialStem) : realSrc(initialStem);
        let current = { stem: initialStem, src: initialSrc, label: isReplay ? 'Target Replay' : `Real Trial ${tgt.trials[0].id}` };

        const tile = document.createElement('article');
        tile.className = `v-tile is-target ${isReplay ? 'is-replay' : ''}`;
        tile.innerHTML = `
          <div class="v-media">
            <span class="v-badge target">${tgt.body}</span>
            <button class="v-expand" type="button" aria-label="Expand ${tgt.body} video">↗</button>
            <video controls muted loop playsinline preload="none" poster="${posterSrc(initialStem)}" src="${initialSrc}"></video>
          </div>
          <div class="v-foot">
            <span class="v-score">${isReplay ? 'replay' : tgt.score}</span>
            ${realMode === 'compact' ? `
              <div class="trial-tabs">
                ${tgt.trials.map((tr, i) => `<button class="${i === 0 ? 'active' : ''}" type="button" data-stem="${tr.file}" data-id="${tr.id}">T${tr.id}</button>`).join('')}
              </div>
            ` : `<span>${isReplay ? 'target camera' : 'trial 01'}</span>`}
          </div>
        `;

        const vid = $('video', tile);
        $('.v-expand', tile).addEventListener('click', () => {
          vid.pause();
          openVideoLightbox(current.src, `${tgt.body} · ${row.title} (${current.label})`, `${tgt.score} · ${row.predicate}`);
        });

        $$('.trial-tabs button', tile).forEach((btn) => {
          btn.addEventListener('click', () => {
            const stem = btn.dataset.stem;
            current = { stem, src: realSrc(stem), label: `Real Trial ${btn.dataset.id}` };
            $$('.trial-tabs button', tile).forEach((b) => b.classList.toggle('active', b === btn));
            vid.pause();
            vid.poster = posterSrc(stem);
            vid.src = current.src;
            vid.load();
            vid.play().catch(() => {});
          });
        });

        grid.appendChild(tile);
      });

      // EXPANDED MODE: Show ALL remaining real-world trials right below!
      if (realMode === 'expanded') {
        const extras = [];
        row.targets.forEach((tgt) => {
          tgt.trials.slice(1).forEach((tr) => {
            extras.push({ tgt, tr });
          });
        });
        if (extras.length) {
          const extraWrap = document.createElement('div');
          extraWrap.className = 'extra-trials-wrap';
          extraWrap.innerHTML = `
            <div class="extra-trials-label">
              <span>More trials</span>
              <span>${extras.length} recordings</span>
            </div>
            <div class="extra-trials-grid ${extras.length === 2 ? 'cols-2' : ''}"></div>
          `;
          const extraGrid = $('.extra-trials-grid', extraWrap);
          extras.forEach(({ tgt, tr }) => {
            const card = document.createElement('article');
            card.className = 'v-tile is-target';
            card.innerHTML = `
              <div class="v-media">
                <span class="v-badge target">${tgt.body} · T${tr.id}</span>
                <button class="v-expand" type="button" aria-label="Expand ${tgt.body} Trial ${tr.id}">↗</button>
                <video controls muted loop playsinline preload="none" poster="${posterSrc(tr.file)}" src="${realSrc(tr.file)}"></video>
              </div>
              <div class="v-foot">
                <strong>Trial ${tr.id}</strong>
                <span class="v-score">${tgt.score}</span>
              </div>
            `;
            const v = $('video', card);
            $('.v-expand', card).addEventListener('click', () => {
              v.pause();
              openVideoLightbox(realSrc(tr.file), `${tgt.body} · ${row.title} (Trial ${tr.id})`, `${tgt.score} · ${row.predicate}`);
            });
            extraGrid.appendChild(card);
          });
          el.appendChild(extraWrap);
        }
      }

      $('.row-sync-btn', el).addEventListener('click', () => {
        $$('.real-cross-grid video', el).forEach((v) => {
          v.currentTime = 0;
          v.play().catch(() => {});
        });
      });

      container.appendChild(el);
    });
  }

  $$('[data-real-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      realMode = btn.dataset.realMode;
      $$('[data-real-mode]').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', String(on));
      });
      renderRealRows();
    });
  });

  renderRealRows();

  /* -------------------- ROBOTWIN 2.0 (SUPPLEMENTARY SIMULATION) -------------------- */

  let rtFilter = 'handover';

  function renderRoboTwinRows() {
    const container = $('#robotwin-rows-container');
    if (!container) return;
    container.innerHTML = '';

    const rows = rtFilter === 'all' ? ROBOTWIN_ROWS : ROBOTWIN_ROWS.filter((r) => r.key === rtFilter);

    rows.forEach((row) => {
      const el = document.createElement('div');
      el.className = 'cross-row';
      el.innerHTML = `
        <div class="cross-row-head">
          <div class="cross-row-title">
            <h3>${row.title}</h3>
            <code>${row.subtitle}</code>
          </div>
          <button class="row-sync-btn" type="button">Play row</button>
        </div>
        <div class="rt-cross-grid"></div>
      `;

      const grid = $('.rt-cross-grid', el);

      // FAR LEFT: Source Body (aloha-agilex)
      const srcTile = document.createElement('article');
      srcTile.className = 'v-tile is-source';
      srcTile.innerHTML = `
        <div class="v-media">
          <span class="v-badge source">aloha-agilex · source</span>
          <div class="rt-source-box">
            ${row.sourceThumb
              ? `<img loading="lazy" src="${row.sourceThumb}" alt="aloha-agilex source for ${row.title}">`
              : `<div class="rt-source-placeholder"><strong>aloha-agilex</strong><span>50 Source Episodes</span><small>Official RoboTwin 2.0 Source</small></div>`
            }
          </div>
        </div>
        <div class="v-foot">
          <strong>Source Body</strong>
          <span>50 demos</span>
        </div>
      `;
      grid.appendChild(srcTile);

      // FLOW DIVIDER
      const sep = document.createElement('div');
      sep.className = 'flow-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.innerHTML = '→<span>4 NEW</span>';
      grid.appendChild(sep);

      // RIGHT: 4 New Target Bodies
      row.targets.forEach((tgt) => {
        const tile = document.createElement('article');
        tile.className = 'v-tile is-target';
        tile.innerHTML = `
          <div class="v-media">
            <span class="v-badge target">${tgt.body}</span>
            <button class="v-expand" type="button" aria-label="Expand ${row.title} on ${tgt.body}">↗</button>
            <video controls muted loop playsinline preload="none" poster="${posterSrc(tgt.file)}" src="${simSrc(tgt.file)}"></video>
          </div>
          <div class="v-foot">
            <span>Ctrl <strong style="color:#93c5fd">${tgt.ctrl}</strong></span>
            <span>Pol <strong style="color:#4ade80">${tgt.pol}</strong></span>
          </div>
        `;
        const vid = $('video', tile);
        $('.v-expand', tile).addEventListener('click', () => {
          vid.pause();
          openVideoLightbox(simSrc(tgt.file), `${row.title} · ${tgt.body}`, `RoboTwin 2.0 · Controller ${tgt.ctrl} · Policy ${tgt.pol}`);
        });
        grid.appendChild(tile);
      });

      $('.row-sync-btn', el).addEventListener('click', () => {
        $$('video', el).forEach((v) => {
          v.currentTime = 0;
          v.play().catch(() => {});
        });
      });

      container.appendChild(el);
    });
  }

  $$('[data-rt-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      rtFilter = btn.dataset.rtFilter;
      $$('[data-rt-filter]').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', String(on));
      });
      renderRoboTwinRows();
    });
  });

  renderRoboTwinRows();

  /* -------------------- FIGURE SWITCHERS -------------------- */

  let curOverview = 'method';
  $$('[data-overview-fig]').forEach((btn) => {
    btn.addEventListener('click', () => {
      curOverview = btn.dataset.overviewFig;
      const cfg = OVERVIEW_FIGS[curOverview];
      $$('[data-overview-fig]').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', String(on));
      });
      $('#overview-plate-img').src = cfg.src;
      $('#overview-plate-img').alt = cfg.alt;
      $('#overview-plate-cap').textContent = cfg.cap;
    });
  });
  $('#overview-plate-wrap')?.addEventListener('click', () => {
    const cfg = OVERVIEW_FIGS[curOverview];
    openImageLightbox(cfg.src, cfg.cap);
  });

  let curResFig = 'bars';
  $$('[data-res-fig]').forEach((btn) => {
    btn.addEventListener('click', () => {
      curResFig = btn.dataset.resFig;
      const cfg = RESULT_FIGS[curResFig];
      $$('[data-res-fig]').forEach((b) => {
        const on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', String(on));
      });
      $('#res-plate-img').src = cfg.src;
      $('#res-plate-img').alt = cfg.alt;
      $('#res-plate-cap').textContent = cfg.cap;
    });
  });
  $('#res-plate-wrap')?.addEventListener('click', () => {
    const cfg = RESULT_FIGS[curResFig];
    openImageLightbox(cfg.src, cfg.cap);
  });

  /* -------------------- LIGHTBOX -------------------- */

  const lightbox = $('#lightbox');
  const lbBody = $('#lightbox-body');
  const lbTitle = $('#lightbox-title');
  const lbSub = $('#lightbox-sub');
  const lbSpeeds = $('#lightbox-speeds');
  let activeLbVideo = null;

  function openImageLightbox(src, caption) {
    activeLbVideo = null;
    lbSpeeds.classList.add('hidden');
    lbTitle.textContent = 'Figure Plate';
    lbSub.textContent = caption || '';
    lbBody.innerHTML = `<img src="${src}" alt="${caption || 'Figure'}">`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openVideoLightbox(src, title, meta) {
    lbTitle.textContent = title || 'Video';
    lbSub.textContent = meta || '';
    lbSpeeds.classList.remove('hidden');
    $$('button', lbSpeeds).forEach((b) => b.classList.toggle('active', b.dataset.speed === '1'));
    lbBody.innerHTML = `<video controls autoplay loop playsinline src="${src}"></video>`;
    activeLbVideo = $('video', lbBody);
    activeLbVideo.playbackRate = 1;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (activeLbVideo) {
      activeLbVideo.pause();
      activeLbVideo = null;
    }
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  $$('[data-close-lightbox]').forEach((el) => el.addEventListener('click', closeLightbox));
  $$('button', lbSpeeds).forEach((btn) => {
    btn.addEventListener('click', () => {
      if (activeLbVideo) activeLbVideo.playbackRate = parseFloat(btn.dataset.speed);
      $$('button', lbSpeeds).forEach((b) => b.classList.toggle('active', b === btn));
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  /* -------------------- BIBTEX COPY -------------------- */

  const copyBtn = $('#copy-citation');
  copyBtn?.addEventListener('click', async () => {
    const code = $('#bibtex-code')?.textContent || '';
    try {
      await navigator.clipboard.writeText(code);
      copyBtn.textContent = 'Copied ✓';
      setTimeout(() => { copyBtn.textContent = 'Copy BibTeX'; }, 2000);
    } catch {
      copyBtn.textContent = 'Select citation to copy';
    }
  });
})();
