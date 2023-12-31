const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over-screen');
const gameOverScore = document.getElementById('game-over-score');

let snakeX = 2;
let snakeY = 2;
let foodX = 10;
let foodY = 10;
let snakeLength = 1;
let snakeTrail = [{ x: snakeX, y: snakeY }];
let directionX = 0;
let directionY = 0;
let gridSize = 15;

let score = 0;
let paused = false;
let gameInterval;

  // Voeg event listeners toe voor toetsen en knoppen
  document.getElementById('button-left').addEventListener('click', () => {
    console.log('Left button clicked'); // Voeg de console.log toe
    changeDirection(-1, 0);
  });
  document.getElementById('button-right').addEventListener('click', () => {
    console.log('Right button clicked');
    changeDirection(1, 0);
  });
  
  document.getElementById('button-up').addEventListener('click', () => {
    console.log('Up button clicked');
    changeDirection(0, -1);
  });
  
  document.getElementById('button-down').addEventListener('click', () => {
    console.log('Down button clicked');
    changeDirection(0, 1);
  });
  
  document.getElementById('button-pause').addEventListener('click', () => {
    console.log('Pause button clicked');
    togglePause();
  });

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      directionX = 0;
      directionY = -1;
      console.log('up');
      break;
    case 'ArrowDown':
      directionX = 0;
      directionY = 1;
      console.log('down');
      break;
    case 'ArrowLeft':
      directionX = -1;
      directionY = 0;
      console.log('left');
      break;
    case 'ArrowRight':
      directionX = 1;
      directionY = 0;
      console.log('right');
      break;
    case ' ':
      togglePause();
      console.log('pouse');
      break;
  }
});

let highScore = localStorage.getItem('snakeHighScore');
if (highScore === null) {
  highScore = 0;
  console.log(`New High Score!: ${highScore}`);
}
highScoreElement.textContent = `High Score: ${highScore}`;


function updateGameArea() {
    if (paused) return;
    snakeX += directionX;
    snakeY += directionY;
  
    if (snakeX < 0) snakeX = gridSize - 1;
    if (snakeX >= gridSize) snakeX = 0;
    if (snakeY < 0) snakeY = gridSize - 1;
    if (snakeY >= gridSize) snakeY = 0;
  
    snakeTrail.push({ x: snakeX, y: snakeY });
  
    // Keep the trail length equal to the snake length
    while (snakeTrail.length > snakeLength) {
      snakeTrail.shift();
    }
  
    // Check for self-collision
    for (let i = 0; i < snakeTrail.length - 1; i++) {
      if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
        // Snake collided with itself, reset the game
        snakeX = 2;
        snakeY = 2;
        snakeTrail = [{ x: snakeX, y: snakeY }];
        directionX = 0;
        directionY = 0;
        snakeLength = 1;
        score = 0;
        scoreElement.textContent = score;
      }
    }
  
    if (snakeX === foodX && snakeY === foodY) {
      score++;
      // Voeg deze code toe wanneer de slang groeit
snakeLength++;
snakeElement.classList.add('animated');
setTimeout(() => {
  snakeElement.classList.remove('animated');
}, 300);
      generateFood();
    }
  
    snakeElement.style.left = snakeX * 40 + 'px';
    snakeElement.style.top = snakeY * 40 + 'px';
  
    const trailElements = document.querySelectorAll('.trail');
    for (let i = 0; i < trailElements.length; i++) {
      trailElements[i].parentNode.removeChild(trailElements[i]);
    }
  
    for (let i = 0; i < snakeTrail.length; i++) {
      const trailSegment = snakeTrail[i];
      const trailSegmentElement = document.createElement('div');
      trailSegmentElement.className = 'trail';
      trailSegmentElement.style.left = trailSegment.x * 40 + 'px';
      trailSegmentElement.style.top = trailSegment.y * 40 + 'px';
      snakeElement.parentNode.insertBefore(trailSegmentElement, snakeElement);
    }
  
    scoreElement.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = `High Score: ${highScore}`;
      localStorage.setItem('snakeHighScore', highScore);
    }
  }
  
function generateFood() {
  foodX = Math.floor(Math.random() * gridSize);
  foodY = Math.floor(Math.random() * gridSize);
  foodElement.style.left = foodX * 40 + 'px';
  foodElement.style.top = foodY * 40 + 'px';
}

generateFood();
setInterval(updateGameArea, 275);

// Functie om de richting van de slang te veranderen
function changeDirection(newDirectionX, newDirectionY) {
  if (paused) return;
  if (Math.abs(newDirectionX) !== Math.abs(directionX) || Math.abs(newDirectionY) !== Math.abs(directionY)) {
    directionX = newDirectionX;
    directionY = newDirectionY;
  }
}

// Functie om het spel te pauzeren of hervatten
function togglePause() {
    paused = !paused;
    if (paused) {
      // Toon een pauze-scherm
      const pauseScreen = document.createElement('div');
      pauseScreen.id = 'pause-screen';
      pauseScreen.textContent = 'PAUZE';
      document.body.appendChild(pauseScreen);
  
      // Stop de game loop als het spel is gepauzeerd
      clearInterval(gameInterval);
    } else {
      // Verwijder het pauze-scherm
      const pauseScreen = document.getElementById('pause-screen');
      if (pauseScreen) {
        pauseScreen.parentNode.removeChild(pauseScreen);
      }
  
      // Start de game loop opnieuw als het spel wordt hervat
      gameInterval = setInterval(updateGameArea, 10000);
    }
  }

// Event listener voor het resetten van de hoogste score
document.getElementById('button-reset-high-score').addEventListener('click', resetHighScore);

// Functie om de hoogste score te resetten
function resetHighScore() {
  highScore = 0;
  localStorage.setItem('snakeHighScore', highScore);
  highScoreElement.textContent = `High Score: ${highScore}`;
}

function resetHighScore() {
  const confirmation = confirm('Weet je zeker dat je de high score wilt resetten?');

  if (confirmation) {
    highScore = 0;
    localStorage.setItem('snakeHighScore', highScore);
    highScoreElement.textContent = `High Score: ${highScore}`;
    alert('High score is gereset!!!!!');
  }
}

let userAgent = navigator.userAgent;
if (userAgent.match(/iPhone/i)) {
    let css = 'body {margin-top: 300px;}#button-reset-high-score {top: 150px;}.pause-button {top: 150px;}#high-score {top: 200px;}body {overflow: hidden;}';
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}