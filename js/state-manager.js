function setState(id) {
  document.querySelectorAll(".state").forEach(s =>
    s.classList.remove("active")
  );

  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

// default state
document.addEventListener("includesLoaded", () => {
  setState("welcome-state");
});
