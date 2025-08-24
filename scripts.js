let mode = null;
let startTime, timeout;

function setMode(selectedMode) {
  mode = selectedMode;
  document.getElementById("modeSelect").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
}

function startTest() {
  result.textContent = "";
  status.textContent = "Warte auf Signal...";
  startBtn.disabled = true;

  const delay = Math.random() * 3000 + 2000;
  timeout = setTimeout(() => {
    status.textContent = "JETZT!";
    startTime = performance.now();

    if (mode === "touch") {
      document.body.addEventListener("mousedown", recordReaction);
      document.body.addEventListener("touchstart", recordReaction);
    } else if (mode === "controller") {
      listenToGamepad();
    }
  }, delay);
}

function recordReaction() {
  const reactionTime = performance.now() - startTime;
  status.textContent = "Bereit?";
  result.textContent = `Reaktionszeit: ${Math.round(reactionTime)} ms`;
  startBtn.disabled = false;

  document.body.removeEventListener("mousedown", recordReaction);
  document.body.removeEventListener("touchstart", recordReaction);
  clearTimeout(timeout);
}

function listenToGamepad() {
  const checkGamepad = () => {
    const gp = navigator.getGamepads()[0];
    if (gp && gp.buttons[0].pressed) {
      recordReaction();
    } else {
      requestAnimationFrame(checkGamepad);
    }
  };
  checkGamepad();
}

startBtn.addEventListener("click", startTest);