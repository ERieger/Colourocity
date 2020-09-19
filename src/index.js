/// <reference path="./modules/p5.d.ts" />

let player = new Player(50, 0, 42, 47, 5, 10);
let floorHeight = 520;

function setup() {
    createCanvas(680, 560);
}

function draw() {
    background(220);
    noStroke();
    fill(0);
    rect(0, floorHeight, width, height);

    player.collide();
    player.gravity();
    player.move();
    player.draw();
}
