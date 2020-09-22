class Player {
    // Class variables
    constructor(x, y, w, h, speed) {
        this.position = createVector(x, y);
        this.size = createVector(w, h);

        this.speed = speed;
        this.delta = createVector(0, 0);

        this.isGrounded = false;
    }

    draw() {
        push();
        
        // Draw
        rectMode(CENTER);
        fill('pink');

        rect(this.position.x, this.position.y, this.size.x, this.size.y, 5);

        // Gravity
        if (this.delta.y < 20) this.delta.y += 1;

        // Move
        const goal = this.position.copy().add(this.delta);

        let canMove = true;
        for (const platform of platforms) {
            const hit = collideRectRectVector(
                goal.copy().sub(this.size.copy().div(2)), this.size,
                platform.position.copy().sub(platform.size.copy().div(2)), platform.size
            );

            if (hit) {
                this.position.add(createVector(0, (platform.position.y - this.position.y) - (platform.size.y / 2 + this.size.y / 2)));

                this.isGrounded = true;
                canMove = false;
            }
        }

        if (canMove) this.position.y += this.delta.y;
        else this.delta.y = 0;

        this.position.x += this.delta.x;

        // Input
        if (keyIsDown(UP_ARROW) && this.isGrounded) {
            this.delta.y = -20;
            this.isGrounded = false;
        }

        this.delta.x = keyIsDown(LEFT_ARROW) ? -this.speed : keyIsDown(RIGHT_ARROW) ? this.speed : 0;

        pop();
    }
}