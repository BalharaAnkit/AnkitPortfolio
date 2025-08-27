// =====================
// Contact Page JS
// =====================

document.addEventListener("DOMContentLoaded", () => {
  // Reveal on scroll (same as About page)
  const reveals = document.querySelectorAll(".reveal");
  const runReveal = () => {
    const h = window.innerHeight;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < h - 100) el.classList.add("active");
    });
  };
  window.addEventListener("scroll", runReveal);
  runReveal();

  // Card modal effect (same as About page)
  const contactCards = document.querySelectorAll(".contact-card");
  const modal = document.createElement("div");
  modal.classList.add("card-modal");
  document.body.appendChild(modal);

  contactCards.forEach(card => {
    card.addEventListener("click", () => {
      modal.innerHTML = `
        <div class="contact-card">
          <span class="card-modal-close">&times;</span>
          ${card.innerHTML}
        </div>
      `;
      modal.classList.add("active");

      modal.querySelector(".card-modal-close").addEventListener("click", () => {
        modal.classList.remove("active");
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
      });
    });
  });

  // Form validation & submission
  const form = document.querySelector(".contact-form");
  if (form) {
    // Add container for feedback
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

      // Utility to add error
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

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
