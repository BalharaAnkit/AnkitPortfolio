// Typed.js effect
const typed = new Typed('#element', {
  strings: [
    'I am a Passionate Web Developer.',
    'An Excellent Coder.',
    'And most importantly, a good learner.'
  ],
  typeSpeed: 48,
  backSpeed: 22,
  backDelay: 1200,
  loop: true
});

// Mobile nav toggle
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
  toggle.classList.toggle('active'); // trigger X animation
});

// Navbar shadow on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Reveal on scroll with stagger effect
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.style.transitionDelay = `${i * 0.12}s`; // stagger
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();


