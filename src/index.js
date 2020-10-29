///////////////////////////////////////
// Variables

let player;
let paints = [];
let platforms = [];
let keys = [];
let door;
let colours = ['white', 'black', 'red', 'yellow', 'blue', 'orange', 'green', 'purple'];
let currentLevel = 0;
let collectedKeys = 0;
let frames = 60;
let mainMenu = document.querySelector('.Main-Menu');
let levelSelect = document.querySelector('.Level-Select');
let levelButtons = document.querySelector('.buttons');
let canvas;
let completedLevels = [0];
let background;

levelSelect.style.display = "none";

function setup() {
	canvas = createCanvas(680, 560);
	noLoop();
	canvas.hide();
	background = loadImage('../public/images/paint.jpg')
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
	currentLevel = level;
	collectedKeys = 0;
	// Clear platforms
	for (let i = 0; i < platforms.length; i++) {
		platforms[i].sprite.remove(); // P5 play remove sprite
	}

	for (let i = 0; i < paints.length; i++) {
		paints[i].sprite.remove(); // P5 play remove sprite
	}

	for (let i = 0; i < keys.length; i++) {
		keys[i].sprite.remove(); // P5 play remove sprite
	}

	door?.sprite.remove();

	paints = []; // Clear paints
	keys = []; // Clear keys
	platforms = []; // Clear platforms

	// Floor
	createPlatform(width / 2, height - 15, width, 30, color(0));

	// Roof
	createPlatform(width / 2, 5, width, 10, color(255, 255, 255, 0));

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

	player?.teleport(80, 500);
}

// Continuosuly draw elements
function collideElements() {
	// Draw keys
	for (let i = 0; i < keys.length; i++) {
		const collide = keys[i].collision(); // Call collision check

		// If touching player
		if (collide == true) {
			collectedKeys++;
			keys[i].sprite.remove();
		}
	}

	// Draw keys, update collision
	for (let i = 0; i < paints.length; i++) {
		const collide = paints[i].collision(); // Call collision check

		// If touching player
		if (collide) {
			// If same colour as player return
			if (player.colour != paints[i].colour) {
				player.mix(paints[i].colour); // Player colour mix
				paints[i].sprite.remove();
			}
		}
	}

	player?.update(); // Update player
}

function startGame(level) {
	currentLevel = level;
	mainMenu.style.display = "none";
	levelSelect.style.display = "none";
	canvas.show();

	loop();

	displayLevel(currentLevel); // Show current level

	// Player
	player = new Player(width / 2, height - 65, 50, 50, colours[0], 7.5); // Create player
	player.teleport(80, 500);
}

function returnMenu() {
	noLoop();
	mainMenu.style.display = "block";
	levelSelect.style.display = "none";
	canvas.hide();
	player.sprite.remove();
}

function removeElementsByClass(className) {
	var elements = document.getElementsByClassName(className);
	while (elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}
}

function selectLevelPage() {
	mainMenu.style.display = "none";
	levelSelect.style.display = "block";
	removeElementsByClass('level-btn');
	for (let i = 0; i < levels.length; i++) {
		let btn = document.createElement("BUTTON");
		btn.onclick = function () {
			startGame([i]);
		};
		btn.classList.add('level-btn');
		btn.innerHTML = `${i + 1}`
		levelButtons.appendChild(btn);
	}
}

///////////////////////////////////////
// P5 Draw Function

function draw() {
	background(255);
	image(background, 0, 0, width, height); // Reset previous frame

	// Resart level (R KEY)
	if (keyIsDown(82)) {
		displayLevel(currentLevel);
		player.colour = 'white';
	}

	text(`fps:${Math.round(frames)}`, 50, 30); // FPS counter

	if (collectedKeys == levels[currentLevel].keys.length) {
		door.unlock();
	}

	// Back to menu (ESCAPE KEY)
	if (keyIsDown(27)) {
		returnMenu()
	}

	collideElements(); // Collide with objects
	drawSprites(); // P5 Play sprites
}

setInterval(() => frames = frameRate(), 500);