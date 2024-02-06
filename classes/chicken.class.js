class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 350;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    offset = {
        top: 10,
        bottom: 20,
        left: 10,
        right: 20,
    }

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 400 + Math.random() * 300;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.25;
        this.isHit = false;
        this.moveLeftInterval = null;
        this.playAnimationInterval = null;

        this.animate();
    }

    animate() {
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

    enemyDies() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        clearInterval(this.moveLeftInterval);
        clearInterval(this.playAnimationInterval);
        this.isHit = true;
        sounds.CHICKEN.play();
    }
}