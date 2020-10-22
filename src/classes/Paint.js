class Paint {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.r = 20;
        this.colour = colour;
    }

    draw() {
        ellipseMode(CENTER);
        fill(this.colour);
        ellipse(this.x, this.y, this.r);
    }
}