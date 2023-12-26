class Coin extends CollectableObject {
    width = 150;
    height = 150;
    y = 70;
    coin_sound = new Audio('audio/coin.mp3');
    amountOfCoins = 0;

    constructor(world) {
        super(world).loadImage('img/8_coin/coin_1.png')
        this.x = 400 + Math.random() * 200;
    }

    coinIsCollected() {
        console.log('Coin wurde collected');
        this.coin_sound.play();
        this.amountOfCoins + 1;
        if (this.amountOfCoins < 0) {
            this.amountOfCoins = 0;
        }
        // Hier die Statusbar aktualisieren
        world.coinStatusbar.setPercentage(this.amountOfCoins);


    }

}