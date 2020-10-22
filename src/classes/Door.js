class Door {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.locked = true;
        this.lockedCol = color('#828282');
    }

    draw() {
        push();
        rectMode(CENTER);
        fill(this.lockedCol);
        rect(this.x, this.y, this.w, this.h);
        ellipseMode(CENTER);
        strokeWeight(1);
        stroke(0);
        fill(255)
        ellipse(this.x + this.w / 4 , this.y + 5, 8);
        pop();
    }
}