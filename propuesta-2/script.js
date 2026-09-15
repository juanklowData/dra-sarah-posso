const reduce = window.MX?.reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  window.MX?.splitText(".hero h1 .line > span");

  gsap.from(".hero .line .char", {
    yPercent: 130,
    opacity: 0,
    duration: 0.95,
    ease: "power4.out",
    stagger: 0.018,
  });

  gsap.from(".hero .kicker, .hero .sub, .hero .row", {
    opacity: 0,
    y: 30,
    duration: 0.85,
    stagger: 0.1,
    delay: 0.4,
    ease: "power3.out",
  });

  gsap.to(".hero-media img", {
    scale: 1.18,
    yPercent: 8,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  gsap.utils.toArray(".mask-reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(14% 14% 14% 14%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "top 30%", scrub: true },
      }
    );
  });

  // Sticky-ish services list with highlight
  gsap.utils.toArray(".svc").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: -50,
      duration: 0.6,
      delay: i * 0.04,
      scrollTrigger: { trigger: el, start: "top 90%" },
    });

    el.addEventListener("pointerenter", () => {
      document.querySelectorAll(".svc").forEach((s) => s.classList.remove("is-hot"));
      el.classList.add("is-hot");
      gsap.fromTo(el.querySelector("em"), { x: -10, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
    });
  });

  gsap.utils.toArray(".quotes blockquote").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      rotate: i % 2 ? 1.5 : -1.5,
      duration: 0.85,
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  gsap.utils.toArray(".mosaic img").forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      scale: 1.15,
      duration: 1,
      scrollTrigger: { trigger: img, start: "top 90%" },
    });
    img.addEventListener("pointerenter", () => gsap.to(img, { scale: 1.05, duration: 0.45 }));
    img.addEventListener("pointerleave", () => gsap.to(img, { scale: 1, duration: 0.45 }));
  });

  gsap.from(".final > *", {
    opacity: 0,
    y: 36,
    stagger: 0.1,
    duration: 0.85,
    scrollTrigger: { trigger: ".final", start: "top 80%" },
  });

  // Horizontal accent on ticker
  const ticker = document.querySelector(".ticker-track");
  if (ticker) {
    gsap.to(ticker, {
      xPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: ".ticker", scrub: true, start: "top bottom", end: "bottom top" },
    });
  }
}
