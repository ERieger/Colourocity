class Player {
	// Player class variables
	constructor(x, y, w, h, colour, speed) {
		this.sprite = createSprite(x, y);

		this.sprite.setCollider('rectangle', 0, 0, w, h);
		this.sprite.draw = this.draw.bind(this);

		this.size = createVector(w, h);
		this.colour = colour;

		this.canJump = false;
		this.speed = speed;
	}

	// Draw player to the screen
	draw() {
		rectMode(CENTER);
		fill(this.colour);
		rect(0, 0, this.size.x, this.size.y, 5);
	}

	// Update inputs, gravity and collision
	update() {
		this.handleInput();
		this.gravity();
		this.collide();
	}

	// Move the player down at an increasing rate
	gravity() {
		if (this.sprite.velocity.y < 20) this.sprite.velocity.y += 1;
	}

	// Function that handels collision
	collide() {
		// Copy the player's position into a temp variable
		const target = this.sprite.position.copy();

		// Prevent jumping while not colliding ground
		this.canJump = false;

		// Loop through all platforms
		for (const platform of platforms) {
			if (this.sprite.collide(platform.sprite)) {
				const p = this.getBounds(platform.sprite.position, platform.size); // Current platform bounds
				const c = this.getBounds(target, this.size); // Player bounds

				if (c.l < p.l && p.l < c.r) continue; // L
				if (c.l < p.r && p.r < c.r) continue; // R

				// Top
				if (c.t < p.t && p.t < c.b) {
					this.canJump = true;
					this.sprite.velocity.y = 0;
				}

				if (c.t < p.b && p.b < c.b) this.sprite.velocity.y = 0; // Bottom
			}
		}
	}

	handleInput() {
		// Up arrow + W
		if ((keyIsDown(38) || keyIsDown(87)) && this.canJump) {
			this.sprite.velocity.y = -20;
		}

		// Reset velocity
		this.sprite.velocity.x = 0;
		
		// Left arrow + A
		if (keyIsDown(37) || keyIsDown(65)) {
			this.sprite.velocity.x = -this.speed; 
		}

		// Right arrow + D
		if (keyIsDown(39) || keyIsDown(68)) {
			this.sprite.velocity.x = this.speed; 
		}
	}

	getBounds(position, size) {
		return {
			t: position.y - size.y / 2,
			b: position.y + size.y / 2,
			l: position.x - size.x / 2,
			r: position.x + size.x / 2
		}
	}

	teleport(x, y) {
		this.sprite.velocity.x = 0;
		this.sprite.position.x = x;
		this.sprite.position.y = y;
	}
}
