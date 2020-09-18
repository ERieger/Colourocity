/// <reference path="./modules/p5.d.ts" />

let player = new Player(0, 0, 32, 37, 5);

function setup() {
    createCanvas(680, 560);
}

function draw() {
    background(220);

    player.gravity();
    player.draw();
}
