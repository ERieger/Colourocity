class Paint {
    constructor(x, y, colour) {
        this.sprite = createSprite(x, y);
        this.w = 25;
        this.sprite.setCollider('circle', 0, 0, this.w);
        this.sprite.draw = this.draw.bind(this);
        this.colour = colour;
    }

    // Format and draw paints
    draw() {
        push();
        ellipseMode(CENTER);
        fill(this.colour);
        strokeWeight(1);
        stroke(51);
        ellipse(this.sprite.position.x, this.sprite.position.y, this.w);
        pop();
    }

    // If touching player return true
    collision() {
        if (this.sprite.overlap(player.sprite)) {
            return (true);
        }
    }
}