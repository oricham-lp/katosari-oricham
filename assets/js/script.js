(() => {
  'use strict';

  const root = document.querySelector('.sari-lp-root');
  if (!root) return;

  root.classList.add('sari-lp-has-js');

  const targets = root.querySelectorAll('.sari-lp-reveal, .sari-lp-stagger');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('sari-lp-is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('sari-lp-is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -6% 0px'
  });

  targets.forEach((target) => observer.observe(target));
})();
