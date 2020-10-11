let player;
let platforms = [];

function setup() {
	createCanvas(680, 560);

	// Player
	player = new Player(width / 2, height - 65, 50, 50, color('aqua'), 7.5);

	// Floor
	createPlatform(width / 2, height - 20, width, 40, color(0));

	// Walls
	createPlatform(20, height / 2, 40, height, color(0));
	createPlatform(width - 20, height / 2, 40, height, color(0));

	createPlatform(50, 300, 300, 25, color(0));
}

function draw() {
	background(255);

	player.update();

	drawSprites();
}

function createPlatform(x, y, w, h, colour) {
	const platform = new Platform(x, y, w, h, colour);
	platforms.push(platform);
}
