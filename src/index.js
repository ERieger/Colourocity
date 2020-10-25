let player;
let paints = [];
let platforms = [];
let keys = [];
let door;
let paint;
let key;
let colours = ['white', 'black', 'red', 'yellow', 'blue', 'orange', 'green', 'purple'];

function setup() {
	createCanvas(680, 560);

	displayLevel(0);

	// Player
	player = new Player(width / 2, height - 65, 50, 50, color(colours[0]), 7.5);

	player.teleport(width / 3, 506);
}

function createPlatform(x, y, w, h, colour) {
	const platform = new Platform(x, y, w, h, colour);
	platforms.push(platform);
}

function createPaint(x, y, colour) {
	paint = new Paint(x, y, colour);
	paints.push(paint);
}

function createKey(x, y, colour) {
	key = new Key(x, y, colour);
	keys.push(key);
}

function displayLevel(level) {
	for (let i = 0; i < platforms.length; i++) {
		platforms[i].remove();
	}

	paints = [];
	keys = [];

	platforms = [];

	// Floor
	createPlatform(width / 2, height - 15, width, 30, color(0));

	// Roof
	createPlatform(width / 2, 5, width, 10, color(255));

	// Walls
	createPlatform(15, height / 2, 30, height, color(0));
	createPlatform(width - 15, height / 2, 30, height, color(0));

	for (let i = 0; i < levels[level].stucture.length; i++) {
		createPlatform(levels[level].stucture[i].x, levels[level].stucture[i].y, levels[level].stucture[i].w, levels[level].stucture[i].h, levels[level].stucture[i].colour);
	}

	for (let i = 0; i < levels[level].paints.length; i++) {
		createPaint(levels[level].paints[i].x, levels[level].paints[i].y, levels[level].paints[i].colour);
	}

	for (let i = 0; i < levels[level].keys.length; i++) {
		createKey(levels[level].keys[i].x, levels[level].keys[i].y, levels[level].keys[i].colour);
	}

	door = new Door(levels[level].door.x, levels[level].door.y, levels[level].door.w, levels[level].door.h);
}

function drawElements() {
	for (let i = 0; i < keys.length; i++) {
		keys[i].draw();
	}

	for (let i = 0; i < paints.length; i++) {
		paints[i].draw();
		let collide = paints[i].collision(player.sprite.position);

		if (collide == true) {
			player.changeColour(paints[i].colour);
		}
	}
}

function draw() {
	background(255);
	text(`fps:${Math.round(frameRate())}`, 30, 30);
	door.draw();

	drawElements();

	player.update();

	drawSprites();
}