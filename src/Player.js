class Player {
    constructor(x, y, w, h, r, s) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.s = s;
        this.speedY = 0;
        this.jump = false;
    }

    move() {
        if (keyIsDown(UP_ARROW) && this.jump == false) {
            this.speedY -= 20;
            this.jump = true;
        } else if (keyIsDown(RIGHT_ARROW) && this.x + this.w < width) {
            this.x += this.s;
        } else if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= this.s;
        }
    }

    gravity() {
        this.speedY++;
        this.y += this.speedY;

        if (this.y + this.h > floorHeight) {
            this.speedY = 0;
            this.y = floorHeight - this.h;
            this.jump = false;
        }
    }

    draw() {
        fill('pink');
        rect(this.x, this.y, this.w, this.h, this.r);
    }
}