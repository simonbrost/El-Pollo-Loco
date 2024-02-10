/**
 * Represents a level in the game, containing various game elements such as background objects, clouds, bottles, coins, and enemies.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 4400;

    /**
     * Constructs a new instance of the Level class.
     *
     * @param {Array} backgroundObjects - Array of background object instances.
     * @param {Array} clouds - Array of cloud objects.
     * @param {Array} bottles - Array of bottle objects.
     * @param {Array} coins - Array of coin objects.
     * @param {Array} enemies - Array of enemy objects.
     */
    constructor(backgroundObjects, clouds, bottles, coins, enemies) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
    }
}