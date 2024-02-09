const sounds = {
    JUMP: new Audio('audio/jump.mp3'),
    RUNNING: new Audio('audio/running.mp3'),
    CHICKEN: new Audio('audio/chicken.mp3'),
    COIN: new Audio('audio/coin.mp3'),
    BOSS_ENCOUNTER: new Audio('audio/boss_encounter.mp3'),
    BOSS_WALK: new Audio('audio/boss_walk.mp3'),
    BOTTLE_POP: new Audio('audio/bottle_pop.mp3'),
    BOTTLE_THROW: new Audio('audio/bottle_throw.mp3'),
    MUSIC: new Audio('audio/music.mp3'),
    VICTORY: new Audio('audio/victory.mp3'),
  
    allSounds: [],
  
    initialize() {
      Object.values(this).forEach(value => {
        if (value instanceof Audio) {
          this.allSounds.push(value);
        }
      });
      this.allSounds.forEach(sound => {
        sound.volume = 0.1;
      });
    },

    toggleMuteState() {
        const img = document.getElementById('mute-icon');
        const imgIngame = document.getElementById('mute-icon-ingame');
        
        img.src = img.src.includes('unmute') ? 'img/11_controls/mute.png' : 'img/11_controls/unmute.png';
        imgIngame.src = imgIngame.src.includes('unmute') ? 'img/11_controls/mute.png' : 'img/11_controls/unmute.png';

        this.allSounds.forEach(sound => {
            if (sound.volume === 0) {
                sound.volume = 0.1;
            } else {
                sound.volume = 0;
            }
        });
    }
    
};

sounds.initialize();