// =====================
// Index.js – Homepage Specific Scripts
// =====================

document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Typed.js effect
  // =====================
  const typedEl = document.getElementById("element");
  if (typedEl) {
    new Typed('#element', {
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
  }

  // =====================
  // Card Modal Interactions (for Experience cards)
  // =====================
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Create modal wrapper
      const modal = document.createElement("div");
      modal.classList.add("card-modal");
      modal.innerHTML = `
        <div class="card">
          ${card.innerHTML}
        </div>
        <span class="card-modal-close">&times;</span>
      `;
      document.body.appendChild(modal);

      // Trigger transition
      setTimeout(() => modal.classList.add("active"), 10);

      // Close on X click
      modal.querySelector(".card-modal-close").addEventListener("click", () => {
        modal.classList.remove("active");
        setTimeout(() => modal.remove(), 300);
      });

      // Close if background clicked
      modal.addEventListener("click", e => {
        if (e.target === modal) {
          modal.classList.remove("active");
          setTimeout(() => modal.remove(), 300);
        }
      });
    });
  });
});
