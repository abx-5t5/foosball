// Phase 2 note: physical buttons (e.g. an ESP32 over WiFi) will need a network
// endpoint to call, which means a small backend/relay service — GitHub Pages
// only serves static files, so that piece doesn't exist yet.

const WINNING_SCORE = 8;
const AUTO_RESET_DELAY_MS = 5000;
const CONFETTI_COLORS = ["#ff2e4d", "#2de2ff", "#ffe066", "#ff5f9e", "#7a2dff", "#7fff9e"];
const CONFETTI_COUNT = 140;

const redScoreEl = document.getElementById("red-score");
const blueScoreEl = document.getElementById("blue-score");
const winnerBanner = document.getElementById("winner-banner");
const confettiEl = document.getElementById("confetti");
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

function popScore(el) {
  el.classList.remove("pop");
  void el.offsetWidth; // restart the animation
  el.classList.add("pop");
}

function score(team) {
  if (gameOver) return;

  if (team === "red") {
    redScore++;
    popScore(redScoreEl);
  } else {
    blueScore++;
    popScore(blueScoreEl);
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
  spawnConfetti();

  autoResetTimer = setTimeout(reset, AUTO_RESET_DELAY_MS);
}

function spawnConfetti() {
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiEl.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function reset() {
  clearTimeout(autoResetTimer);
  autoResetTimer = null;
  redScore = 0;
  blueScore = 0;
  gameOver = false;
  winnerBanner.hidden = true;
  confettiEl.innerHTML = "";
  render();
}

redBtn.addEventListener("click", () => score("red"));
blueBtn.addEventListener("click", () => score("blue"));
resetBtn.addEventListener("click", reset);

render();
