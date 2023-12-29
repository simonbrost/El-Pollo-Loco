class BottleStatusbar extends DrawableObject{
    
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage * 20;
        let path = this.IMAGES[this.resolveImageIndex()];   // hier bekommen wir eine Zahl von 0-5 aus der Funktion resolveImageIndex()
        this.img = this.imageCache[path];                   // hier wird dann das entsprechnde Bild der Vraiable img in drawableobject zugewiesen und angezeigt
    }

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