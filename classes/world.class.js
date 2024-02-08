class World {
    character = new Character();
    boss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    bottleStatusbar = new BottleStatusbar();
    coinStatusbar = new CoinStatusbar();
    bossStatusbar = new BossStatusbar();
    throwableObjects = [];
    amountOfCoins = 0;
    amountOfBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.addBossToEnemies();
        this.run();
        this.bossStatusbar.setXCoordinate(this.boss.x);
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.boss.world = this;
    }

    addBossToEnemies() {
        if (!(this.level.enemies.includes(this.boss))) {
            this.level.enemies.push(this.boss);
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.UP && this.amountOfBottles > 0 && this.character.canThrow) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.canThrow = false;
            setTimeout(() => {
                this.character.canThrow = true;
            }, 500);
        }
    }

    checkCollisions() {
        this.characterChickenCollision();
        this.characterBossCollision();
        this.bottleChickenCollision();
        this.bottleBossCollision();
        this.characterCoinCollision();
        this.characterBottleCollision();
    }
    characterChickenCollision() {
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
    }

    characterBossCollision() {
        if (this.character.isColliding(this.boss)) {
            if (this.character.speedY < 0 && this.character.isAboveGround()) {
                this.character.jump();
                this.boss.hit(); 
                this.bossStatusbar.setPercentage(this.boss.energy);
            } else {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                this.boss.bossAttack();
            }
        }
    }

    bottleChickenCollision() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            let hitChicken = false;
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (!hitChicken && enemy instanceof Chicken && !enemy.isHit && bottle.isColliding(enemy) && !bottle.hasHitChicken) {
                    enemy.enemyDies();
                    this.resolveBottle(bottle, bottleIndex);
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 500);
                    bottle.hasHitChicken = true;
                    hitChicken = true;
                }
            });
        });
    }

    bottleBossCollision() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (!bottle.hasCollidedWithBoss) {
                if (this.boss instanceof Endboss && !bottle.hasCollidedWithBoss && bottle.isColliding(this.boss)) {
                    this.boss.bottleHit();
                    this.bossStatusbar.setPercentage(this.boss.energy);
                    bottle.hasCollidedWithBoss = true;
                    this.resolveBottle(bottle, bottleIndex);
                }
            }
        });
    }

    resolveBottle(bottle, bottleIndex) {
        clearInterval(bottle.throwInterval);
        bottle.speedX = 0;
        bottle.speedY = 0;
        bottle.x -= bottle.speedX;
        bottle.y -= bottle.speedY;
        setTimeout(() => {
            bottle.splash();
            setTimeout(() => {
                this.throwableObjects.splice(bottleIndex, 1);
            }, 1000);
        }, 100);
    }

    characterCoinCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                coin.coinIsCollected();
                this.removeObjectFromWorld(coin);
            }
        });
    }

    characterBottleCollision() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                bottle.bottleIsCollected();
                this.removeObjectFromWorld(bottle);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        //--------------------space for fixed content----------------------------
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleStatusbar);
        this.addToMap(this.coinStatusbar);
        //-----------------------------------------------------------------------

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addToMap(this.boss);
        this.addObjectsToMap(this.throwableObjects);
        this.bossStatusbar.setXCoordinate(this.boss.x);
        this.addToMap(this.bossStatusbar);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw(); 
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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