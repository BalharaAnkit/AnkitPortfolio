// js/projects.js

document.addEventListener("DOMContentLoaded", () => {
  /* =====================
     Reveal on scroll
     ===================== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

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
      // rely on your CSS for display; just hide/show
      card.style.display = show ? "" : "none";
    });
  }

  applyFilters(); // initial

  // =====================
// Reset Filters
// =====================
const resetBtn = document.getElementById("reset-filters");

resetBtn.addEventListener("click", () => {
  // clear active from all groups
  filterGroups.forEach(group => {
    const btns = group.querySelectorAll(".filter-btn");
    btns.forEach(b => b.classList.remove("active"));
    // always reset to the "All" button in each group
    const allBtn = group.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add("active");
  });

  applyFilters(); // show all cards
});

  /* =====================
     Modal (uses your .modal-overlay CSS)
     ===================== */
  const detailsStore = document.querySelector(".project-details-store");

  // build overlay once and reuse
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
    // prefer full details from the hidden store; fallback to the card contents
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

    // init gallery if present
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

  // click cards → open modal
  cards.forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.project));
  });

  /* =====================
     Gallery inside modal
     ===================== */
  function initGallery(gallery) {
    if (!gallery) return;
    const track   = gallery.querySelector(".gallery-track");
    const images  = track ? track.querySelectorAll("img") : [];
    const prevBtn = gallery.querySelector("[data-prev]");
    const nextBtn = gallery.querySelector("[data-next]");
    const dotsEl  = gallery.querySelector("[data-dots]");
    if (!track || !images.length || !dotsEl) return;

    let idx = 0;
    dotsEl.innerHTML = "";
    images.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => { idx = i; update(); });
      dotsEl.appendChild(dot);
    });

    function update() {
      track.style.transform = `translateX(-${idx * 100}%)`;
      dotsEl.querySelectorAll("button").forEach((d, i) => {
        d.classList.toggle("active", i === idx);
      });
    }

    prevBtn && prevBtn.addEventListener("click", () => { idx = (idx - 1 + images.length) % images.length; update(); });
    nextBtn && nextBtn.addEventListener("click", () => { idx = (idx + 1) % images.length; update(); });

    update();
  }

  /* =====================
     Footer year
     ===================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
