/**
 * Represents a throwable object in the game, extending the functionality of a movable object.
 * @extends MovableObject
 */
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

    /**
     * Constructs a new instance of the ThrowableObject class.
     * Loads the throwable object image, sets initial position, size, and loads animation images.
     * Throws the object and starts the animation.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
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

    /**
     * Throws the throwable object by setting initial speed and applying gravity.
     * Starts the throw animation, updates the count and its statusbar.
     */
    throw() {
        this.speedY = 25;
        this.speedX = 4;
        this.applyGravity();

        if (world.character.direction === "right") this.throwInterval = setInterval(() => this.x += this.speedX, 15);
        else if (world.character.direction === "left") this.throwInterval = setInterval(() => this.x -= this.speedX, 15);

        this.animate();
        world.amountOfBottles -= 1;
        world.bottleStatusbar.setPercentage(world.amountOfBottles);
    }

    /**
     * Animates the throwable object during the throw.
     */
    animate() {
        setInterval(() => this.playAnimation(this.IMAGES_THROW), 100);
    }

    /**
     * Plays the splash animation and associated sound when the object hits the ground.
     */
    splash() {
        sounds.BOTTLE_THROW.play();
        setInterval(() => this.playAnimation(this.IMAGES_SPLASH), 100);
    }
}