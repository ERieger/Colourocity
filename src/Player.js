class Player {
    constructor(x, y, w, h, r) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.speedY = 0;
    }

    gravity() {
        this.speedY++;
        this.y += this.speedY;

        if (this.y + this.h > floorHeight) {
            this.speedY = 0;
            this.y = floorHeight - this.h;
        }
    }

    draw() {
        fill('pink');
        rect(this.x, this.y, this.w, this.h, this.r);
    }
}
