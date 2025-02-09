const targetColor = document.getElementById("targetColor");
const colorGrid = document.getElementById("colorGrid");
const scoreDisplay = document.getElementById("score");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("resetButton");
const difficultyButton = document.getElementById("difficultyButton");
const trailDisplay = document.getElementById("trail");
const Instruction = document.getElementById("InstructionButton");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

let score = 0;
let trail = 0;
let targetColorValue;
const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "cyan",
  "magenta",
];

function generateTargetColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  targetColorValue = colors[randomIndex];
  targetColor.style.backgroundColor = targetColorValue;
}

function generateColorGrid() {
  colorGrid.innerHTML = ""; // Clear previous grid

  const correctIndex = Math.floor(Math.random() * 6); 

  for (let i = 0; i < 6; i++) {
    const colorOption = document.createElement("button");
    colorOption.classList.add("color-option");
    if (i === correctIndex) {
      colorOption.style.backgroundColor = targetColorValue;
      colorOption.dataset.correct = "true";
    } else {
      let randomColor;
      do {
        randomColor = colors[Math.floor(Math.random() * colors.length)];
      } while (randomColor === targetColorValue); //

      colorOption.style.backgroundColor = randomColor;
    }

    colorOption.addEventListener("click", checkColor);
    colorGrid.appendChild(colorOption);
  }
}

function checkColor(event) {
  const selectedColor = event.target;
  if (selectedColor.dataset.correct === "true") {
    score++;
    scoreDisplay.textContent = score;
    messageDisplay.textContent = "Correct!";
    messageDisplay.style.color = "green";
    trail = 0;
    trailDisplay.textContent = "Trail : 0";
    setTimeout(newRound, 2000);
  } else {
    messageDisplay.textContent = "Wrong!";
    messageDisplay.style.color = "red";
    trail++;
    trailDisplay.textContent = "Trail  :  " +   trail;
     if (trail > 0) {
        trailDisplay.style.color = "red";
     } 


    if (trail >= 3) {
      gameOver();
    }
  }
}

function newRound() {
  generateTargetColor();
  generateColorGrid();
  messageDisplay.style.color="green"
  messageDisplay.textContent = " Good luck";
}

function gameOver() {
  resetGame();
}

function resetGame() {
  score = 0;
  trail = 0;
  scoreDisplay.textContent = score;
  trailDisplay.textContent = "";
  messageDisplay.textContent = "";
  newRound();
}

function handleDifficulty() {
  alert("Coming Soon!"); 
}

resetButton.addEventListener("click", resetGame);
difficultyButton.addEventListener("click", handleDifficulty);

Instruction.addEventListener("click", function () {
  window.location.href = "index.html";
} )

newRound(); 


function toggleMusic() {
  if (music.paused) {
    music.play();
     musicToggle.textContent = "Pause Music";
  } else {
    music.pause();
     musicToggle.textContent = "Play Music";
  }
}

window.addEventListener("load", (event) => {
  music.play().catch((error) => {
    console.error("Autoplay failed:", error); 
    musicToggle.textContent = "Play Music";
  });
  musicToggle.textContent = "Pause Music"; 
});

music.volume = 0.1;

music.addEventListener("ended", function () {
  music.currentTime = 0;
  music.play();
});

music.addEventListener("error", function (error) {
  console.error("Music playback error:", error);
});
