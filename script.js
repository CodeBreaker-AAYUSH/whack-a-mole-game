const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const backgroundMusic = document.getElementById('background-music');
let lastHole;
let timeUp = false;
let score = 0;

 function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

     if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000); 
    const hole = randomHole(holes); 
    hole.classList.add('up'); 
    setTimeout(() => {
        hole.classList.remove('up'); 
        if (!timeUp) {
            peep(); 
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    backgroundMusic.play(); 
    setTimeout(() => {
        timeUp = true;
        backgroundMusic.pause(); 
        backgroundMusic.currentTime = 0; 
    }, 15000); 
}

function wack(e) {
    if (!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up'); 
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack));

// Start the game (you may want to call this function based on some user action, like clicking a "Start" button)
// Example: document.querySelector('.start-button').addEventListener('click', startGame);
