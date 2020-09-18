class Player {
    constructor(x, y, w, h, r) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
    }

    gravity() {

    }

    draw() {
        rect(this.x, this.y, this.w, this.h, this.r);
    }
}
