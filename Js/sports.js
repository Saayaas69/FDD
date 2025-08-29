// Sports page category filtering
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(
    ".category-tabs .learn-more-btn, .category-tabs .tab-btn"
  );
  const items = document.querySelectorAll(
    ".sports-grid .sport-card, .sports-grid .sport-item"
  );

  function setActiveTab(el) {
    tabs.forEach((t) => t.classList.remove("active"));
    el.classList.add("active");
  }

  function filterCategory(cat) {
    if (cat === "all") {
      items.forEach((it) => it.classList.remove("hidden"));
      return;
    }
    items.forEach((it) => {
      const cats = (it.getAttribute("data-category") || "").split(/\s+/);
      if (cats.includes(cat)) {
        it.classList.remove("hidden");
      } else {
        it.classList.add("hidden");
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const cat = tab.dataset.category;
      setActiveTab(tab);
      filterCategory(cat);
    });
  });

  // Default: show all
  const defaultTab = document.querySelector(
    ".category-tabs [data-category='all']"
  );
  if (defaultTab) {
    setActiveTab(defaultTab);
    filterCategory("all");
  }
});

fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });
