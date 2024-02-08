class World {
    character = new Character();
    boss = new Endboss(); // Hier instanziere ich den Boss direkt in der World-Klasse
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
        this.addBossToEnemies(); // Fügen Sie den Boss zu den Feinden hinzu, bevor das Spiel läuft
        this.run();
        this.bossStatusbar.setXCoordinate(this.boss.x); // Setze die x-Koordinate der BossStatusbar auf die x-Koordinate des Endbosses
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

            // Nach dem Wurf Tastendruck-Spam verhindern
            this.character.canThrow = false;

            // Nach einer Sekunde den Wurfschalter wieder aktivieren
            setTimeout(() => {
                this.character.canThrow = true;
            }, 500);
        }
    }

    checkCollisions() {
        // Überprüfe Kollisionen von Character mit normalen Gegnern
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.speedY < 0 && this.character.isAboveGround()) {
                    this.character.jump();
                    enemy.enemyDies(); // Normale Gegner sterben sofort
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 500);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });

        // Überprüfe Kollisionen von Character mit dem Endboss
        if (this.character.isColliding(this.boss)) {
            if (this.character.speedY < 0 && this.character.isAboveGround()) {
                this.character.jump();
                // Behandele den Fall, wenn der Character auf den Boss springt
                this.boss.hit(); // Hier könnte eine Methode hinzugefügt werden, um den Boss zu treffen
                this.bossStatusbar.setPercentage(this.boss.energy);
            } else {
                // Behandele den Fall, wenn der Character den Boss trifft
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                this.boss.bossAttack(); // Lasse den Boss angreifen, wenn er getroffen wird
            }
        }

        // Kollisionen von Flasche mit Hühnchen und dem Boss
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            let hitEnemy = false; // Flag, um zu überprüfen, ob die Flasche bereits mit einem Feind kollidiert ist
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (!hitEnemy) { // Überprüfe nur Kollision, wenn die Flasche noch nicht mit einem Feind kollidiert ist
                    if (enemy instanceof Chicken && !enemy.isHit && bottle.isColliding(enemy) && !bottle.hasHitChicken) {
                        enemy.enemyDies();
                        bottle.hasHitChicken = true; // Markiere, dass die Flasche ein Huhn getroffen hat
                        clearInterval(bottle.throwInterval);
                        bottle.speedX = 0; // Stoppe die horizontale Bewegung der Flasche nach der Kollision
                        bottle.speedY = 0; // Stoppe die vertikale Bewegung der Flasche nach der Kollision
                        bottle.x -= bottle.speedX; // Korrigiere die x-Koordinate basierend auf der letzten Geschwindigkeit
                        bottle.y -= bottle.speedY; // Korrigiere die y-Koordinate basierend auf der letzten Geschwindigkeit
                        setTimeout(() => {
                            bottle.splash();
                            setTimeout(() => {
                                this.throwableObjects.splice(bottleIndex, 1);
                            }, 1000);
                        }, 100);
                        setTimeout(() => {
                            this.level.enemies.splice(enemyIndex, 1);
                        }, 500);
                        hitEnemy = true; // Setze die Flag, um zu verhindern, dass die Flasche andere Feinde trifft
                    }
                    if (enemy instanceof Endboss && !bottle.hasCollidedWithBoss && bottle.isColliding(enemy)) {
                        enemy.bottleHit();
                        this.bossStatusbar.setPercentage(this.boss.energy);
                        bottle.hasCollidedWithBoss = true;
                        clearInterval(bottle.throwInterval);
                        bottle.speedX = 0; // Stoppe die horizontale Bewegung der Flasche nach der Kollision
                        bottle.speedY = 0; // Stoppe die vertikale Bewegung der Flasche nach der Kollision
                        bottle.x -= bottle.speedX; // Korrigiere die x-Koordinate basierend auf der letzten Geschwindigkeit
                        bottle.y -= bottle.speedY; // Korrigiere die y-Koordinate basierend auf der letzten Geschwindigkeit
                        setTimeout(() => {
                            bottle.splash();
                            setTimeout(() => {
                                this.throwableObjects.splice(bottleIndex, 1);
                            }, 1000);
                        }, 100);
                        hitEnemy = true; // Setze die Flag, um zu verhindern, dass die Flasche andere Feinde trifft
                    }
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

        this.addToMap(this.character);
        this.addToMap(this.boss);

        this.addObjectsToMap(this.throwableObjects);

        // Aktualisiere die x-Koordinate der BossStatusbar entsprechend der x-Koordinate des Bosses
        this.bossStatusbar.setXCoordinate(this.boss.x);
        this.addToMap(this.bossStatusbar);
        //-----------------------------------------------------------------------

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
