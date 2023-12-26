class Bottle extends CollectableObject {
    width = 100;
    height = 100;
    y = 330;
    speedY;
    speedX;
    bottle_sound = new Audio('audio/bottle_pop.mp3')


    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.x = 500 + Math.random() * 300;
    }

    bottleIsCollected() {
        console.log('Bottle wurde collected');
        this.bottle_sound.play();
        this.amountOfBottles + 1;
        if (this.amountOfBottles < 0) {
            this.amountOfBottles = 0;
        }
        // Hier die Statusbar aktualisieren
        world.bottleStatusbar.setPercentage(this.amountOfBottles);

    }

}