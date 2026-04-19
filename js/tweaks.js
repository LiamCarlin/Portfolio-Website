/**
 * tweaks.js — Dark/light mode toggle only.
 * Fixed: grid off, display grotesk, accent ink blue.
 */
(function () {
  const STORAGE_KEY = 'lzc-theme';

  const DISPLAY_SELECTORS = [
    '.hero h1', '.section-head h2', '.philo h3', '.contact h2',
    '.pd-head h1', '.pd-sec h3', '.archive-row .ttl',
    '.exp-rail h4', '.exp-item .role', '.hobby .t', '.hobbies-toggle h2',
  ].join(', ');

  function applyFont() {
    document.querySelectorAll(DISPLAY_SELECTORS).forEach(el => {
      el.style.fontFamily    = 'var(--sans)';
      el.style.fontWeight    = '500';
      el.style.letterSpacing = '-.02em';
    });
  }

  function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    try { localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'paper'); } catch {}
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = dark ? '◑ Light' : '◑ Dark';
  }

  function init() {
    // Fixed accent
    document.documentElement.style.setProperty('--accent', 'oklch(0.46 0.06 240)');

    // Apply grotesk font to display headings after DOM ready
    applyFont();
    // Re-apply after dynamic content renders (home.js / project.js inject HTML)
    setTimeout(applyFont, 100);

    // Load saved theme
    let dark = false;
    try { dark = localStorage.getItem(STORAGE_KEY) === 'dark'; } catch {}
    applyTheme(dark);

    const btn = document.getElementById('theme-btn');
    if (btn) {
      btn.addEventListener('click', () => applyTheme(!document.body.classList.contains('dark')));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
