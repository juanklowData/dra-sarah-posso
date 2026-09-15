const reduce = window.MX?.reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initRotator() {
  const words = [...document.querySelectorAll(".rotator-word")];
  const pills = [...document.querySelectorAll(".pill-item")];
  if (!words.length) return;

  let i = 0;
  let timer;

  const show = (next) => {
    const prev = i;
    if (next === prev) return;
    words[prev].classList.remove("is-active");
    words[prev].classList.add("is-exit");
    words[next].classList.remove("is-exit");
    words[next].classList.add("is-active");
    pills.forEach((p) => p.classList.toggle("is-on", Number(p.dataset.pill) === next));
    setTimeout(() => words[prev].classList.remove("is-exit"), 450);
    i = next;
  };

  const play = () => {
    clearInterval(timer);
    if (reduce) return;
    timer = setInterval(() => show((i + 1) % words.length), 2600);
  };

  pills.forEach((p) => {
    p.addEventListener("click", () => {
      show(Number(p.dataset.pill));
      play();
    });
  });

  play();
}

initRotator();

if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  window.MX?.splitText(".split-title span");
  gsap.from(".split-title .char", {
    yPercent: 120,
    opacity: 0,
    rotate: 6,
    duration: 1,
    ease: "power4.out",
    stagger: 0.02,
    delay: 0.1,
  });

  gsap.from(".hero .tag, .hero .lead, .hero .actions", {
    opacity: 0,
    y: 36,
    duration: 0.85,
    stagger: 0.1,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.from(".specialty-strip .strip-label, .specialty-strip .rotator, .specialty-strip .pill-item", {
    opacity: 0,
    y: 24,
    stagger: 0.06,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: ".specialty-strip", start: "top 90%" },
  });

  gsap.to(".hero-bg", {
    yPercent: 16,
    scale: 1.05,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  // Sections pin-feel stagger
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 56,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
    });
  });

  gsap.utils.toArray(".reveal-scale").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(20% 14% 20% 14%)", scale: 1.1 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  gsap.utils.toArray(".svc").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: -48,
      duration: 0.75,
      delay: i * 0.06,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%" },
    });
    el.addEventListener("pointerenter", () => gsap.to(el, { paddingLeft: 20, duration: 0.3 }));
    el.addEventListener("pointerleave", () => gsap.to(el, { paddingLeft: 0, duration: 0.3 }));
  });

  gsap.utils.toArray(".steps li").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 44,
      scale: 0.96,
      duration: 0.8,
      delay: i * 0.08,
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  document.querySelectorAll(".gallery-grid .g").forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      y: 40,
      scale: 1.08,
      duration: 0.9,
      scrollTrigger: { trigger: img, start: "top 90%" },
    });
    img.addEventListener("pointermove", (e) => {
      const r = img.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(img, { x: x * 14, y: y * 14, scale: 1.05, duration: 0.35, overwrite: "auto" });
    });
    img.addEventListener("pointerleave", () => {
      gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.45 });
    });
  });

  gsap.from(".cta-band .cta-inner > *", {
    opacity: 0,
    y: 40,
    stagger: 0.12,
    duration: 0.9,
    scrollTrigger: { trigger: ".cta-band", start: "top 80%" },
  });

  const cta = document.querySelector(".cta-band");
  if (cta && window.MX?.fine) {
    const spot = document.createElement("div");
    spot.className = "glow-spot";
    cta.appendChild(spot);
    cta.addEventListener("pointermove", (e) => {
      const r = cta.getBoundingClientRect();
      gsap.to(spot, { left: e.clientX - r.left, top: e.clientY - r.top, duration: 0.4 });
    });
  }
}
