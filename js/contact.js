// =====================
// Contact.js – Contact Page Specific Scripts
// =====================

document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Card Modal Interactions (for Contact cards)
  // =====================
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach(card => {
    card.addEventListener("click", () => {
      // Create modal wrapper
      const modal = document.createElement("div");
      modal.classList.add("card-modal");
      modal.innerHTML = `
        <div class="contact-card">
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

  // =====================
  // Form validation & submission
  // =====================
  const form = document.querySelector(".contact-form");
  if (form) {
    const feedback = document.createElement("div");
    feedback.className = "form-feedback";
    form.prepend(feedback);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("input[name='name']");
      const email = form.querySelector("input[name='email']");
      const message = form.querySelector("textarea[name='message']");
      let valid = true;

      // Clear old errors
      feedback.textContent = "";
      feedback.className = "form-feedback";
      form.querySelectorAll(".error-msg").forEach(el => el.remove());

      const showError = (field, msg) => {
        valid = false;
        field.classList.add("invalid");
        const small = document.createElement("small");
        small.className = "error-msg";
        small.textContent = "⚠ " + msg;
        field.insertAdjacentElement("afterend", small);
      };

      // Validate name
      if (!name.value.trim()) {
        showError(name, "Name is required.");
      } else {
        name.classList.remove("invalid");
      }

      // Validate email
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        showError(email, "Please enter a valid email.");
      } else {
        email.classList.remove("invalid");
      }

      // Validate message
      if (!message.value.trim()) {
        showError(message, "Message cannot be empty.");
      } else {
        message.classList.remove("invalid");
      }

      if (!valid) {
        feedback.textContent = "❌ Please fix the errors below.";
        feedback.classList.add("error");
        return;
      }

      // Success UI
      feedback.textContent = "✅ Thank you for your message! I will get back to you soon.";
      feedback.classList.add("success");

      form.reset();
    });
  }
});
