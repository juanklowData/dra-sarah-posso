document.querySelectorAll(".proposal").forEach((el, i) => {
  setTimeout(() => el.classList.add("is-in"), 120 + i * 140);
});
