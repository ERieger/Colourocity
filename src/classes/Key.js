class Key {
    constructor(x, y, colour) {
        this.sprite = createSprite(x, y);
        this.sprite.setCollider('circle', 0, 0, 20);
        this.sprite.draw = this.draw.bind(this);
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
        stroke(this.colour);
        ellipse(0, 0, this.w);

        noStroke();
        fill(this.colour);
        rect(20, 0, 20, 5);
        rect(27, 5, 5, 5);
        rect(19, 5, 5, 5);

        pop();
    }

    // If touching player return true
    collision() {
         return this.sprite.overlap(player.sprite) && this.colour == player.colour;
    }
}
