(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(() => {
    document.documentElement.classList.add("motion-ready");

    // Progress bar
    let bar = document.querySelector(".scroll-progress");
    if (!bar) {
      bar = document.createElement("div");
      bar.className = "scroll-progress";
      document.body.prepend(bar);
    }

    // Custom cursor
    let cursor, ring;
    if (fine && !reduce) {
      cursor = document.createElement("div");
      cursor.className = "mx-cursor";
      ring = document.createElement("div");
      ring.className = "mx-cursor-ring";
      document.body.append(cursor, ring);

      let x = 0, y = 0, rx = 0, ry = 0;
      window.addEventListener("pointermove", (e) => {
        x = e.clientX;
        y = e.clientY;
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      });

      const tickCursor = () => {
        rx += (x - rx) * 0.18;
        ry += (y - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(tickCursor);
      };
      tickCursor();

      document.querySelectorAll("a, button, .magnetic, .tilt, .svc, .plan, .interactive").forEach((el) => {
        el.addEventListener("pointerenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("pointerleave", () => document.body.classList.remove("cursor-hover"));
      });
    }

    // Magnetic buttons
    if (fine && !reduce) {
      document.querySelectorAll(".magnetic, .btn, .wa, .pill, .chip").forEach((el) => {
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.28}px)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      });
    }

    // Tilt cards
    if (fine && !reduce) {
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

    // Smooth scroll Lenis + GSAP
    if (!reduce && window.Lenis && window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: 0.2, start: 0, end: "max" },
      });
    } else {
      window.addEventListener("scroll", () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        bar.style.transform = `scaleX(${p})`;
      }, { passive: true });
    }

    // Nav burger shared pattern
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
    reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    fine: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
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
