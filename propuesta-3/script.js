const reduce = window.MX?.reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  window.MX?.splitText(".hero h1");

  gsap.from(".hero h1 .char", {
    yPercent: 110,
    opacity: 0,
    filter: "blur(8px)",
    duration: 0.9,
    stagger: 0.02,
    ease: "power3.out",
  });

  gsap.from(".hero-text .eyebrow, .hero-text .lead, .hero-text .actions", {
    opacity: 0,
    y: 28,
    stagger: 0.1,
    duration: 0.8,
    delay: 0.35,
  });

  gsap.from(".float", {
    opacity: 0,
    y: 80,
    scale: 0.86,
    rotate: 4,
    duration: 1.1,
    stagger: 0.14,
    ease: "power3.out",
    delay: 0.2,
  });

  document.querySelectorAll(".parallax").forEach((el) => {
    const speed = Number(el.dataset.speed || 0.1);
    gsap.to(el, {
      y: () => speed * 220,
      rotate: speed * 12,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  });

  // Floating continuous drift
  document.querySelectorAll(".float").forEach((el, i) => {
    gsap.to(el, {
      y: `+=${10 + i * 6}`,
      x: `+=${6 - i * 3}`,
      duration: 3 + i,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  });

  gsap.utils.toArray(".tilt, .plan, .reveal, .story-copy > *, .cta-box > *").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 42,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // Plans cascade
  gsap.from(".plan", {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: { trigger: ".plan-grid", start: "top 80%" },
  });

  // Blobs react to pointer
  if (window.MX?.fine) {
    window.addEventListener("pointermove", (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 30;
      const my = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(".b1", { x: mx, y: my, duration: 1.2, overwrite: "auto" });
      gsap.to(".b2", { x: -mx * 0.7, y: -my * 0.7, duration: 1.4, overwrite: "auto" });
      gsap.to(".b3", { x: mx * 0.4, y: -my * 0.5, duration: 1.1, overwrite: "auto" });
    });
  }

  // CTA pulse on enter
  ScrollTrigger.create({
    trigger: ".cta-box",
    start: "top 85%",
    onEnter: () => {
      gsap.fromTo(".cta-box", { scale: 0.94 }, { scale: 1, duration: 0.8, ease: "back.out(1.4)" });
    },
  });
}
