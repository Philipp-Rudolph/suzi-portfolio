// src/utils/animations.js

export const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
};

export const animateSectionOnScroll = (sectionEl, baseDelay = 500) => {
  if (!sectionEl) return;

  const children = sectionEl.querySelectorAll('[data-js-animation]');
  const sectionTitle = sectionEl.querySelector('[data-js-animation-title]');

  // Set initial styles for fading elements
  children.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.willChange = 'opacity, transform';
  });

  // Add base class to allow ::after animation later
  if (sectionTitle) {
    sectionTitle.classList.add('title-underline'); // You’ll define this in CSS
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate elements one by one
          children.forEach((el, index) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, index * baseDelay);
          });

          // Add animation trigger class for underline
          if (sectionTitle) {
            sectionTitle.classList.add('underline-visible');
          }

          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(sectionEl);
};
