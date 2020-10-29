class Door {
    constructor(x, y, w, h) {
        this.sprite = createSprite(x, y);

        this.sprite.setCollider('rectangle', 0, 0, w, h);
        this.sprite.draw = this.draw.bind(this);

        this.size = createVector(w, h);
        this.locked = true;
        this.colour = 'grey';

        this.sprite.depth = -1;
    }

    // Draw door
    draw() {
        push();
        rectMode(CENTER);
        fill(this.colour);
        rect(0, 0, this.size.x, this.size.y); // Draw door
        ellipseMode(CENTER);
        strokeWeight(1);
        stroke(0);
        fill(255)
        ellipse(this.size.x / 4, 5, 8); // Door handle
        pop();
    }

    unlock() {
        if (this.sprite.overlap(player.sprite)) {
            player.colour = 'white';
            collectedKeys = 0;
            completedLevels.push(currentLevel);
            if (currentLevel == levels.length - 1) {
                returnMenu();
            } else {
                currentLevel++;
                displayLevel(currentLevel);
            }
        }
    }
}