// 1) Respect "reduce motion": show the still poster instead of the looping video.
const video = document.querySelector(".hero__video");
if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  video.pause();
  video.removeAttribute("autoplay");
}

// 2) Projects page: filter by category and keep the grid pattern intact.
const tiles = [...document.querySelectorAll(".tile")];
const filters = [...document.querySelectorAll("[data-filter]")];

function layout(category) {
  let slot = 0;
  tiles.forEach((tile) => {
    const show = category === "all" || tile.dataset.category === category;
    tile.hidden = !show;
    if (show) tile.dataset.slot = slot++ % 4;
  });
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
}
