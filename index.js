document.addEventListener("DOMContentLoaded", function () {
const playButton = document.querySelector("[data-testid='play-button']");

if (playButton) {
    playButton.addEventListener("click", function () {
    const clickSound = new Audio("sounds/mixkit-mouse-click-close-1113.wav");
    clickSound.play();

    setTimeout(() => {
        window.location.href = "gameInterface.html";
    }, 500);
    });
  }
});
