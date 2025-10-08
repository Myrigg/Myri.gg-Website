if (!window.__MYRI_SITE_INITIALIZED) {
  window.__MYRI_SITE_INITIALIZED = true;

  const initIncludes = () => {
    const loads = [];

    const includeEls = document.querySelectorAll('[data-include]');
    includeEls.forEach(el => {
      const url = el.getAttribute('data-include');
      if (url) {
        loads.push(
          fetch(url)
            .then(resp => resp.text())
            .then(html => {
              el.outerHTML = html;
            })
        );
      }
    });

    Promise.all(loads).then(() => {
      const current = window.location.pathname.replace(/\/$/, '') || '/';
      document.querySelectorAll('nav a').forEach(a => {
        const href = a.getAttribute('href').replace(/\/$/, '') || '/';
        if (href === current) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        }
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIncludes, { once: true });
  } else {
    initIncludes();
  }
}
