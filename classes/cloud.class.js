class Cloud extends MovableObject {
    y = 40;
    width = 400;
    height = 350;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 4000 + 500;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}