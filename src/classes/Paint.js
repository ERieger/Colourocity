class Paint {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.w = 25;
        this.colour = colour;
    }

    draw() {
        push();
        ellipseMode(CENTER);
        fill(this.colour);
        ellipse(this.x, this.y, this.w);
        pop();
    }
}