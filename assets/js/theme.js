// Light/dark toggle. The initial theme is set inline in the <head>.
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  function label() {
    toggle.textContent = root.getAttribute("data-theme") === "dark" ? "Light" : "Dark";
  }

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  label();
})();
