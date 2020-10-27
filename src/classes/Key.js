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
        stroke(color(this.colour));
        ellipse(this.sprite.position.x, this.sprite.position.y, this.w);

        noStroke();
        fill(this.colour);
        rect(this.sprite.position.x + 20, this.sprite.position.y, 20, 5);
        rect(this.sprite.position.x + 27, this.sprite.position.y + 5, 5, 5)
        rect(this.sprite.position.x + 19, this.sprite.position.y + 5, 5, 5)
        pop();
    }

    // If touching player return true
    collision() {
        if (this.sprite.overlap(player.sprite) && this.colour == player.colour) {
            return(true);
        }
    }
}