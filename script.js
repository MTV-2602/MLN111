"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const backToTop = document.querySelector(".back-to-top");

  function updateChrome() {
    const scrolled = window.scrollY > 28;
    nav?.classList.toggle("scrolled", scrolled);
    backToTop?.classList.toggle("visible", window.scrollY > 480);
  }

  updateChrome();
  window.addEventListener("scroll", updateChrome, { passive: true });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
      });
    },
    { threshold: 0.46 }
  );

  sections.forEach(section => navObserver.observe(section));

  document.querySelectorAll(".mode-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;

      document.querySelectorAll(".mode-toggle-btn").forEach(item => {
        const isActive = item === btn;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      document.querySelectorAll(".step-content").forEach(content => {
        const isActive = content.id === `content-${mode}`;
        content.classList.toggle("active", isActive);
        if (isActive) {
          content.querySelectorAll(".reveal").forEach((el, index) => {
            setTimeout(() => el.classList.add("visible"), index * 80);
          });
        }
      });
    });
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
