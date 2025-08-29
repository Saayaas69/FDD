document.addEventListener("DOMContentLoaded", function () {
  /* ========================
       Mobile Menu Toggle
    ======================== */
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  mobileMenuToggle.addEventListener("click", function () {
    mobileMenuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  /* ========================
       Smooth Scroll for CTA button
    ======================== */
  const ctaButton = document.getElementById("exploreBtn");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      const target = document.getElementById("sports");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* ========================
       Scroll Animations using Intersection Observer
    ======================== */
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => observer.observe(el));

  /* ========================
       Hover effect on sport cards
    ======================== */
  document.querySelectorAll(".sport-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  /* ========================
       Footer scroll reveal
    ======================== */
  document.querySelectorAll(".footer-section").forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(section);
  });

  /* ========================
       Close mobile menu when clicking outside
    ======================== */
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    }
  });

  /* ========================
       Smooth scroll for navigation links
    ======================== */
  document.querySelectorAll('.nav-link[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        navMenu.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });
  });
});

document.getElementById("exploreBtn").addEventListener("click", function () {
  window.location.href = "sports.html";
});

fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });
