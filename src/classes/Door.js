class Door {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.locked = true;
        this.colour = 'grey';
    }

    // Draw door
    draw() {
        push();
        rectMode(CENTER);
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h); // Draw door
        ellipseMode(CENTER);
        strokeWeight(1);
        stroke(0);
        fill(255)
        ellipse(this.x + this.w / 4 , this.y + 5, 8); // Door handle
        pop();
    }

    unlock(position) {
        if (this.x + this.w / 2 > position.x && this.x - this.w / 2 < position.x && this.y + this.h / 2 > position.y && this.y - this.h / 2 < position.y) {
            player.colour = 'white';
            collectedKeys = 0;
            currentLevel++;
            displayLevel(currentLevel);
        }
    }
}