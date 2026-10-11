(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    menuToggle.classList.toggle("open", open);
    navLinks.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  }

  menuToggle.addEventListener("click", function () {
    setMenu(!navLinks.classList.contains("open"));
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target)) setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) setMenu(false);
  });

  /* ---------- Navbar background on scroll ---------- */
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active link highlighting ---------- */
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            links.forEach(function (link) {
              link.classList.toggle("active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el, i) {
      // Small stagger for siblings inside grids
      const parent = el.parentElement;
      if (parent && (parent.classList.contains("skills-grid") || parent.classList.contains("contact-grid") || parent.classList.contains("hero-content"))) {
        el.style.transitionDelay = (Array.prototype.indexOf.call(parent.children, el) * 90) + "ms";
      }
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Profile photo fallback ---------- */
  // If profile.jpg isn't found, show a clean placeholder so the layout never breaks.
  const profileImg = document.getElementById("profileImg");
  if (profileImg) {
    const placeholder =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">' +
          '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#1b1f2e"/><stop offset="1" stop-color="#11141d"/></linearGradient></defs>' +
          '<rect width="400" height="500" fill="url(#g)"/>' +
          '<circle cx="200" cy="190" r="72" fill="#2a3045"/>' +
          '<path d="M60 460c0-85 62-150 140-150s140 65 140 150z" fill="#2a3045"/>' +
          '<text x="200" y="488" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#6b738a">Add profile.jpg</text>' +
          "</svg>"
      );

    profileImg.addEventListener("error", function handler() {
      profileImg.removeEventListener("error", handler);
      profileImg.src = placeholder;
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

