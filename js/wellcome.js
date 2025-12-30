document.addEventListener("includesLoaded", () => {

  let selectedCategory = null;

  const categoryBtns = document.querySelectorAll(".category-btn");
  const startBtn = document.getElementById("start-btn");

  if (!categoryBtns.length || !startBtn) {
    console.error("Welcome elements not found");
    return;
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      selectedCategory = btn.dataset.category;
      // 🔥 FIX: Save selected category to localStorage
    localStorage.setItem("selectedCategory", selectedCategory);

      startBtn.disabled = false;
    });
  });

  startBtn.addEventListener("click", () => {
  clearProgress(selectedCategory); // clear any old saved data for this category
  document.getElementById('progress-bar').style.width = '0%';

  index = 0;
  score = 0;

  // Assign questionsArray
  switch(selectedCategory) {
    case "quran": questionsArray = window.quranQuestions; break;
    case "prophets": questionsArray = window.prophetsQuestions; break;
    case "pillars": questionsArray = window.pillarsQuestions; break;
  }

  setState("quiz-state");
  showQuestion();
  refreshSVG();


});


});
