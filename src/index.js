let player;
let paint;
let platforms = [];

function setup() {
	createCanvas(680, 560);

	displayLevel(0);
	paint = new Paint(width / 2, 50, color('red'));

	// Player
	player = new Player(width / 2, height - 65, 50, 50, color('aqua'), 7.5);

	player.teleport(width / 2, 506);
}

function draw() {
	background(255);
	paint.draw();


	player.update();

	drawSprites();
}

function createPlatform(x, y, w, h, colour) {
	const platform = new Platform(x, y, w, h, colour);
	platforms.push(platform);
}

function displayLevel(level) {
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
}