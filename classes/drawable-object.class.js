/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
    x = 120;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }

    /**
     * Loads an image for the drawable object.
     *
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

     /**
     * Draws the drawable object on the canvas context.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

     /**
     * Draws a frame around the drawable object for interactions.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            //  ctx.beginPath();
            //  ctx.lineWidth = '5';
            //  ctx.strokeStyle = 'blue';
            //  ctx.rect(this.x, this.y, this.width, this.height);
            //  ctx.stroke();
         }
    }

     /**
     * Draws an offset frame around the drawable object for collisions.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawOffset(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            // ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'red';
            // ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            // ctx.stroke();
        }
   }

     /**
     * Loads images into the image cache.
     *
     * @param {string[]} array - An array of image paths.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}