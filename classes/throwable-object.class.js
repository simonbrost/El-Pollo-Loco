class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw();
    }

    throw() {
        this.speedY = 25; // Vertikale Geschwindigkeit
        this.speedX = 4; // Horizontale Geschwindigkeit
        this.applyGravity();
    
        if (world.character.direction === "right") {
            this.throwInterval = setInterval(() => {
                this.x += this.speedX; // Veränderung der x-Koordinate basierend auf der horizontalen Geschwindigkeit
            }, 15);
        } else if (world.character.direction === "left") {
            this.throwInterval = setInterval(() => {
                this.x -= this.speedX; // Veränderung der x-Koordinate basierend auf der horizontalen Geschwindigkeit
            }, 15);
        }

        this.animate();
        world.amountOfBottles -= 1;
        world.bottleStatusbar.setPercentage(world.amountOfBottles);
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 100);
    }

    splash() {
        sounds.BOTTLE_THROW.play();
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 100);
    }
}