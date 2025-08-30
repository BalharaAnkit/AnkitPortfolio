// =====================
// About.js – About Page Specific Scripts
// =====================

document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Card Modal Interactions (for About cards)
  // =====================
  const cards = document.querySelectorAll(".about-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Create modal wrapper
      const modal = document.createElement("div");
      modal.classList.add("card-modal");
      modal.innerHTML = `
        <div class="about-card">
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
