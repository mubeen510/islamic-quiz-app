/************************************
 * QUIZ ENGINE – FINAL VERSION
 * Works with:
 * question
 * options
 * answer
 * explanation
 ************************************/

// GLOBAL STATE
let currentIndex = 0;
let score = 0;
let questions = [];
let userAnswers = []; // store { question, selected, correct, isCorrect }
let timerInterval = null;
let timeLeft = 60; // 1 minute for 7 questions





document.addEventListener("includesLoaded", () => {

  // ELEMENTS
  const startBtn = document.getElementById("start-btn");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const explanationEl = document.getElementById("explanation");
  const scoreText = document.getElementById("score-text");
  const progressBar = document.getElementById("progress-bar");


  if (!startBtn || !questionText || !optionsContainer || !nextBtn || !progressBar) {
    console.error("Quiz elements missing in HTML");
    return;
  }

  // START QUIZ
  startBtn.addEventListener("click", () => {

    const selectedCategory = localStorage.getItem("selectedCategory");
    if (!selectedCategory) {
      console.error("No category selected");
      return;
    }
    // RESET TIMER
clearInterval(timerInterval);
timeLeft = 60;

const timerEl = document.getElementById("timer");
const timeLeftEl = document.getElementById("time-left");

if (timerEl) timerEl.style.display = "block";
if (timeLeftEl) timeLeftEl.textContent = timeLeft;

// START TIMER
timerInterval = setInterval(() => {
  timeLeft--;
  if (timeLeftEl) timeLeftEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz(); // auto finish quiz
  }
}, 1000);


    // Load questions dynamically
    questions = window[selectedCategory + "Questions"];

    if (!questions || !questions.length) {
      console.error("Question bank not found for:", selectedCategory);
      return;
    }

    // RESET STATE
    currentIndex = 0;
    score = 0;

    showQuestion();
  });

  // SHOW QUESTION
  function showQuestion () {

    // QUIZ END
    if (currentIndex >= questions.length) {
      
    setState("result-state"); // show result screen
    
    if (scoreText) {
        const percentage = Math.round((score / questions.length) * 100); // calculate percentage
        scoreText.textContent = `Your Score: ${score} / ${questions.length} (${percentage}% )`;
    } else {
        console.error("scoreText element not found");
    }
    

    return;
}

    const q = questions[currentIndex];
    

    // RESET UI
    questionText.textContent = q.question;
    optionsContainer.innerHTML = "";
    if (explanationEl) explanationEl.textContent = "";

    // CREATE OPTIONS
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = option;

      btn.addEventListener("click", () => {
        let selectedAnswer = option;
    let isCorrect = selectedAnswer === q.answer;

   
 // Save for summary
    userAnswers[currentIndex] = {
        
        isCorrect
    };
    

        // CHECK ANSWER
        if (option === q.answer) {
          score++;
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");

          // highlight correct option
          optionsContainer.querySelectorAll("button").forEach(b => {
            if (b.textContent === q.answer) {
             
            }
          });
        }

        // SHOW EXPLANATION
        if (explanationEl) {
          explanationEl.textContent = q.explanation;
        }
        const counterEl = document.getElementById('question-counter');
if (counterEl) counterEl.textContent = `${currentIndex + 1}/${questions.length}`;


        // Calculate progress
const progressPercent = ((currentIndex + 1) / questions.length) * 100;
if (progressBar) {
  progressBar.style.width = progressPercent + "%";
}
 // ===== SUMMARY (Correct / Incorrect) =====
const summaryContainer = document.getElementById("summary-container");

const correctCount = userAnswers.filter(ans => ans.isCorrect).length;
const incorrectCount = userAnswers.filter(ans => ans.isCorrect === false).length;

if (summaryContainer) {
  summaryContainer.innerHTML = `
    <p class="correct-summary">✅ Correct Answers: ${correctCount}</p>
    <p class="wrong-summary">❌ Incorrect Answers: ${incorrectCount}</p>
  `;
}
saveHighScore(selectedCategory, score, questions.length);


        // DISABLE ALL OPTIONS
        optionsContainer
          .querySelectorAll("button")
          .forEach(b => b.disabled = true);
      });

      optionsContainer.appendChild(btn);
    });
  }
  

  

  // NEXT BUTTON
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    showQuestion();
  });


function endQuiz() {
  const selectedCategory = localStorage.getItem("selectedCategory");

  // Safety checks (error prevent)
  if (!selectedCategory) return;
  if (!questions || questions.length === 0) return;

  const total = questions.length;
  const obtained = score;

  // Prevent 0/0 or null%
  if (total === 0) return;

  const key = `highScores_${selectedCategory}`;
  const percentage = Math.round((obtained / total) * 100);

  let scores = JSON.parse(localStorage.getItem(key)) || [];

  // Add latest score on top
  scores.unshift({
    score: obtained,
    total: total,
    percentage: percentage,
    date: new Date().toLocaleDateString()
  });

  // Keep only latest 2 attempts
  scores = scores.slice(0, 2);

  localStorage.setItem(key, JSON.stringify(scores));
}


});
