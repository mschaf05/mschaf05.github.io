// 1) Respect "reduce motion": show the still poster instead of the looping video.
const video = document.querySelector(".hero__video");
if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  video.pause();
  video.removeAttribute("autoplay");
}

// 2) Projects page
const tiles = [...document.querySelectorAll(".tile")];
const filters = [...document.querySelectorAll("[data-filter]")];

// Show only tiles in a category and keep the grid pattern intact.
function layout(category) {
  const shown = tiles.filter((t) => {
    const ok = category === "all" || t.dataset.category.split(" ").includes(category);
    t.hidden = !ok;
    return ok;
  });
  shown.forEach((t, i) => (t.dataset.slot = i % 4));
  // a lone last tile in the second column slot stretches across the row
  const last = shown[shown.length - 1];
  if (last && last.dataset.slot === "2") last.dataset.slot = "2w";
}

if (tiles.length) {
  layout("all");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const active = btn.getAttribute("aria-pressed") === "true";
      const next = active ? "all" : btn.dataset.filter;   // click again to clear
      filters.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === next)));
      layout(next);
    })
  );

  // Project pop-up
  const modal = document.getElementById("project-modal");
  const q = (id) => document.getElementById(id);

  tiles.forEach((tile) =>
    tile.addEventListener("click", () => {
      const img = tile.querySelector("img");
      q("modal-img").src = img.src;
      q("modal-img").alt = img.alt;
      q("modal-img-link").href = img.src;
      q("modal-title").textContent = tile.querySelector(".tile__title").textContent;
      q("modal-tags").textContent = tile.querySelector(".tile__tags").textContent;
      q("modal-desc").textContent = tile.querySelector(".tile__desc").textContent;
      modal.showModal();
      modal.scrollTop = 0;
    })
  );

  modal.addEventListener("click", (e) => {
    // close on the Close button or a click on the dark backdrop
    if (e.target === modal || e.target.closest("[data-close]")) modal.close();
  });
}
