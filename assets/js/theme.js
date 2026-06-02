// Theme toggle, active-nav highlighting, and reveal-on-scroll.
(function () {
  "use strict";

  /* ---------- Dark / light toggle ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // Follow system changes only when the user hasn't made an explicit choice.
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", function (e) {
    var stored;
    try { stored = localStorage.getItem("theme"); } catch (err) {}
    if (!stored) root.setAttribute("data-theme", e.matches ? "dark" : "light");
  });

  /* ---------- Reveal-on-scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Active-section nav highlight ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
