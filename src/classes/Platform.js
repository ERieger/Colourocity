class Platform {
	constructor(x, y, w, h, colour) {
		this.sprite = createSprite(x, y);

		this.sprite.setCollider('rectangle', 0, 0, w, h);
		this.sprite.draw = this.draw.bind(this);

		this.size = createVector(w, h);
		this.colour = colour;
	}

	// Draw platform
	draw() {
		rectMode(CENTER);
		fill(this.colour);
		rect(0, 0, this.size.x, this.size.y);
	}
}
