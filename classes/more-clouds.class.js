class MoreClouds extends MovableObject {
    y = 40;
    width = 400;
    height = 350;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png')
        this.x = Math.random() * 400 + 50;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); //60fps
    }
}