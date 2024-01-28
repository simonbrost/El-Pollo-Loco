class ThrowableObject extends MovableObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImages(this.IMAGES_THROW);
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        if (world.character.direction === "right"){
        setInterval(() => {
            this.x += 10;
        }, 15);
        } else if (world.character.direction === "left"){
            setInterval(() => {
                this.x -= 10;
            }, 15);
        }
        this.animate();
        world.amountOfBottles -= 1;
        world.bottleStatusbar.setPercentage(world.amountOfBottles);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 100);
    }

}