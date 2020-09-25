class Player {
	constructor(x, y, w, h, colour, speed) {
		this.sprite = createSprite(x, y);

		this.sprite.setCollider('rectangle', 0, 0, w, h);
		this.sprite.draw = this.draw.bind(this);

		this.size = createVector(w, h);
		this.colour = colour;

		this.canJump = false;
		this.speed = speed;
	}

	draw() {
		rectMode(CENTER);
		fill(this.colour);
		rect(0, 0, this.size.x, this.size.y, 5);
	}

	update() {
		this.handleInput();
		this.gravity();
		this.collide();
	}

	gravity() {
		if (this.sprite.velocity.y < 20) this.sprite.velocity.y += 1;
	}

	collide() {
		const target = this.sprite.position.copy();

		this.canJump = false;
		for (const platform of platforms) {
			if (this.sprite.collide(platform.sprite)) {
				const t1 = target.y - this.size.y / 2;
				const b1 = target.y + this.size.y / 2;

				const t2 = platform.sprite.position.y - platform.size.y / 2;

				if (t1 < t2 && t2 < b1) this.canJump = true;
			}
		}
	}

	handleInput() {
		// U + W
		if ((keyIsDown(38) || keyIsDown(87)) && this.canJump) {
			this.sprite.velocity.y = -20;
		}

		this.sprite.velocity.x =
			keyIsDown(37) || keyIsDown(65) // L + A
				? -this.speed
				: keyIsDown(39) || keyIsDown(68) // R + D
				? this.speed
				: 0;
	}
}
