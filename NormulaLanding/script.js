(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var revealTargets = document.querySelectorAll(
    ".card, .step, .stat, .price, .section__head, .benefits__text, .cta__text, .hero__content"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var form = document.getElementById("leadForm");
  var note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name;
      var email = form.email;
      var org = form.org;
      var valid = true;

      [name, email, org].forEach(function (field) {
        var ok = field.value.trim().length > 0;
        if (field === email) ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        field.classList.toggle("is-invalid", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        if (note) {
          note.textContent = "Vyplňte prosím jméno, název zařízení a platný e-mail.";
          note.className = "form__note is-err";
        }
        return;
      }

      if (note) {
        note.textContent = "Děkujeme! Ozveme se vám do 24 hodin a ukážeme Normula naživo.";
        note.className = "form__note is-ok";
      }
      form.reset();
    });
  }
})();
