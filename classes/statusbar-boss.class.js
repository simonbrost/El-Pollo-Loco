/**
 * Represents the boss status bar in the game, extending the functionality of a drawable object.
 * @extends DrawableObject
 */
class BossStatusbar extends DrawableObject{

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    /**
     * Constructs a new instance of the BossStatusbar class.
     * Loads the health bar images, sets initial position and size, and initializes the percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 20;
        this.width = 100;
        this.height = 30;
        this.setPercentage(100);
    }

    /**
     * Sets the x-coordinate of the boss status bar.
     * @param {number} x - The x-coordinate value.
     */
    setXCoordinate(x) {
        this.x = x;
    }

    /**
     * Sets the health percentage and updates the displayed image accordingly.
     * @param {number} percentage - The health percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the health percentage.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage >=80) {
            return 4;
        } else if(this.percentage >=60) {
            return 3;
        } else if(this.percentage >=40) {
            return 2;
        } else if(this.percentage >=20) {
            return 1;
        } else {
            return 0;
        }
    }
}