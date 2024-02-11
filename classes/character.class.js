/**
 * Represents the character object in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    y = 80;
    width = 150;
    height = 250;
    speed = 10;
    world;
    canThrow = true;
    idleTimer = 0;
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
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
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

    /**
    * Constructs a new instance of the Character class.
    * Loads the initial image, and initializes various animation images.
    */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
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

    /**
    * Initiates animation for the character object.
    * Calls the moveCharacter method and sets up animation intervals.
    */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.animateCharacter(), 160);
    }
    
    /**
    * Handles character movement, including right, left, and jump actions.
    * Pauses the running sound, checks for movement and jump conditions,
    * checks for boss encounter, and updates the camera position.
    */
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

    /**
    * Checks if the character can move to the right.
    *
    * @returns {boolean} - True if the character can move right, false otherwise.
    */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
    }

    /**
    * Moves the character to the right, plays running sound, and updates direction.
    */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        sounds.RUNNING.play();
        this.direction = "right";
    }

    /**
    * Checks if the character can move to the left.
    *
    * @returns {boolean} - True if the character can move left, false otherwise.
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0
    }

    /**
    * Moves the character to the left, plays running sound, and updates direction.
    */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        sounds.RUNNING.play();
        this.direction = "left";
    }

    /**
    * Checks if the character can jump.
    *
    * @returns {boolean} - True if the character can jump, false otherwise.
    */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround()
    }

    /**
    * Initiates a jump for the character.
    * Calls the superclass's jump method and plays the jump sound.
    */
    jump() {
        super.jump();
        sounds.JUMP.play();
    }

    /**
    * Checks if the character encounters the boss during gameplay.
    * Pauses the background music, plays the boss encounter sound, and triggers the boss's walk.
    */
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

    /**
    * Animates the character based on various states such as movement, injuries, or death.
    * This function updates the timer and plays the corresponding animations depending on the character's state.
    */
    animateCharacter() {
        if (!this.isAboveGround() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (this.idleTimer > 30) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
        if (this.characterIsDead()) {
            this.idleTimer = 0;
            this.playAnimation(this.IMAGES_DYING);
        }
        if (!this.characterIsDead() && this.isHurt()) {
            this.idleTimer = 0;
            this.playAnimation(this.IMAGES_HURT);
        }
        if (this.isAboveGround()) {
            this.idleTimer = 0;
            this.playAnimation(this.IMAGES_JUMPING);
        }
        if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.idleTimer = 0;
            this.playAnimation(this.IMAGES_WALKING);
        }
        this.idleTimer++
    }
}