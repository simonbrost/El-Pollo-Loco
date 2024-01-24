class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;

    offset = {
        top: 80,
        bottom: 20,
        left: 70,
        right: 50,
    }

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

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.x = 2000;
        this.animate();
    }

    animate() {

        //alert animation
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);

        // movement
        // if (!this.isHit) {
        //     const moveLeftSpeed = 1000 / 60;
        //     const playAnimationSpeed = 200;

        //     this.moveLeftInterval = setInterval(() => {
        //         this.moveLeft();
        //     }, moveLeftSpeed);

        //     this.playAnimationInterval = setInterval(() => {
        //         this.playAnimation(this.IMAGES_WALKING);
        //     }, playAnimationSpeed);
        // }

        //hurt und dead animation
        setInterval(() => {
            if (this.bossIsDead()) {
                this.playAnimation(this.IMAGES_DYING);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 50);
    }

    //movement
    bossWalk() {
        if (!this.isHit) {
            const moveLeftSpeed = 1000 / 60;
            const playAnimationSpeed = 200;

            this.moveLeftInterval = setInterval(() => {
                this.moveLeft();
            }, moveLeftSpeed);

            this.playAnimationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, playAnimationSpeed);
        }
    }
}