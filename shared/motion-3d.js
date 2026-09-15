(() => {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(() => {
    // Auto-upgrade common interactive blocks
    const selectors = [
      ".svc",
      ".plan",
      ".tilt",
      ".pulse-card",
      ".portrait",
      ".quotes blockquote",
      ".proposal",
      ".story-photo",
      ".float",
      ".g",
    ];

    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      if (!el.classList.contains("card-3d") && !el.classList.contains("float-3d") && !el.classList.contains("img-3d")) {
        if (el.matches(".float, .g, .portrait, .story-photo")) el.classList.add("img-3d");
        else el.classList.add("card-3d");
      }
      if (el.classList.contains("card-3d") && !el.querySelector(":scope > .glare")) {
        const glare = document.createElement("span");
        glare.className = "glare";
        el.appendChild(glare);
      }
    });

    // Parent scenes
    document.querySelectorAll(".service-rail, .plan-grid, .pillars, .pulse-grid, .gallery-grid, .hero-visual, .quotes").forEach((el) => {
      el.classList.add("scene-3d");
    });

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    document.querySelectorAll(".card-3d").forEach((card) => {
      const glare = card.querySelector(".glare");
      let raf = 0;
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;

      const render = () => {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        card.style.transform = `rotateX(${(-cy * 10).toFixed(2)}deg) rotateY(${(cx * 12).toFixed(2)}deg) translateZ(8px)`;
        if (glare) {
          card.style.setProperty("--gx", `${50 + cx * 40}%`);
          card.style.setProperty("--gy", `${50 + cy * 40}%`);
        }
        if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(render);
        else raf = 0;
      };

      card.addEventListener("pointerenter", () => card.classList.add("is-tilting"));
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        tx = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5);
        ty = clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5);
        if (!raf) raf = requestAnimationFrame(render);
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        tx = 0;
        ty = 0;
        if (!raf) raf = requestAnimationFrame(render);
        const end = () => {
          if (Math.abs(cx) < 0.01 && Math.abs(cy) < 0.01) {
            card.style.transform = "";
            return;
          }
          requestAnimationFrame(end);
        };
        requestAnimationFrame(end);
      });
    });

    // Images / floats follow pointer in 3D
    document.querySelectorAll(".img-3d, .float-3d").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateZ(18px) scale(1.03)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
      });
    });

    // Hero scene: subtle global parallax layers
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.classList.add("scene-3d");
      hero.addEventListener("pointermove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        hero.querySelectorAll(".hero-bg, .hero-media img").forEach((layer) => {
          layer.style.transform = `translate3d(${x * -12}px, ${y * -10}px, 0) scale(1.04)`;
        });
        hero.querySelectorAll(".hero-inner, .hero-copy, .hero-text").forEach((layer) => {
          layer.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 40px)`;
        });
      });
      hero.addEventListener("pointerleave", () => {
        hero.querySelectorAll(".hero-bg, .hero-media img, .hero-inner, .hero-copy, .hero-text").forEach((layer) => {
          layer.style.transform = "";
        });
      });
    }
  });
})();
