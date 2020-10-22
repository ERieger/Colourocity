let player;
let paints = [];
let platforms = [];
let door;
let paint;

function setup() {
	createCanvas(680, 560);

	displayLevel(0);

	// Player
	player = new Player(width / 2, height - 65, 50, 50, color('white'), 7.5);

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

function displayLevel(level) {
	for (let i = 0 ; i < platforms.length ; i++) {
		platforms[i].remove();
	}

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

	for (let i = 0 ; i < levels[level].paints.length ; i++) {
		createPaint(levels[level].paints[i].x, levels[level].paints[i].y, levels[level].paints[i].colour);
	}

	door = new Door(levels[level].door.x, levels[level].door.y, levels[level].door.w, levels[level].door.h);
}

function draw() {
	background(255);
	door.draw();
	paint.draw();

	player.update();

	drawSprites();
}