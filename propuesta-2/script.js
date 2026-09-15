const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
}

const cursor = document.querySelector(".cursor");
if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  window.addEventListener("pointermove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero .line > span", {
    yPercent: 120,
    duration: 1.05,
    ease: "power4.out",
    stagger: 0.1,
  });
  gsap.from(".hero .kicker, .hero .sub, .hero .row", {
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.08,
    delay: 0.35,
    ease: "power3.out",
  });

  gsap.utils.toArray(".mask-reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(12% 12% 12% 12%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  });

  gsap.utils.toArray(".svc").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: -30,
      duration: 0.55,
      delay: i * 0.05,
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  gsap.utils.toArray(".quotes blockquote, .mosaic img, .final h2, .final p, .final .btn").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });
}
