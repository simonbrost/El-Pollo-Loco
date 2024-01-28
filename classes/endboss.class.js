class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;
    speed = 5;

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

    boss_walk_sound = new Audio('audio/boss_walk.mp3')

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.x = 2000;
        this.animate();
    }

    animate() {

        //alert animation
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);

        //walk animation
        setInterval(() => {
            if (this.walkStart) {
                this.chaseCharacter();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);

        //attack animation
        setInterval(() => {
            if (this.attackStart) {
                this.playAnimation(this.IMAGES_ATTACKING);
            }
        }, 100);

        //hurt and dead animation
        setInterval(() => {
            if (this.bossIsDead()) {
                this.playAnimation(this.IMAGES_DYING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 100);
    }

    //movement
    bossWalk() {
        if (!this.isHit) {
            this.walkStart = true;
        }
    }

    chaseCharacter() {
        const character = world.character;


        if (character.x < this.x) {
            this.moveLeft();
            this.otherDirection = false;
            this.boss_walk_sound.play();
        } else if (character.x > this.x) {
            this.moveRight();
            this.otherDirection = true;
            this.boss_walk_sound.play();
        }
    }

    bossAttack() {
        this.walkStart = false;
        this.attackStart = true;
        setTimeout(() => {
            this.walkStart = true;
            this.attackStart = false;
        }, 1000);
    }
}