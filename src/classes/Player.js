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

	// Draw player
	draw() {
		push();
		rectMode(CENTER);
		fill(this.colour);
		stroke(0);
		rect(0, 0, this.size.x, this.size.y, 5);
		pop();
	}

	// Update inputs, gravity and collision
	update() {
		this.handleInput();
		this.gravity();
		this.collide();
	}

	// Move the player down, increase velocity
	gravity() {
		if (this.sprite.velocity.y < 20) this.sprite.velocity.y += 1;
	}

	// Collision function
	collide() {
		// Copy the player's position into a temp variable
		const target = this.sprite.position.copy();

		// Prevent jumping while not colliding ground
		this.canJump = false;

		// Loop through all platforms
		for (const platform of platforms) {
			// P5 Play check collision
			if (this.sprite.collide(platform.sprite)) {
				const p = this.getBounds(platform.sprite.position, platform.size); // Current platform bounds
				const c = this.getBounds(target, this.size); // Player bounds

				// Top
				if (c.t < p.t && p.t < c.b) {
					this.canJump = true; // Can jump
					this.sprite.velocity.y = 0; // Stop gravity
				}

				if (c.l < p.l && p.l < c.r) continue; // Left
				if (c.l < p.r && p.r < c.r) continue; // Right

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

	// Bounds of player
	getBounds(position, size) {
		return {
			t: position.y - size.y / 2,
			b: position.y + size.y / 2,
			l: position.x - size.x / 2,
			r: position.x + size.x / 2
		}
	}

	// Teleport player
	teleport(x, y) {
		this.sprite.velocity.x = 0;
		this.sprite.position.x = x;
		this.sprite.position.y = y;
	}

	// Colour mixing
	mix(colour) {
		// If player white set paint colour
		if (this.colour == 'white') {
			this.colour = colour;
		}

		// Loop through possible colour combinations
		for (let i = 0; i < combinations.length; i++) {
			// If white paint, set player white
			if (colour == 'white') {
				this.colour = 'white';
			}

			// Check if paint and player can combine colours
			if (colour == combinations[i].c1 && this.colour == combinations[i].c2 || colour == combinations[i].c2 && this.colour == combinations[i].c1) {
				this.colour = combinations[i].product; // Set player colour to product
				break;
			} else if (this.colour == combinations[i].product) {
				this.colour = 'black'; // Set black if can't mix
			}
		}
	}
}
