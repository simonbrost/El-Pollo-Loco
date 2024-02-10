/**
 * Represents a coin object in the game.
 * @extends DrawableObject
 */
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

    /**
     * Constructs a new instance of the Coin class.
     * Loads an image for the coin, sets initial position, and connects to the game world.
     * @param {object} world - The game world object.
     */    
    constructor(world) {
        super(world).loadImage('img/8_coin/coin_1.png')
        this.x = 800 + Math.random() * 2000;
    }
    
    /**
     * Handles the event when a coin is collected.
     * Plays a coin collection sound, increments the total amount of collected coins,
     * and updates the coin status bar percentage.
     */
    coinIsCollected() {
        sounds.COIN.play();
        world.amountOfCoins += 1;
        if (world.amountOfCoins < 0) world.amountOfCoins = 0;
        world.coinStatusbar.setPercentage(world.amountOfCoins);
    }
}