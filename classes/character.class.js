class Character extends MovableObject {
    y = 80;
    width = 150;
    height = 250;
    speed = 10;
    world; // das geben wir diese klasse damit man hier auch auf die variablen aus der world classe zugreifen kann wenn ich das richtig verstanden habe
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DYING = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    boss_sound = new Audio('audio/boss_encounter.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png'); //ruft (dank der Methode "super") aus der übergeordneten Klasse die Funktion "loadImage()" auf
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.applyGravity();
        this.animate();
        this.offset.top = 110;
        this.offset.bottom = 10;
        this.offset.left = 50;
        this.offset.right = 40;
    }

    animate() {

    //movement
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }
        //--------------------diesen part wieder reinkommentieren für boss musik!!!!!!!!!!!!!!-------------------------->
            // Check for boss encounter

            // if (this.x >= 1520) {
            //     // Start playing the boss encounter music if not already playing
            //     if (this.boss_sound.paused) {
            //         muteGame(); //nur als platzhalter. mute funktion muss noch überarbeitet werden
            //             this.boss_sound.play(); 
            //     }
            // } else {
            //     // Pause the boss encounter music if the character is not in the boss encounter area
            //     this.boss_sound.pause();
            // }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

    //animationen
        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 400);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DYING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 50);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 120);

        setInterval(() => {
            if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);

    }
}