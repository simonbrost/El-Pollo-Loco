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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            //  ctx.beginPath();
            //  ctx.lineWidth = '5';
            //  ctx.strokeStyle = 'blue';
            //  ctx.rect(this.x, this.y, this.width, this.height);
            //  ctx.stroke();
         }
    }

    drawOffset(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            // ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'red';
            // ctx.rect(this.x + this.offset.right, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            // ctx.stroke();
        }
   }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}