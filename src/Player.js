class Player {
    // Class variables
    constructor(x, y, w, h, r, s) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.s = s;
        this.speedY = 0;
        this.collideGrnd = false;
    }

    // Check player collisions
    collide() {
        this.collideGrnd = collideLineRect(0, floorHeight, width, floorHeight, this.x, this.y, this.w, this.h);
    }

    // Gravity function
    gravity() {
        this.speedY++; // Increase fall speed every frame
        this.y += this.speedY; //Change y by vertical speed

        // If touching ground
        if (this.collideGrnd == true) {
            this.speedY = 0; // Reset falling speed
            this.y = floorHeight - this.h; // 
        }
    }

    move() {
        if (keyIsDown(UP_ARROW) && this.collideGrnd == true) {
            this.speedY -= 20;
        } else if (keyIsDown(RIGHT_ARROW) && this.x + this.w < width) {
            this.x += this.s;
        } else if (keyIsDown(LEFT_ARROW) && this.x > 0) {
            this.x -= this.s;
        }
    }

    draw() {
        fill('pink');
        rect(this.x, this.y, this.w, this.h, this.r);
    }
}