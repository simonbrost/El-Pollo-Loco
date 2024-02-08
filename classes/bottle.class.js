class Bottle extends DrawableObject {
    width = 100;
    height = 100;
    y = 330;
    speedY;
    speedX;

    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 40,
    }

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.x = 800 + Math.random() * 3000;
    }

    bottleIsCollected() {
        sounds.BOTTLE_POP.play();
        world.amountOfBottles += 1;
        if (world.amountOfBottles < 0) {
            world.amountOfBottles = 0;
        }
        // Hier die Statusbar aktualisieren
        world.bottleStatusbar.setPercentage(world.amountOfBottles);
    }

}