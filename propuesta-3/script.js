const reduce = window.MX?.reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  window.MX?.splitText(".hero h1");

  gsap.from(".hero h1 .char", {
    yPercent: 110,
    opacity: 0,
    filter: "blur(6px)",
    duration: 0.85,
    stagger: 0.018,
    ease: "power3.out",
  });

  gsap.from(".hero-text .eyebrow, .hero-text .lead, .hero-text .actions", {
    opacity: 0,
    y: 26,
    stagger: 0.1,
    duration: 0.75,
    delay: 0.3,
  });

  gsap.from(".float", {
    opacity: 0,
    y: 70,
    scale: 0.88,
    rotate: 5,
    duration: 1.05,
    stagger: 0.12,
    ease: "power3.out",
    delay: 0.15,
  });

  document.querySelectorAll(".parallax").forEach((el) => {
    const speed = Number(el.dataset.speed || 0.1);
    gsap.to(el, {
      y: () => speed * 200,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  });

  document.querySelectorAll(".float").forEach((el, i) => {
    gsap.to(el, {
      y: `+=${12 + i * 5}`,
      duration: 2.8 + i * 0.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  });

  gsap.from(".band h2, .band .eyebrow", {
    opacity: 0,
    y: 40,
    duration: 0.85,
    scrollTrigger: { trigger: ".band", start: "top 80%" },
  });

  gsap.from(".tilt", {
    opacity: 0,
    y: 50,
    stagger: 0.12,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: { trigger: ".pillars", start: "top 85%" },
  });

  gsap.from(".plan", {
    opacity: 0,
    y: 48,
    rotateX: 8,
    stagger: 0.1,
    duration: 0.85,
    ease: "power3.out",
    scrollTrigger: { trigger: ".plan-grid", start: "top 80%" },
  });

  document.querySelectorAll(".plan").forEach((plan) => {
    plan.addEventListener("pointerenter", () => {
      gsap.to(plan, { y: -8, duration: 0.3, ease: "power2.out" });
    });
    plan.addEventListener("pointerleave", () => {
      gsap.to(plan, { y: 0, duration: 0.35 });
    });
  });

  gsap.from(".story-photo", {
    clipPath: "inset(12% 12% 12% 12% round 28px)",
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".story", start: "top 75%" },
  });

  gsap.from(".story-copy > *", {
    opacity: 0,
    x: 30,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: { trigger: ".story-copy", start: "top 80%" },
  });

  if (window.MX?.fine) {
    window.addEventListener("pointermove", (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 28;
      const my = (e.clientY / window.innerHeight - 0.5) * 28;
      gsap.to(".b1", { x: mx, y: my, duration: 1.1, overwrite: "auto" });
      gsap.to(".b2", { x: -mx * 0.65, y: -my * 0.65, duration: 1.3, overwrite: "auto" });
      gsap.to(".b3", { x: mx * 0.35, y: -my * 0.45, duration: 1, overwrite: "auto" });
    });
  }

  ScrollTrigger.create({
    trigger: ".cta-box",
    start: "top 85%",
    onEnter: () => {
      gsap.fromTo(".cta-box", { scale: 0.94, opacity: 0.7 }, { scale: 1, opacity: 1, duration: 0.75, ease: "back.out(1.5)" });
      gsap.from(".cta-box > *", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 });
    },
  });
}
