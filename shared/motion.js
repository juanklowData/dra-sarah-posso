(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(() => {
    document.documentElement.classList.add("motion-ready");

    let bar = document.querySelector(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      document.body.prepend(bar);
    }

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    if (fine && !reduce) {
      document.querySelectorAll(".magnetic, .btn, .wa, .pill, .chip").forEach((el) => {
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      });

      document.querySelectorAll(".tilt, .plan, .svc-card").forEach((el) => {
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-4px)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      });
    }

    if (!reduce && window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    if (burger && nav) {
      burger.addEventListener("click", () => {
        const open = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", String(!open));
        nav.classList.toggle("open", !open);
      });
      nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          burger.setAttribute("aria-expanded", "false");
          nav.classList.remove("open");
        })
      );
    }
  });

  window.MX = {
    reduce,
    fine,
    splitText(selector) {
      document.querySelectorAll(selector).forEach((el) => {
        if (el.dataset.split === "1") return;
        const text = el.textContent;
        el.textContent = "";
        el.setAttribute("aria-label", text);
        [...text].forEach((ch) => {
          const s = document.createElement("span");
          s.className = "char";
          s.textContent = ch === " " ? "\u00A0" : ch;
          el.appendChild(s);
        });
        el.dataset.split = "1";
      });
    },
  };
})();
