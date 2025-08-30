// =====================
// Projects.js – Projects Page Specific Scripts
// =====================
document.addEventListener("DOMContentLoaded", () => {
  /* =====================
     Filtering (both groups)
     ===================== */
  const filterGroups = document.querySelectorAll(".filter-group");
  const cards        = document.querySelectorAll(".project-card");

  filterGroups.forEach(group => {
    const btns = group.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        // toggle active within this group only
        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilters();
      });
    });
  });

  function applyFilters() {
    // collect active filters per group (category/tags)
    const active = {};
    filterGroups.forEach(g => {
      const scope    = g.dataset.scope || "all";
      const activeEl = g.querySelector(".filter-btn.active");
      active[scope]  = activeEl ? activeEl.dataset.filter : "all";
    });

    cards.forEach(card => {
      const types = (card.dataset.type || "").split(" ").filter(Boolean);
      let show = true;
      for (const scope in active) {
        const f = active[scope];
        if (f !== "all" && !types.includes(f)) { show = false; break; }
      }
      card.style.display = show ? "" : "none";
    });
  }

  applyFilters(); // initial

  // =====================
  // Reset Filters
  // =====================
  const resetBtn = document.getElementById("reset-filters");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      filterGroups.forEach(group => {
        const btns = group.querySelectorAll(".filter-btn");
        btns.forEach(b => b.classList.remove("active"));
        const allBtn = group.querySelector('[data-filter="all"]');
        if (allBtn) allBtn.classList.add("active");
      });
      applyFilters();
    });
  }

  /* =====================
     Modal (Project details)
     ===================== */
  const detailsStore = document.querySelector(".project-details-store");

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.style.display = "none";
  overlay.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  const modalBody = overlay.querySelector(".modal-body");
  const closeBtn  = overlay.querySelector(".modal-close");

  function openModal(projectId) {
    let content = "";
    const fromStore = detailsStore && detailsStore.querySelector(`#details-${projectId}`);
    if (fromStore) {
      content = fromStore.innerHTML;
    } else {
      const card = document.querySelector(`.project-card[data-project="${projectId}"]`);
      content = card ? card.innerHTML : "";
    }

    modalBody.innerHTML = content;
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // lock page scroll

    initGallery(modalBody.querySelector(".gallery"));
  }

  function closeModal() {
    overlay.style.display = "none";
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  cards.forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.project));
  });

  /* =====================
     Gallery inside modal
     ===================== */
  function initGallery(gallery) {
    if (!gallery) return;

    const track = gallery.querySelector(".gallery-track");
    const images = track.querySelectorAll("img");
    const prevBtn = gallery.querySelector("[data-prev]");
    const nextBtn = gallery.querySelector("[data-next]");
    const dotsContainer = gallery.querySelector("[data-dots]");

    let index = 0;
    let autoSlideInterval;
    let isHovered = false;

    // create dots
    dotsContainer.innerHTML = "";
    images.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        updateGallery();
        if (!isHovered) resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });

    function updateGallery() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsContainer.querySelectorAll("button").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function showNext() {
      index = (index + 1) % images.length;
      updateGallery();
    }

    function showPrev() {
      index = (index - 1 + images.length) % images.length;
      updateGallery();
    }

    // Auto-slide
    function startAutoSlide() {
      autoSlideInterval = setInterval(showNext, 5000);
    }
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }
    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    prevBtn.addEventListener("click", () => {
      showPrev();
      if (!isHovered) resetAutoSlide();
    });
    nextBtn.addEventListener("click", () => {
      showNext();
      if (!isHovered) resetAutoSlide();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { showPrev(); if (!isHovered) resetAutoSlide(); }
      if (e.key === "ArrowRight") { showNext(); if (!isHovered) resetAutoSlide(); }
    });

    gallery.addEventListener("mouseenter", () => {
      isHovered = true;
      stopAutoSlide();
    });
    gallery.addEventListener("mouseleave", () => {
      isHovered = false;
      startAutoSlide();
    });

    updateGallery();
    startAutoSlide();
  }

  /* =====================
     Prevent project modal when clicking GitHub links
     ===================== */
  document.querySelectorAll('.project-github').forEach(link => {
    link.addEventListener('click', e => {
      e.stopPropagation(); // stops the click from bubbling up to the card
    });
  });
});
