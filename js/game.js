let canvas;
let world;
let startScreen;
let startButton;
let keyboard = new Keyboard();
music = new Audio('audio/music.mp3');
music.volume = 0.2;
music.loop = true;
let mute = false;

const audioElements = [
    new Audio('audio/music.mp3'),
    new Audio('audio/coin.mp3'),
    new Audio('audio/bootle_thow.mp3'),
    new Audio('audio/bottle_pop.mp3'),
    new Audio('audio/boss_encounter.mp3'),
    new Audio('audio/chicken.mp3'),
    new Audio('audio/jump.mp3'),
    new Audio('audio/running.mp3'),
];

function init() {
    startScreen = document.getElementById('start-screen');
    startButton = document.getElementById('start-button');
    gameOverScreen = document.getElementById('game-over-screen');
    muteButton = document.getElementById('mute-button');
    muteIcon = document.getElementById('mute-icon');
}

function startGame() {
    initLevel();
    if (!mute) {
        this.music.play();
    }
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startScreen.style.display = 'none';
    muteButton.style.display = 'block';
    
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

function toggleMute() {
    for (const audio of audioElements) {
        audio.muted = !audio.muted;
    }
}

function muteGame() {
    mute = !mute;
    toggleMute();
    if (mute) {
        music.pause();
        muteIcon.src = 'img/11_controls/sound.png';
    } else {
        music.play();
        muteIcon.src = 'img/11_controls/soundON.png';
    }
}

function showGameOverScreen() {
    gameOverScreen.style.display = 'block';
}

function hideGameOverScreen() {
    gameOverScreen.style.display = 'none';
}

function restartGame() {
    hideGameOverScreen();
    startGame();
    // Weitere Logik zum Neustarten des Spiels hier...
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
