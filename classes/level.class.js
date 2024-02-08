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
        this.enemies = enemies; //this.enemies bezieht sich auf die variable in zeile 2 und enemies nach dem gleichzeichen bezieht sich auf  die variable in der Klammer
    }
}