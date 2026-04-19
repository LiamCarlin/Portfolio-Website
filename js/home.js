/**
 * home.js — Homepage logic
 * Depends on: data.js (PROJECTS, EXPERIENCE, HOBBIES)
 */
(function () {

  /* ── SVG isotypes (line diagrams, shown when no heroImage) ── */
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

  /* ── Featured project cards ─────────────────────── */
  const FEAT  = PROJECTS.filter(p => p.featured);
  const featEl = document.getElementById('featured');
  if (featEl) {
    const countEl = document.getElementById('feat-count');
    if (countEl) countEl.textContent = FEAT.length;

    FEAT.forEach((p, i) => {
      const hasImg     = p.heroImage && p.heroImage.trim();
      const mediaClass = hasImg ? 'media' : 'media striped';

      const el = document.createElement('a');
      el.className = 'project' + (p.feat ? ' feat' : '');
      el.href      = `projects/${p.id}.html`;

      el.innerHTML = `
        <div>
          <div class="num">${p.num} · ${p.cat.toUpperCase()} · ${p.year}</div>
          <h3 class="title">${p.titleHtml || p.title}</h3>
          <p class="sum">${p.sum}</p>
          <div class="meta">
            <span>ROLE<b>${p.role}</b></span>
            <span>YEAR<b>${p.year}</b></span>
          </div>
          <div class="tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
        <div class="${mediaClass}">
          ${hasImg ? `<img src="${p.heroImage}" alt="${p.title}" loading="lazy"/>` : ''}
          <div class="overlay">
            <div class="top"><span>FIG · ${String(i + 1).padStart(2, '0')}</span><span>${p.num}</span></div>
            <div class="bot"><span>${p.heroLabel || p.title.toUpperCase()}</span><span>SCALE 1:1</span></div>
          </div>
          ${!hasImg ? `<div class="isotype">${iconFor(p.id)}</div>` : ''}
          <div class="crosshair ch-tl"></div><div class="crosshair ch-tr"></div>
          <div class="crosshair ch-bl"></div><div class="crosshair ch-br"></div>
        </div>
        <div class="arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </div>
      `;
      featEl.appendChild(el);
    });
  }

  /* ── Archive table ──────────────────────────────── */
  const arEl = document.getElementById('archive-rows');
  if (arEl) {
    PROJECTS.forEach(p => {
      const row = document.createElement('a');
      row.className = 'archive-row';
      row.href      = `projects/${p.id}.html`;
      row.innerHTML = `
        <div class="yr">${(p.year || '').split(' ')[0]}</div>
        <div class="ttl">${p.title}</div>
        <div class="cat">${p.cat}</div>
        <div class="role">${p.role}</div>
        <div class="tools">${(p.tools || '').replace(/·/g, '/')}</div>
        <div class="go">→</div>
      `;
      arEl.appendChild(row);
    });
  }

  /* ── Experience ─────────────────────────────────── */
  const expBody = document.getElementById('exp-body');
  if (expBody) {
    function renderExp(filter) {
      expBody.innerHTML = '';
      EXPERIENCE.forEach(group => {
        const items = filter === 'all'
          ? group.items
          : group.items.filter(it => it.cats.includes(filter));
        if (!items.length) return;

        const grp = document.createElement('div');
        grp.className = 'exp-group';
        grp.innerHTML = `
          <div class="exp-group-head">
            <span>§ ${group.group}</span>
            <span>${String(items.length).padStart(2, '0')} entr${items.length === 1 ? 'y' : 'ies'}</span>
          </div>
          ${items.map(it => `
            <article class="exp-item" data-cats="${it.cats.join(' ')}">
              <div class="when">${it.when}</div>
              <div>
                <h4 class="role">${it.role}</h4>
                <div class="org">${it.org}</div>
                <div class="loc">${it.loc}</div>
                <p class="desc">${it.desc}</p>
                ${it.bullets ? `<ul class="bullets">${it.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
                ${it.stack   ? `<div class="stack">${it.stack.map(s => `<span class="chip-sm">${s}</span>`).join('')}</div>` : ''}
              </div>
              <div class="side">
                <span class="rev">${it.rev}</span>
                <span>${it.cats[0].toUpperCase()}</span>
              </div>
            </article>
          `).join('')}
        `;
        expBody.appendChild(grp);
      });
    }

    // populate filter counts
    const allItems = EXPERIENCE.flatMap(g => g.items);
    ['all', 'engineering', 'industry', 'leadership', 'entrepreneurship'].forEach(c => {
      const el = document.getElementById('ct-' + c);
      if (el) el.textContent = String(
        c === 'all' ? allItems.length : allItems.filter(i => i.cats.includes(c)).length
      ).padStart(2, '0');
    });

    document.querySelectorAll('#exp-filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#exp-filters button').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        renderExp(btn.dataset.filter);
      });
    });
    renderExp('all');
  }

  /* ── Hobbies ────────────────────────────────────── */
  const hobbiesGrid = document.getElementById('hobbies-grid');
  const hobbyCount  = document.getElementById('hobby-count');
  if (hobbiesGrid) {
    if (hobbyCount) hobbyCount.textContent = HOBBIES.length;
    HOBBIES.forEach((h, i) => {
      const el = document.createElement('div');
      el.className = 'hobby';
      el.innerHTML = `
        <div class="num">H-${String(i + 1).padStart(3, '0')}</div>
        <h4 class="t">${h.t}${h.em ? ` <em>${h.em}</em>` : ''}</h4>
        <p class="d">${h.d}</p>
        <div class="meta"><span>${h.meta[0] || ''}</span><span>${h.meta[1] || ''}</span></div>
      `;
      hobbiesGrid.appendChild(el);
    });
  }

  const hobbiesToggle = document.getElementById('hobbies-toggle');
  if (hobbiesToggle) {
    hobbiesToggle.addEventListener('click', () => {
      const sec  = document.getElementById('section-hobbies');
      const open = sec.classList.toggle('open');
      hobbiesToggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* ── Nav scroll ─────────────────────────────────── */
  const SCROLL_MAP = {
    projects:   'section-projects',
    about:      'section-about',
    experience: 'section-experience',
    hobbies:    'section-hobbies',
    contact:    'section-contact',
  };

  function setActiveNav(k) {
    document.querySelectorAll('.navlinks a[data-nav]').forEach(a =>
      a.classList.toggle('active', a.dataset.nav === k)
    );
  }

  document.querySelectorAll('[data-nav]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const k = a.dataset.nav;
      if (k === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveNav('home'); return; }
      const id = SCROLL_MAP[k];
      if (!id) return;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
      if (k === 'hobbies') {
        const sec = document.getElementById('section-hobbies');
        if (sec) { sec.classList.add('open'); document.getElementById('hobbies-toggle').setAttribute('aria-expanded', 'true'); }
      }
      setActiveNav(k);
    });
  });

  /* ── Clock ──────────────────────────────────────── */
  function tick() {
    const d  = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    const el = document.getElementById('clock');
    if (el) el.textContent = `BOS · ${hh}:${mm}:${ss}`;
  }
  tick();
  setInterval(tick, 1000);

})();
