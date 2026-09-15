const reduce = window.MX?.reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce && window.gsap) {
  window.MX?.splitText(".hub-title");

  gsap.from(".hub-title .char", {
    yPercent: 120,
    opacity: 0,
    duration: 0.9,
    stagger: 0.025,
    ease: "power4.out",
  });

  gsap.from(".hub-hero .eyebrow, .hub-hero .lead, .hub-hero .note", {
    opacity: 0,
    y: 24,
    stagger: 0.1,
    duration: 0.75,
    delay: 0.35,
  });

  gsap.from(".proposal", {
    opacity: 0,
    y: 40,
    scale: 0.96,
    stagger: 0.12,
    duration: 0.85,
    delay: 0.45,
    ease: "power3.out",
  });

  document.querySelectorAll(".proposal").forEach((card) => {
    const preview = card.querySelector(".preview");
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotateX: -y * 6,
        rotateY: x * 8,
        transformPerspective: 800,
        duration: 0.35,
        overwrite: "auto",
      });
      if (preview) gsap.to(preview, { x: x * 16, y: y * 12, scale: 1.08, duration: 0.35, overwrite: "auto" });
    });
    card.addEventListener("pointerleave", () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
      if (preview) gsap.to(preview, { x: 0, y: 0, scale: 1, duration: 0.5 });
    });
  });
} else {
  document.querySelectorAll(".proposal").forEach((el, i) => {
    setTimeout(() => el.classList.add("is-in"), 120 + i * 140);
  });
}
