class Coin extends DrawableObject {
    width = 150;
    height = 150;
    y = 70;
    
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
    }

    constructor(world) {
        super(world).loadImage('img/8_coin/coin_1.png')
        this.x = 400 + Math.random() * 400;
    }

    coinIsCollected() {
        sounds.COIN.play();
        world.amountOfCoins += 1;
        if (world.amountOfCoins < 0) {
            world.amountOfCoins = 0;
        }
        // Hier die Statusbar aktualisieren
        world.coinStatusbar.setPercentage(world.amountOfCoins);


    }

}