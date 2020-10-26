///////////////////////////////////////
// Variables

let player;
let paints = [];
let platforms = [];
let keys = [];
let door;
let colours = ['white', 'black', 'red', 'yellow', 'blue', 'orange', 'green', 'purple'];
let currentLevel = 0;

///////////////////////////////////////
// Setup

function setup() {
	createCanvas(680, 560);

	displayLevel(currentLevel); // Show current level

	// Player
	player = new Player(width / 2, height - 65, 50, 50, colours[0], 7.5); // Create player

	player.teleport(width / 3, 506); // Move player onscreen
}

///////////////////////////////////////
// Object Creation Functions

// Create platform
function createPlatform(x, y, w, h, colour) {
	const platform = new Platform(x, y, w, h, colour); // Temp var
	platforms.push(platform); // Push to array
}

// Create paints
function createPaint(x, y, colour) {
	const paint = new Paint(x, y, colour); // Temp var
	paints.push(paint); // Push to array
}

function createKey(x, y, colour) {
	const key = new Key(x, y, colour); // Temp var
	keys.push(key); // Push to array
}

///////////////////////////////////////
// Display Functions

// Display level elements
function displayLevel(level) {
	// Clear platforms
	for (let i = 0; i < platforms.length; i++) {
		platforms[i].sprite.remove(); // P5 play remove sprite
	}

	paints = []; // Clear paints
	keys = []; // Clear keys

	platforms = [];

	// Floor
	createPlatform(width / 2, height - 15, width, 30, color(0));

	// Roof
	createPlatform(width / 2, 5, width, 10, color(255));

	// Walls
	createPlatform(15, height / 2, 30, height, color(0));
	createPlatform(width - 15, height / 2, 30, height, color(0));

	// Create platforms
	for (let i = 0; i < levels[level].stucture.length; i++) {
		createPlatform(levels[level].stucture[i].x, levels[level].stucture[i].y, levels[level].stucture[i].w, levels[level].stucture[i].h, levels[level].stucture[i].colour); // Call create function
	}

	// Create paints
	for (let i = 0; i < levels[level].paints.length; i++) {
		createPaint(levels[level].paints[i].x, levels[level].paints[i].y, levels[level].paints[i].colour); // Call create function
	}

	// Create keys
	for (let i = 0; i < levels[level].keys.length; i++) {
		createKey(levels[level].keys[i].x, levels[level].keys[i].y, levels[level].keys[i].colour);
	}

	// Show door
	door = new Door(levels[level].door.x, levels[level].door.y, levels[level].door.w, levels[level].door.h);
}

// Continuosuly draw elements
function drawElements() {
	door.draw(); // Draw door
	player.update(); // Update player

	// Draw keys
	for (let i = 0; i < keys.length; i++) {
		keys[i].draw();
	}

	// Draw keys, update collision
	for (let i = 0; i < paints.length; i++) {
		paints[i].draw(); // Draw paint
		let collide = paints[i].collision(player.sprite.position); // Call collision check

		// If touching player
		if (collide == true) {
			// If same colour as player return
			if (player.colour == paints[i].colour) {
				return;
			} else {
				player.mix(paints[i].colour); // Player colour mix
				paints.splice(i, 1); // Remove paint
			}
		}
	}
}

// Display / check UI / UX
function UIUX() {
	// Resart level (ESCAPE KEY)
	if (keyIsDown(27)) {
		displayLevel(currentLevel);
		player.colour = 'white';
	}

	text(`fps:${Math.round(frameRate())}`, 50, 30); // FPS counter
}

///////////////////////////////////////
// P5 Draw Function

function draw() {
	background(255); // Reset previous frame

	UIUX(); // Update UI / UX elements

	drawElements(); // Draw objects
	drawSprites(); // P5 Play sprites
}