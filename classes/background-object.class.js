class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height; // 480 - 400 gesamthöhe des Canvas - Höhe des Bildes
        this.x = x;
    }
}