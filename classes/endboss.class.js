/**
 * Represents an end boss object in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;
    speed = 10;

    offset = {
        top: 80,
        bottom: 20,
        left: 70,
        right: 50,
    }

    walkStart = false;
    attackStart = false;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DYING = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
    * Constructs a new instance of the Endboss class.
    * Loads initial image, sets initial position, and loads animation images for alert, walking, hurt, dying, and attacking.
    */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 4000;
        this.animate();
    }

    /**
    * Initiates and plays various animations for the end boss, including alert, walking, attacking, dying, and hurt states.
    * Uses specified intervals for each animation.
    */
    animate() {
        const alertInterval = 200;
        const walkingInterval = 100;
        const attackingInterval = 100;
        const dyingInterval = 150;
        const hurtInterval = 100;

        this.playAlert(alertInterval);
        this.playWalk(walkingInterval);
        this.playAttack(attackingInterval);
        this.playDying(dyingInterval);
        this.playHurt(hurtInterval);
    }

    /**
    * Initiates and plays the alert animation for the end boss with a specified interval.
    *
    * @param {number} interval - The interval for the alert animation in milliseconds.
    */
    playAlert(interval) {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, interval);
    }

    /**
    * Initiates and plays the walking animation for the end boss with a specified interval.
    *
    * @param {number} interval - The interval for the walking animation in milliseconds.
    */
    playWalk(interval) {
        setInterval(() => {
            if (this.walkStart) {
                this.chaseCharacter();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, interval);
    }

    /**
    * Initiates and plays the attacking animation for the end boss with a specified interval.
    *
    * @param {number} interval - The interval for the attacking animation in milliseconds.
    */
    playAttack(interval) {
        setInterval(() => {
            if (this.attackStart) {
                this.playAnimation(this.IMAGES_ATTACKING);
            }
        }, interval);
    }

    /**
    * Initiates and plays the dying animation for the end boss with a specified interval.
    *
    * @param {number} interval - The interval for the dying animation in milliseconds.
    */
    playDying(interval) {
        setInterval(() => {
            if (this.bossIsDead()) {
                this.playAnimation(this.IMAGES_DYING);
            }
        }, interval);
    }

    /**
    * Initiates and plays the hurt animation for the end boss with a specified interval.
    *
    * @param {number} interval - The interval for the hurt animation in milliseconds.
    */
    playHurt(interval) {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, interval);
    }

    /**
    * Initiates the walking state for the end boss, allowing it to chase the character.
    * Sets the walkStart flag to true if the boss is not hit.
    */
    bossWalk() {
        if (!this.isHit) {
            this.walkStart = true;
        }
    }

    /**
    * Causes the end boss to chase the character.
    * The boss moves left or right based on the character's position and plays the boss walk sound.
    */
    chaseCharacter() {
        const character = world.character;
        if (character.x < this.x) {
            this.moveLeft();
            this.otherDirection = false;
            sounds.BOSS_WALK.play();
        } else if (character.x > this.x) {
            this.moveRight();
            this.otherDirection = true;
            sounds.BOSS_WALK.play();
        }
    }

    /**
    * Initiates the boss attack state, stopping the walk and starting the attack animation.
    * After a delay, resets the walk and attack states.
    */
    bossAttack() {
        this.walkStart = false;
        this.attackStart = true;
        setTimeout(() => {
            this.walkStart = true;
            this.attackStart = false;
        }, 1000);
    }
}