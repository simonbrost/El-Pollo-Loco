class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 4400;

    constructor(backgroundObjects, clouds, bottles, coins, enemies){
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
    }
}