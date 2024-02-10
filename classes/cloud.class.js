/**
 * Represents a cloud object in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 40;
    width = 400;
    height = 350;

    /**
     * Constructs a new instance of the Cloud class.
     * Loads an image for the cloud, sets the initial position, and initiates animation.
     *
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 4000 + 500;
        this.animate();
    }
    
    /**
     * Animates the cloud object, making it move left continuously.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}