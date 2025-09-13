document.addEventListener('DOMContentLoaded', () => {
  const includeEls = document.querySelectorAll('[data-include]');
  const loads = [];
  includeEls.forEach(el => {
    const url = el.getAttribute('data-include');
    if (url) {
      loads.push(
        fetch(url).then(r => r.text()).then(html => {
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
