let canvas;
let world;
let startScreen;
let startButton;
let keyboard = new Keyboard();
let music;
let victory;
let muteButton;
let muteButtonIngame;
let muteIcon;
let muteIconIngame;
let mute = false;

/**
 * Initializes the game by getting references to HTML elements.
 */
function init() {
    startScreen = document.getElementById('start-screen');
    startButton = document.getElementById('start-button');
    gameOverScreen = document.getElementById('game-over-screen');
    youWinScreen = document.getElementById('you-win-screen');
    muteButton = document.getElementById('mute-button');
    muteButtonIngame = document.getElementById('mute-button-ingame');
    muteIcon = document.getElementById('mute-icon');
    muteIconIngame = document.getElementById('mute-icon-ingame');
}

/**
 * Starts the game by initializing sounds, playing background music, initializing the level,
 * creating a game world, and updating the display.
 */
function startGame() {
    sounds.initialize();
    sounds.MUSIC.play();
    sounds.MUSIC.loop = true;
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startScreen.style.display = 'none';
    muteButtonIngame.style.display = 'block';
}

/**
 * Enlarges the game by starting it and requesting fullscreen mode.
 */
function enlargeGame() {
    startGame();
    const canvas = document.getElementById('canvas');

    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { // Firefox
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // IE/Edge
        canvas.msRequestFullscreen();
    }
}

/**
 * Displays the game over screen and hides the canvas.
 */
function showGameOverScreen() {
    gameOverScreen.style.display = 'block';
    canvas.style.display = 'none';
}

/**
 * Hides the game over screen.
 */
function hideGameOverScreen() {
    gameOverScreen.style.display = 'none';
}

/**
 * Displays the "You Win" screen, hides the canvas, and hides the game over screen.
 */
function showYouWinScreen() {
    youWinScreen.style.display = 'block';
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'none';
}

/**
 * Hides the "You Win" screen.
 */
function hideYouWinScreen() {
    youWinScreen.style.display = 'none';
}

/**
 * Handles the game over scenario by showing the game over screen, pausing the background music,
 * and playing the game over sound.
 */
function gameOver() {
    showGameOverScreen();
    sounds.MUSIC.pause();
    sounds.GAMEOVER.play();
}

/**
 * Handles the "You Win" scenario by showing the "You Win" screen, muting certain sounds related to the boss,
 * and playing the victory sound.
 */
function youWin() {
    showYouWinScreen();
    sounds.BOSS_ENCOUNTER.volume = 0;
    sounds.BOSS_WALK.volume = 0;
    sounds.VICTORY.play();
}

/**
 * Restarts the game by reloading the window.
 */
function restartGame() {
    window.location.reload();
}

/**
 * Event listener for handling keydown events.
 * Sets corresponding properties in the keyboard object based on the pressed key.
 * @param {KeyboardEvent} event - The keydown event.
 */
window.addEventListener('keydown', (event) => {
    let keyCode = event.keyCode;

    if (keyCode === 37) {
        keyboard.LEFT = true;
    } else if (keyCode === 39) {
        keyboard.RIGHT = true;
    } else if (keyCode === 38) {
        keyboard.UP = true;
    } else if (keyCode === 40) {
        keyboard.DOWN = true;
    } else if (keyCode === 32) {
        keyboard.SPACE = true;
    }
});

/**
 * Event listener for handling keyup events.
 * Sets corresponding properties in the keyboard object based on the released key.
 * @param {KeyboardEvent} event - The keyup event.
 */
window.addEventListener('keyup', (event) => {
    let keyCode = event.keyCode;

    if (keyCode === 37) {
        keyboard.LEFT = false;
    } else if (keyCode === 39) {
        keyboard.RIGHT = false;
    } else if (keyCode === 38) {
        keyboard.UP = false;
    } else if (keyCode === 40) {
        keyboard.DOWN = false;
    } else if (keyCode === 32) {
        keyboard.SPACE = false;
    }
});

/**
 * Event listener to prevent default action for space key on keydown.
 * @param {KeyboardEvent} e - The keydown event.
 */
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault();
    }
});

/**
 * Event listeners for mobile controls to handle touch events.
 */
document.getElementById('mobile-left').addEventListener('touchstart', () => {
    keyboard.LEFT = true;
});
document.getElementById('mobile-left').addEventListener('touchend', () => {
    keyboard.LEFT = false;
});
document.getElementById('mobile-right').addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
});
document.getElementById('mobile-right').addEventListener('touchend', () => {
    keyboard.RIGHT = false;
});
document.getElementById('mobile-jump').addEventListener('touchstart', () => {
    keyboard.SPACE = true;
});
document.getElementById('mobile-jump').addEventListener('touchend', () => {
    keyboard.SPACE = false;
});
document.getElementById('mobile-throw').addEventListener('touchstart', () => {
    keyboard.UP = true;
});
document.getElementById('mobile-throw').addEventListener('touchend', () => {
    keyboard.UP = false;
});