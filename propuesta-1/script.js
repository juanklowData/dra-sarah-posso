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

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".split-title span", {
    yPercent: 110,
    duration: 1.1,
    ease: "power4.out",
    stagger: 0.12,
    delay: 0.15,
  });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 36,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  gsap.utils.toArray(".reveal-scale").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      scale: 1.08,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  gsap.utils.toArray(".svc").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: -24,
      duration: 0.7,
      delay: i * 0.04,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%" },
    });
  });

  gsap.to(".hero-bg", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
}
