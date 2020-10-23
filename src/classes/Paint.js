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
        strokeWeight(1);
        stroke(51);
        ellipse(this.x, this.y, this.w);
        pop();
    }

    collision(position) {
        if (position.x + player.size.x / 2 > this.x - this.w / 2 && position.x - player.size.x / 2 < this.x + this.w / 2) {
            return (true);
        }
    }
}