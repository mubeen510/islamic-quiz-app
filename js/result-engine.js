function showResult() {
  setState("result-state");
  const totalQuestions = questionsArray.length;
  document.getElementById("score-text").innerText =
    `You scored ${score} / ${quranQuestions.length}`;
  clearProgress();
}
document.addEventListener("includesLoaded", () => {

  const restartBtn = document.getElementById("restart-btn");

  if (!restartBtn) return;

  restartBtn.addEventListener("click", () => {
    // reset score & index
    index = 0;
    score = 0;
    questionsArray = [];

    // go back to welcome screen
    setState("welcome-state");

    // reset category selection
    const categoryBtns = document.querySelectorAll(".category-btn");
    const startBtn = document.getElementById("start-btn");
    if (categoryBtns.length && startBtn) {
      categoryBtns.forEach(b => b.classList.remove("selected"));
      startBtn.disabled = true;
    }
   

  });
 

});
