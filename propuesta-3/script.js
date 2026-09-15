const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
}

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero-text > *", {
    opacity: 0,
    y: 28,
    duration: 0.85,
    stagger: 0.1,
    ease: "power3.out",
  });

  gsap.from(".float", {
    opacity: 0,
    y: 50,
    scale: 0.92,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.2,
  });

  document.querySelectorAll(".parallax").forEach((el) => {
    const speed = Number(el.dataset.speed || 0.1);
    gsap.to(el, {
      y: () => speed * 160,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.utils.toArray(".tilt").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });

  gsap.utils.toArray(".reveal, .plan, .story-copy > *, .cta-box > *").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 34,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });
}
