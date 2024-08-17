const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const backgroundMusic = document.getElementById('background-music');
let lastHole;
let timeUp = false;
let score = 0;

// Create a function to generate a random time for the mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    // Prevent the same hole from getting selected again consecutively
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1000); // Get a random time to determine how long mole should peep
    const hole = randomHole(holes); // Get the random hole from the randomHole function
    hole.classList.add('up'); // Add the CSS class so the selected mole can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); // Make the selected mole "pop down" after a random time
        if (!timeUp) {
            peep(); // Continue peeping if the game hasn't ended
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    backgroundMusic.play(); // Start playing the background music
    setTimeout(() => {
        timeUp = true;
        backgroundMusic.pause(); // Stop the background music after the game ends
        backgroundMusic.currentTime = 0; // Reset the music to the beginning
    }, 15000); // Show random moles for 15 seconds
}

function wack(e) {
    if (!e.isTrusted) return; // Prevent fake clicks
    score++;
    this.parentNode.classList.remove('up'); // Remove the 'up' class from the clicked mole
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', wack));

// Start the game (you may want to call this function based on some user action, like clicking a "Start" button)
// Example: document.querySelector('.start-button').addEventListener('click', startGame);
