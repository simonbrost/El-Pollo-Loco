class Character extends MovableObject {
    y = 80;
    width = 150;
    height = 250;
    speed = 10;
    world; // das geben wir diese klasse damit man hier auch auf die variablen aus der world classe zugreifen kann wenn ich das richtig verstanden habe
    canThrow = true;
    direction;
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
        setInterval(() => this.moveCharacter(), 1000 / 60);
        this.animateCharacter();
    }

    moveCharacter() {
        sounds.RUNNING.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.checkForBossEncounter();
        this.world.camera_x = -this.x + 100;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    }

    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        sounds.RUNNING.play();
        this.direction = "right";
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        sounds.RUNNING.play();
        this.direction = "left";
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround()
    }

    jump() {
        super.jump();
        sounds.JUMP.play();
    }

    checkForBossEncounter() {
        if (this.x >= 3500) {
            sounds.MUSIC.pause();
            sounds.BOSS_ENCOUNTER.play();
        };

        if (this.x >= 3550) {
            const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
            if (endboss) endboss.bossWalk();
        };
    }

    animateCharacter() {
        const idleInterval = 400;
        const dyingInterval = 80;
        const hurtInterval = 120;
        const jumpingInterval = 90;
        const walkingInterval = 50;

        this.playIdle(idleInterval);
        this.playDying(dyingInterval);
        this.playHurt(hurtInterval);
        this.playJumping(jumpingInterval);
        this.playWalking(walkingInterval);
    }

    playIdle(idleInterval) {
        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, idleInterval);
    }

    playDying(dyingInterval) {
        setInterval(() => {
            if (this.characterIsDead()) {
                this.playAnimation(this.IMAGES_DYING);
            }
        }, dyingInterval);
    }

    playHurt(hurtInterval) {
        setInterval(() => {
            if (!this.characterIsDead() && this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, hurtInterval);
    }

    playJumping(jumpingInterval) {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, jumpingInterval);
    }

    playWalking(walkingInterval) {
        setInterval(() => {
            if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, walkingInterval);
    }
}