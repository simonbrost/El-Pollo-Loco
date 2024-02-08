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

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.y = 20;
        this.width = 100;
        this.height = 30;
        this.setPercentage(100);
    }

    setXCoordinate(x) {
        this.x = x;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];   // hier bekommen wir eine Zahl von 0-5 aus der Funktion resolveImageIndex()
        this.img = this.imageCache[path];                   // hier wird dann das entsprechnde Bild der Vraiable img in drawableobject zugewiesen und angezeigt
    }

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