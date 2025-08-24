let totalTargets = parseInt(localStorage.getItem('targetCount')) || 10;
let hits = 0;
let reactionTimes = [];
let lastSpawnTime = 0;

window.onload = () => {
  spawnCircle();
};

function spawnCircle() {
  const gameArea = document.getElementById('gameArea');
  gameArea.innerHTML = '';

  const circle = document.createElement('div');
  circle.className = 'circle';

  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  lastSpawnTime = performance.now();

  circle.onclick = () => {
    const reactionTime = performance.now() - lastSpawnTime;
    reactionTimes.push(reactionTime);
    hits++;

    if (hits < totalTargets) {
      spawnCircle();
    } else {
      endGame();
    }
  };

  gameArea.appendChild(circle);
}

function endGame() {
  document.getElementById('gameArea').style.display = 'none';
  const avgTime = (reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(2);
  document.getElementById('result').innerHTML = `
    <h2>✅ Fertig!</h2>
    <p>Du hast <strong>${totalTargets}</strong> Kreise getroffen.</p>
    <p>Durchschnittliche Reaktionszeit: <strong>${avgTime} ms</strong></p>
    <button onclick="window.location.href='index.html'">Zurück zum Menü</button>
  `;
  document.getElementById('result').style.display = 'block';
}
