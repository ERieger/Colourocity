class Door {
    constructor(x, y, w, h) {
		this.sprite = createSprite(x, y);

		this.sprite.setCollider('rectangle', 0, 0, w, h);
		this.sprite.draw = this.draw.bind(this);

        this.size = createVector(w, h);
        this.locked = true;
        this.colour = 'grey';
    }

    // Draw door
    draw() {
        push();
        rectMode(CENTER);
        fill(this.colour);
        rect(this.sprite.position.x, this.sprite.position.y, this.size.x, this.size.y); // Draw door
        ellipseMode(CENTER);
        strokeWeight(1);
        stroke(0);
        fill(255)
        ellipse(this.sprite.position.x + this.size.x / 4 , this.sprite.position.y + 5, 8); // Door handle
        pop();
    }

    unlock() {
        if (this.sprite.overlap(player.sprite)) {
            player.colour = 'white';
            collectedKeys = 0;
            currentLevel++;
            displayLevel(currentLevel);
        }
    }
}