// Phase 2 note: physical buttons (e.g. an ESP32 over WiFi) will need a network
// endpoint to call, which means a small backend/relay service — GitHub Pages
// only serves static files, so that piece doesn't exist yet.

const WINNING_SCORE = 8;
const AUTO_RESET_DELAY_MS = 5000;

const redScoreEl = document.getElementById("red-score");
const blueScoreEl = document.getElementById("blue-score");
const winnerBanner = document.getElementById("winner-banner");
const redBtn = document.getElementById("red-btn");
const blueBtn = document.getElementById("blue-btn");
const resetBtn = document.getElementById("reset-btn");

let redScore = 0;
let blueScore = 0;
let gameOver = false;
let autoResetTimer = null;

function render() {
  redScoreEl.textContent = redScore;
  blueScoreEl.textContent = blueScore;
  redBtn.disabled = gameOver;
  blueBtn.disabled = gameOver;
}

function score(team) {
  if (gameOver) return;

  if (team === "red") {
    redScore++;
  } else {
    blueScore++;
  }
  render();

  if (redScore >= WINNING_SCORE || blueScore >= WINNING_SCORE) {
    announceWinner(redScore >= WINNING_SCORE ? "red" : "blue");
  }
}

function announceWinner(team) {
  gameOver = true;
  winnerBanner.textContent = `${team.toUpperCase()} WINS!`;
  winnerBanner.className = `winner-banner ${team}`;
  winnerBanner.hidden = false;
  render();

  autoResetTimer = setTimeout(reset, AUTO_RESET_DELAY_MS);
}

function reset() {
  clearTimeout(autoResetTimer);
  autoResetTimer = null;
  redScore = 0;
  blueScore = 0;
  gameOver = false;
  winnerBanner.hidden = true;
  render();
}

redBtn.addEventListener("click", () => score("red"));
blueBtn.addEventListener("click", () => score("blue"));
resetBtn.addEventListener("click", reset);

render();
