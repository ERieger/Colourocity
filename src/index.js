let player;
let platforms = [];
let levels = [{
	stucture: [{
		x: 320,
		y: 350,
		w: 300,
		h: 25,
		colour: 0
	},
	{
		x: 67,
		y: 170,
		w: 75,
		h: 25,
		colour: 0
	},
	{
		x: 613,
		y: 170,
		w: 75,
		h: 25,
		colour: 0
	}],
	keys: [],
	colours: []
}
];

function setup() {
	createCanvas(680, 560);

	// Player
	player = new Player(width / 2, height - 65, 50, 50, color('aqua'), 7.5);

	// Floor
	createPlatform(width / 2, height - 15, width, 30, color(0));

	// Roof
	createPlatform(width / 2, 5, width, 10, color(255));

	// Walls
	createPlatform(15, height / 2, 30, height, color(0));
	createPlatform(width - 15, height / 2, 30, height, color(0));

	displayLevel(0);
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

function displayLevel(level) {
	for (let i = 0; i < levels[level].stucture.length; i++) {
		createPlatform(levels[level].stucture[i].x, levels[level].stucture[i].y, levels[level].stucture[i].w, levels[level].stucture[i].h, levels[level].stucture[i].colour);
	}
}