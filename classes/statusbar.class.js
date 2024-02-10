/**
 * Represents a general status bar in the game, extending the functionality of a drawable object.
 * @extends DrawableObject
 */
class Statusbar extends DrawableObject{

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 100;

    /**
     * Constructs a new instance of the Statusbar class.
     * Loads the status bar images, sets initial position and size, and initializes the percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the fill percentage and updates the displayed image accordingly.
     * @param {number} percentage - The fill percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the fill percentage.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage >80) {
            return 4;
        } else if(this.percentage >60) {
            return 3;
        } else if(this.percentage >40) {
            return 2;
        } else if(this.percentage >20) {
            return 1;
        } else {
            return 0;
        }
    }
}