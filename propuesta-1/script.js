const reduce = window.MX?.reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero title letter animation
  window.MX?.splitText(".split-title span");
  gsap.from(".split-title .char", {
    yPercent: 120,
    opacity: 0,
    rotate: 8,
    duration: 1,
    ease: "power4.out",
    stagger: 0.02,
    delay: 0.15,
  });

  gsap.from(".hero .tag, .hero .lead, .hero .actions", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    stagger: 0.12,
    delay: 0.55,
    ease: "power3.out",
  });

  // Parallax hero
  gsap.to(".hero-bg", {
    yPercent: 28,
    scale: 1.08,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".hero-inner", {
    yPercent: 18,
    opacity: 0.15,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  // Scroll reveals
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      rotateX: 8,
      duration: 0.95,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  gsap.utils.toArray(".reveal-scale").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(18% 12% 18% 12% round 0px)", scale: 1.12 },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        scale: 1,
        duration: 1.25,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  // Services interactive line
  gsap.utils.toArray(".svc").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: -40,
      duration: 0.7,
      delay: i * 0.05,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%" },
    });

    el.addEventListener("pointerenter", () => {
      gsap.to(el, { paddingLeft: 18, duration: 0.35, ease: "power2.out" });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { paddingLeft: 0, duration: 0.35, ease: "power2.out" });
    });
  });

  // Steps counter pop
  gsap.utils.toArray(".steps li").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // Gallery image hover drift
  document.querySelectorAll(".gallery-grid .g").forEach((img) => {
    img.addEventListener("pointermove", (e) => {
      const r = img.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(img, { x: x * 12, y: y * 12, scale: 1.04, duration: 0.4, overwrite: "auto" });
    });
    img.addEventListener("pointerleave", () => {
      gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "power2.out" });
    });
  });

  // CTA band glow follow
  const cta = document.querySelector(".cta-band");
  if (cta && window.MX?.fine) {
    const spot = document.createElement("div");
    spot.className = "glow-spot";
    cta.appendChild(spot);
    cta.addEventListener("pointermove", (e) => {
      const r = cta.getBoundingClientRect();
      gsap.to(spot, { left: e.clientX - r.left, top: e.clientY - r.top, duration: 0.45, ease: "power2.out" });
    });
  }

  // Marquee speed up on hover
  const track = document.querySelector(".track");
  if (track) {
    track.parentElement?.addEventListener("pointerenter", () => {
      track.style.animationDuration = "12s";
    });
    track.parentElement?.addEventListener("pointerleave", () => {
      track.style.animationDuration = "28s";
    });
  }
}
