/**
 * project.js — Project detail page logic
 * Depends on: data.js (PROJECTS), and the page must set PROJECT_ID before loading this file.
 */
(function () {

  const p = PROJECTS.find(x => x.id === PROJECT_ID);
  if (!p) {
    document.getElementById('pd-content').innerHTML =
      '<p style="padding:60px 40px;font-family:var(--mono)">Project not found. <a href="../index.html">← Return to index</a></p>';
    return;
  }

  document.title = `${p.title} · Liam Carlin`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = p.sum;

  function iconFor(id) {
    const icons = {
      baja:    `<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1"><circle cx="50" cy="85" r="22"/><circle cx="150" cy="85" r="22"/><path d="M20 70 L80 40 L140 40 L180 70"/><path d="M70 55 L120 55 L130 70"/></svg>`,
      cart:    `<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1"><rect x="60" y="30" width="80" height="40"/><path d="M70 70 L70 95 M130 70 L130 95"/><circle cx="70" cy="95" r="8"/><circle cx="130" cy="95" r="8"/><path d="M100 30 L100 10 L140 10"/></svg>`,
      fpv:     `<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1"><rect x="90" y="50" width="20" height="20"/><path d="M100 60 L40 25 M100 60 L160 25 M100 60 L40 95 M100 60 L160 95"/><circle cx="40" cy="25" r="14"/><circle cx="160" cy="25" r="14"/><circle cx="40" cy="95" r="14"/><circle cx="160" cy="95" r="14"/></svg>`,
      tvc:     `<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1"><path d="M90 20 L110 20 L110 80 L90 80 Z"/><path d="M85 90 L115 90 L108 108 L92 108 Z"/><path d="M100 90 L95 105 M100 90 L105 105"/></svg>`,
      barbell: `<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1"><rect x="40" y="56" width="120" height="8"/><rect x="30" y="44" width="14" height="32"/><rect x="156" y="44" width="14" height="32"/><circle cx="100" cy="60" r="16"/></svg>`,
    };
    return icons[id] || `<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="1"><rect x="30" y="30" width="140" height="60"/></svg>`;
  }

  const idx  = PROJECTS.findIndex(x => x.id === p.id);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const kpis = p.kpis || [
    { k: 'Role',     v: p.role  || '—' },
    { k: 'Year',     v: p.year  || '—' },
    { k: 'Category', v: p.cat   || '—' },
    { k: 'Tools',    v: (p.tools || '—').split('·').slice(0, 3).map(s => s.trim()).join(' / ') },
    { k: 'Status',   v: 'Archived' },
    { k: 'Doc №',    v: p.num },
  ];

  const body = p.body || [
    { h: 'Overview', t: p.sum || '' },
    { h: 'Notes',    t: 'Detailed write-up coming soon. Reach out if you want the full story.' },
  ];

  const hasHeroImg = p.heroImage && p.heroImage.trim();

  /* Gallery: skip first image if it's the hero (avoid duplication) */
  const allGallery = (p.gallery && p.gallery.length) ? p.gallery : [];
  /* We'll show full gallery in the grid at bottom */

  /* Body sections with optional inline images */
  const bodySections = body.map((s, i) => {
    const hasImg = s.img && s.img.trim();
    const isEven = i % 2 === 0;

    return `
      <div class="pd-sec" id="pd-sec-${i}">
        <div class="pd-sec-inner${hasImg ? ' has-img' : ''}${hasImg && !isEven ? ' img-left' : ''}">
          <div class="pd-sec-text">
            <div class="sec-kicker">§ ${String(i + 1).padStart(2, '0')}</div>
            <h3>${s.h}</h3>
            <p>${s.t}</p>
          </div>
          ${hasImg ? `
          <div class="pd-sec-img">
            <div class="pd-sec-img-wrap">
              <img src="${s.img}" alt="${s.h}" loading="lazy"/>
              <div class="pd-sec-img-label">${p.num}-FIG-${String(i + 1).padStart(2,'0')}</div>
            </div>
          </div>` : ''}
        </div>
      </div>`;
  }).join('');

  /* Gallery grid — all images */
  const galleryHtml = allGallery.length
    ? allGallery.map((src, i) => `
        <div class="gshot" data-idx="${i}">
          <img src="${src}" alt="${p.title} — figure ${i + 1}" loading="lazy"/>
          <span class="gshot-num">FIG · ${String(i + 1).padStart(2, '0')}</span>
        </div>`).join('')
    : Array.from({ length: 6 }).map((_, i) => `
        <div class="gshot striped">
          <span class="gshot-num">FIG · ${String(i + 1).padStart(2, '0')}</span>
          <div class="gshot-ref">${p.num}-${String(i + 1).padStart(3,'0')}</div>
        </div>`).join('');

  const toc = body.map((s, i) =>
    `<a href="#pd-sec-${i}">${String(i + 1).padStart(2, '0')} · ${s.h}</a>`
  ).join('');

  document.getElementById('pd-content').innerHTML = `
    <div class="meta-strip" style="margin-top:0">
      <div style="grid-column:span 3">PROJECT · ${p.num}</div>
      <div style="grid-column:span 3">CAT · ${p.cat.toUpperCase()}</div>
      <div style="grid-column:span 3">YEAR · ${p.year}</div>
      <div style="grid-column:span 3;text-align:right">
        <a href="../index.html">← RETURN TO INDEX</a>
      </div>
    </div>

    <!-- ── Hero headline ───────────────────────────── -->
    <section class="pd-head">
      <div>
        <div class="kicker">${p.num} · ${p.cat} · ${p.year}</div>
        <h1>${p.titleHtml || p.title}</h1>
      </div>
      <div class="lede">${p.lede || p.sum}</div>
    </section>

    <!-- ── Full-bleed hero image ───────────────────── -->
    <section class="pd-hero${hasHeroImg ? '' : ' striped'}">
      ${hasHeroImg ? `<img src="${p.heroImage}" alt="${p.title} hero" loading="lazy"/>` : ''}
      <div class="pd-hero-overlay">
        <span class="label">FIG · HERO — ${p.heroLabel || p.title.toUpperCase()}</span>
        <span class="dim">${p.num} · SCALE 1:1</span>
      </div>
      <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div>
      <div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
      ${!hasHeroImg ? `<div style="position:absolute;inset:0;display:grid;place-items:center;opacity:.18"><div style="width:45%;max-width:480px">${iconFor(p.id)}</div></div>` : ''}
    </section>

    <!-- ── KPI specs bar ───────────────────────────── -->
    <section class="pd-specs">
      ${kpis.map(k => `<div class="pd-spec"><div class="k">${k.k}</div><div class="v">${k.v}</div></div>`).join('')}
    </section>

    <!-- ── Body with TOC ───────────────────────────── -->
    <section class="pd-body">
      <aside class="pd-toc">
        <div class="label">§ Contents</div>
        ${toc}
        <div class="label" style="margin-top:24px">§ Tools</div>
        <div class="pd-tools">
          ${(p.tools || '').split('·').map(s => s.trim()).filter(Boolean).map(t => `<span class="pd-tool">${t}</span>`).join('')}
        </div>
        <div class="label" style="margin-top:24px">§ Tags</div>
        <div class="tags" style="flex-wrap:wrap">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </aside>
      <div class="pd-sections">
        ${bodySections}

        <!-- ── Gallery section ─────────────────────── -->
        <div class="pd-sec pd-gallery-sec">
          <div class="sec-kicker">§ ${String(body.length + 1).padStart(2, '0')}</div>
          <h3>Process &amp; build</h3>
          <p class="pd-gallery-intro">Selected figures from the design, fabrication, and testing phases.${allGallery.length ? ` ${allGallery.length} images.` : ' Placeholder — drop in real photos at 4:3.'}</p>
          <div class="pd-gallery-grid">
            ${galleryHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- ── Project nav ─────────────────────────────── -->
    <section class="pd-next">
      <a href="${prev.id}.html">
        <span class="t">← ${prev.title}</span>
        <span class="pn-label">PREV</span>
      </a>
      <a href="${next.id}.html">
        <span class="pn-label">NEXT</span>
        <span class="t">${next.title} →</span>
      </a>
    </section>
  `;

  /* ── Lightbox ──────────────────────────────────── */
  const shots = document.querySelectorAll('.gshot[data-idx]');
  if (shots.length && allGallery.length) {
    let currentIdx = 0;
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div class="lb-backdrop"></div>
      <div class="lb-inner">
        <img class="lb-img" src="" alt=""/>
        <div class="lb-controls">
          <button class="lb-btn lb-prev">‹</button>
          <span class="lb-counter"></span>
          <button class="lb-btn lb-next">›</button>
        </div>
        <button class="lb-close">✕</button>
      </div>`;
    document.body.appendChild(lb);

    const lbImg  = lb.querySelector('.lb-img');
    const lbCtr  = lb.querySelector('.lb-counter');

    function showLb(i) {
      currentIdx = (i + allGallery.length) % allGallery.length;
      lbImg.src = allGallery[currentIdx];
      lbCtr.textContent = `${currentIdx + 1} / ${allGallery.length}`;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    shots.forEach(el => el.addEventListener('click', () => showLb(+el.dataset.idx)));
    lb.querySelector('.lb-backdrop').addEventListener('click', closeLb);
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', () => showLb(currentIdx - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => showLb(currentIdx + 1));
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowRight') showLb(currentIdx + 1);
      if (e.key === 'ArrowLeft')  showLb(currentIdx - 1);
      if (e.key === 'Escape')     closeLb();
    });
  }

  /* ── Clock ──────────────────────────────────────── */
  function tick() {
    const d  = new Date();
    const el = document.getElementById('clock');
    if (el) el.textContent = `BOS · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
  }
  tick();
  setInterval(tick, 1000);

})();
