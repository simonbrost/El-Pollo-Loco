/**
 * Represents a movable object in the game, extending the functionality of a drawable object.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    chickenIsDead = false;

    /**
     * Initiates gravity for the object, causing it to fall.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - True if above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwable objects should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Sets the chicken enemy as dead.
     */
    enemyDies() {
        this.chickenIsDead = true;
    }

    /**
     * Handles the object being hit, reducing energy.
     */
    hit() {
        if (!this.isHurt()) {
            this.energy -= 5;
            if (this.energy < 0) this.energy = 0;
            else this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles a bottle hitting the object, reducing energy.
     */
    bottleHit() {
        this.energy -= 20;
        if (this.energy < 0) this.energy = 0; 
        else this.lastHit = new Date().getTime();
    }

    /**
     * Checks if the object is hurt based on the last hit timestamp.
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //differenz in millisekunden
        timepassed = timepassed / 100; // differenz in sekunden
        return timepassed < 3;
    }

    /**
     * Checks if the character object is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    characterIsDead() {
        if (this.energy === 0) {
            setTimeout(() => gameOver(), 500);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if the boss object is dead.
     * @returns {boolean} - True if dead, false otherwise.
     */
    bossIsDead() {
        if (this.energy === 0) {
            this.world.boss.walkStart = false;
            setTimeout(() => youWin(), 1000);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Plays an animation using a sequence of images.
     * @param {Array} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}


