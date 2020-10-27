class Key {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.colour = colour;
    }

    // Draw key
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

    // position.y + player.size.y / 2 > this.y - this.w / 2 && position.y - player.size.y / 2 < this.y + this.w / 2 && position.x + player.size.x / 2 > this.x - this.w / 2 && position.x - player.size.x / 2 < this.x + this.w / 2

    // If touching player return true
    collision(position) {
        const keyBounds = this.getBounds();

        if (position.y + player.size.y / 2 > keyBounds.t && position.y - player.size.y / 2 < keyBounds.b && position.x + player.size.x / 2 > keyBounds.t && position.x - player.size.z / 2 < keyBounds.b && this.colour == player.colour) {
            return (true);
        }
    }

    getBounds() {
        return {
            t: this.x - this.w / 2,
            b: this.x + this.w / 2,
            l: this.y - this.w / 2,
            r: this.y + this.w / 2 + 30
        }
    }
}