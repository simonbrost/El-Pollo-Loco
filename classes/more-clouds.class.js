/**
 * Represents additional cloud objects in the game that move to the left.
 * @extends MovableObject
 */
class MoreClouds extends MovableObject {
    y = 40;
    width = 400;
    height = 350;

    /**
     * Constructs a new instance of the MoreClouds class.
     * Loads the cloud image, sets a random x-coordinate, and initiates the animation.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png')
        this.x = Math.random() * 4000 + 50;
        this.animate();
    }

    /**
     * Initiates the animation for the cloud object, causing it to move to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}