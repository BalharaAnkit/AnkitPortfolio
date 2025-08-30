// =====================
// Main.js – Common Scripts for All Pages
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Mobile nav toggle
  // =====================
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      toggle.classList.toggle('active'); // trigger X animation
    });
  }

  // =====================
  // Navbar shadow on scroll
  // =====================
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 12) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // =====================
  // Reveal on scroll (IntersectionObserver with stagger)
  // =====================
  const revealEls = document.querySelectorAll(".reveal");

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in'); // trigger CSS transition
          entry.target.style.transitionDelay = `${index * 0.12}s`; // stagger effect
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, { threshold: 0.18 });

    revealEls.forEach(el => observer.observe(el));
  }

  // =====================
  // Year in footer
  // =====================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});