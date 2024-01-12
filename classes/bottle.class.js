class Bottle extends CollectableObject {
    width = 100;
    height = 100;
    y = 330;
    speedY;
    speedX;
    bottle_sound = new Audio('audio/bottle_pop.mp3')

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 40,
    }

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.x = 500 + Math.random() * 300;
    }

    bottleIsCollected() {
        this.bottle_sound.play();
        world.amountOfBottles += 1;
        if (world.amountOfBottles < 0) {
            world.amountOfBottles = 0;
        }
        // Hier die Statusbar aktualisieren
        world.bottleStatusbar.setPercentage(world.amountOfBottles);

    }

}