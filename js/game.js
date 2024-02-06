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
let mute = false;  // Initialisiere die Variable mute

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
    initLevel();
    if (!sounds.allSounds.includes(music)) {
        sounds.allSounds.push(music);
    }
    if (!mute) {
        sounds.MUSIC.play();
    }
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startScreen.style.display = 'none';
    muteButtonIngame.style.display = 'block';
}

function muteGame() {
    sounds.toggleMuteState();
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
