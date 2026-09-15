const reduce = window.MX?.reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  window.MX?.splitText(".hero h1 .line > span");

  gsap.from(".hero .line .char", {
    yPercent: 130,
    opacity: 0,
    duration: 0.95,
    ease: "power4.out",
    stagger: 0.016,
  });

  gsap.from(".hero .kicker, .hero .sub, .hero .row", {
    opacity: 0,
    y: 28,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.35,
    ease: "power3.out",
  });

  gsap.to(".hero-media img", {
    scale: 1.14,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  gsap.from(".pulse-card", {
    opacity: 0,
    y: 30,
    stagger: 0.08,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: ".pulse-strip", start: "top 90%" },
  });

  // Count-up feel on pulse numbers
  document.querySelectorAll(".pulse-card").forEach((card) => {
    card.addEventListener("pointerenter", () => {
      gsap.fromTo(card.querySelector("strong"), { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1 });
    });
  });

  gsap.utils.toArray(".mask-reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(16% 16% 16% 16%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "top 35%", scrub: true },
      }
    );
  });

  gsap.utils.toArray(".svc").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: -40,
      duration: 0.55,
      delay: i * 0.05,
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
    el.addEventListener("pointerenter", () => {
      document.querySelectorAll(".svc").forEach((s) => s.classList.remove("is-hot"));
      el.classList.add("is-hot");
    });
  });

  gsap.utils.toArray(".quotes blockquote").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 36,
      rotate: i % 2 ? 1.2 : -1.2,
      duration: 0.8,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  gsap.utils.toArray(".mosaic img").forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      scale: 1.12,
      duration: 1,
      scrollTrigger: { trigger: img, start: "top 90%" },
    });
    img.addEventListener("pointerenter", () => gsap.to(img, { scale: 1.04, duration: 0.4 }));
    img.addEventListener("pointerleave", () => gsap.to(img, { scale: 1, duration: 0.4 }));
  });

  gsap.from(".final > *", {
    opacity: 0,
    y: 32,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: { trigger: ".final", start: "top 80%" },
  });
}
