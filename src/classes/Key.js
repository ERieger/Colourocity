class Key {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.colour = colour;
    }

    draw() {
        push();
        ellipseMode(CENTER);
        rectMode(CENTER);
        noFill();
        strokeWeight(5);
        stroke(color(this.colour));
        ellipse(this.x, this.y, this.w);

        noStroke();
        fill(this.colour);
        rect(this.x + 20, this.y, 20, 5);
        rect(this.x + 27, this.y + 5, 5, 5)
        rect(this.x + 19, this.y + 5, 5, 5)
        pop();
    }
}