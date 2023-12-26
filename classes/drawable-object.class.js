class DrawableObject {
    x = 120;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image(); //this.img = document.getElement.Id('image') <img id="image" src=...>
        this.img.src = path
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // drawFrame(ctx) {

    //     if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}