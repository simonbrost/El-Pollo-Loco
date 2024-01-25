class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    bottleStatusbar = new BottleStatusbar();
    coinStatusbar = new CoinStatusbar();
    throwableObjects = [];
    amountOfCoins = 0;
    amountOfBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.UP && this.amountOfBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.speedY < 0 && this.character.isAboveGround()) {
                    this.character.jump();
                    enemy.enemyDies();
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 500);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });

        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.bottleHit();
                    this.throwableObjects.splice(bottleIndex, 1);
                }
            });
        });



        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.coinIsCollected();
                // this.coinStatusbar.setPercentage(this.level.coins.length);
                this.removeObjectFromWorld(coin);
            }
        });
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.bottleIsCollected();
                // this.bottleStatusbar.setPercentage(this.level.bottles.length);
                this.removeObjectFromWorld(bottle);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //leert das canvas immer am Anfang, 
        //sonst würde jeder neue Frame einfach dazukommen

        this.ctx.translate(this.camera_x, 0); //der context verschiebt (translate) sich um unsere variable (camera_x) also -100
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); //damit statusbar mitwandert context nochmal zurückverschieben...
        //--------------------space for fixed content----------------------------
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleStatusbar);
        this.addToMap(this.coinStatusbar);
        //-----------------------------------------------------------------------
        this.ctx.translate(this.camera_x, 0);   // ...und wieder vor

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0); // und dann verschieben wir es wieder zurück

        let self = this;
        requestAnimationFrame(function () {
            self.draw(); //this wird in dieser funktion nicht erkannt
            // deswegen weisen wir es der variable self zu (10-requestAnimationFrame()03:30)
        }); //diese methode wiederholt die draw funktion so oft wie die grafikkarte es erlaubt
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    // In der World-Klasse
    removeObjectFromWorld(objectToRemove) {

        if (objectToRemove instanceof Coin) {
            this.level.coins = this.level.coins.filter(coin => coin !== objectToRemove);
        } else if (objectToRemove instanceof ThrowableObject) {
            this.throwableObjects = this.throwableObjects.filter(obj => obj !== objectToRemove);
        } else if (objectToRemove instanceof Bottle) {
            this.level.bottles = this.level.bottles.filter(bottle => bottle !== objectToRemove);
        }

        this.draw();
    }

    // addToMap(mo) {
    //     if (mo.otherDirection) {
    //         this.flipImg(mo);
    //     }

    //     mo.draw(this.ctx);

    //     if (mo.otherDirection) {
    //         this.flipImgBack(mo);
    //     }
    // }

    // flipImg(mo) {
    //     this.ctx.save();
    //     this.ctx.translate(mo.width, 0); 
    //     this.ctx.scale(-1, 1); 
    //     mo.x = mo.x * -1;
    // }

    // flipImgBack(mo) {
    //     mo.x = mo.x *-1;
    //     this.ctx.restore();
    // }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawOffset(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}
