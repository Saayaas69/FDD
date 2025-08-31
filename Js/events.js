// Month tab functionality
document.addEventListener("DOMContentLoaded", function () {
  const monthTabs = document.querySelectorAll(".month-tab");
  const monthSections = document.querySelectorAll(".month-section");

  monthTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const targetMonth = this.getAttribute("data-month");

      // Remove active class from all tabs
      monthTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Hide all sections
      monthSections.forEach((section) => {
        section.style.display = "none";
      });

      // Show target section
      const targetSection = document.getElementById(targetMonth + "-events");
      if (targetSection) {
        targetSection.style.display = "block";
      }
    });
  });

  // Initialize - show February by default
  monthSections.forEach((section, index) => {
    if (index === 0) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
});

// Smooth scroll animation for event cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".event-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });
}
