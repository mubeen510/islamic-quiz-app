// Save progress (optional, only if you want resume feature)
function saveProgress(category) {
  if (!category) return;
  localStorage.setItem(category + "Progress", JSON.stringify({ index, score }));
}

// Load progress (optional, only if you want resume feature)
function loadProgress(category) {
  if (!category) return;
  const data = JSON.parse(localStorage.getItem(category + "Progress"));
  if (data) {
    index = data.index;
    score = data.score;
  }
}

// Clear progress (call on restart or start new quiz)
function clearProgress(category) {
  if (category) {
    localStorage.removeItem(category + "Progress");
  } else {
    // Clear all categories
    localStorage.removeItem("quranProgress");
    localStorage.removeItem("seerahProgress");
    localStorage.removeItem("islam-basicsProgress");
  }
}
