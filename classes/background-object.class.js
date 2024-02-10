class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    /**
     * This function initializes the Object with it's specific properties
     * @param {string} imagePath 
     * @param {number} x 
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}