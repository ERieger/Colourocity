/// <reference path="./modules/p5.d.ts" />

let player;
let platforms = [];

function setup() {
    createCanvas(680, 560);

    // Player
    player = new Player(width / 2, 50, 50, 50, 10);

    // Create Platforms
    platforms.push(new Platform(width / 2, height - 20, width, 40));
}

function draw() {
    background(220);

    for (const platform of platforms) {
        platform.draw();
    }

    player.draw();
}
