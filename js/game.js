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

function showGameOverScreen() {
    gameOverScreen.style.display = 'block';
    canvas.style.display = 'none';
}

function hideGameOverScreen() {
    gameOverScreen.style.display = 'none';
}

function showYouWinScreen() {
    youWinScreen.style.display = 'block';
    canvas.style.display = 'none';
    gameOverScreen.style.display = 'none';
}

function hideYouWinScreen() {
    youWinScreen.style.display = 'none';
}

function gameOver() {
    showGameOverScreen();
    sounds.MUSIC.pause();
    sounds.GAMEOVER.play();
}

function youWin() {
    showYouWinScreen();
    sounds.BOSS_ENCOUNTER.volume = 0;
    sounds.BOSS_WALK.volume = 0;
    sounds.VICTORY.play();
}

function restartGame() {
    window.location.reload();
}

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

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault();
    }
});

// Touch-Event-Handler for mobile controls
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