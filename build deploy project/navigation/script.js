"use strict";

/* ---------- Topic navigation: active state ---------- */
const navBar = document.querySelector(".nav-bar");

if (navBar) {
  navBar.addEventListener("click", (event) => {
    const chip = event.target.closest(".nav-chip");
    if (!chip) return;

    navBar.querySelectorAll(".nav-chip").forEach((btn) => {
      const isActive = btn === chip;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  });
}

/* ---------- Search engine picker + submit ---------- */
let engine = "Google";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const engineGroup = document.querySelector(".search-engines");

if (engineGroup) {
  engineGroup.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-engine]");
    if (!btn) return;

    engine = btn.dataset.engine;
    engineGroup.querySelectorAll("button[data-engine]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (searchInput) {
      searchInput.placeholder = "Search with " + engine;
      searchInput.focus();
    }
  });
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    const urls = {
      Google: "https://www.google.com/search?q=" + encodeURIComponent(query),
      Bing: "https://www.bing.com/search?q=" + encodeURIComponent(query),
      DuckDuckGo: "https://duckduckgo.com/?q=" + encodeURIComponent(query)
    };

    window.open(urls[engine], "_blank", "noopener");
  });
}
