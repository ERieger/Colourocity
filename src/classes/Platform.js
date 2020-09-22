class Platform {
    constructor(x, y, w, h) {
        this.position = createVector(x, y);
        this.size = createVector(w, h);
    }

    draw() {
        push();

        fill('black');
        noStroke();
        
        rectMode(CENTER);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);

        pop();
    }
}
