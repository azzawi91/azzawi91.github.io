(function () {
  var root = document.documentElement;

  // ---- theme: saved choice > system preference ----
  function getSaved() { try { return localStorage.getItem("theme"); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem("theme", v); } catch (e) {} }
  var saved = getSaved();
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".theme-toggle");
    function label() {
      if (!toggle) return;
      var dark = root.getAttribute("data-theme") === "dark";
      toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    }
    label();
    if (toggle) toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next); save(next); label();
    });

    // ---- mobile nav ----
    var navBtn = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (navBtn && nav) navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // ---- active nav link ----
    var page = document.body.getAttribute("data-page");
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });

    // ---- click-to-play research animations (poster -> GIF) ----
    document.querySelectorAll(".work-media").forEach(function (box) {
      var btn = box.querySelector(".play");
      var img = box.querySelector("img");
      if (!btn || !img) return;
      btn.addEventListener("click", function () {
        var gif = img.getAttribute("data-gif");
        if (!gif) return;
        btn.querySelector("span").lastChild.textContent = " Loading…";
        var pre = new Image();
        pre.onload = function () { img.src = gif; box.classList.add("playing"); };
        pre.src = gif;
      });
    });

    // ---- reveal on scroll ----
    var items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("in"); });
    }

    // ---- footer year ----
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
