if (!window.__MYRI_SITE_INITIALIZED) {
  window.__MYRI_SITE_INITIALIZED = true;

  document.addEventListener('DOMContentLoaded', () => {
    const loads = [];

    const headIncludeEls = document.querySelectorAll('[data-include-head]');
    headIncludeEls.forEach(el => {
      const url = el.getAttribute('data-include-head');
      if (url) {
        loads.push(
          fetch(url)
            .then(resp => resp.text())
            .then(html => {
              const template = document.createElement('template');
              template.innerHTML = html;
              const fragment = template.content;
              fragment.querySelectorAll('script[src]').forEach(script => {
                const src = script.getAttribute('src');
                if (src && document.head.querySelector(`script[src="${src}"]`)) {
                  script.remove();
                }
              });
              document.head.insertBefore(fragment, el);
              el.remove();
            })
        );
      }
    });

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
  });
}
