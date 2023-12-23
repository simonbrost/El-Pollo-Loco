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
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.UP) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy); //statusbar sinkt wenn hit
                // this.character.isHurt();
            }
        });
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.coinIsCollected();
                this.coinStatusbar.setPercentage(this.coin.amountOfCoins);   
            }
        });
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.bottleIsCollected(); 
                this.bottleStatusbar.setPercentage(this.bottleStatusbar.amountOfBottles);
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
