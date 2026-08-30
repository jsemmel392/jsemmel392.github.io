// file_name: sketch.js
// description: External p5.js script handling the 3D WebGL rendering and rotation logic for Metatron's Cube.

let rotX = 0;
let rotY = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(15, 15, 25);

  let targetRotY = map(mouseX, 0, width, -PI, PI);
  let targetRotX = map(mouseY, 0, height, PI, -PI);

  rotY = lerp(rotY, targetRotY, 0.05);
  rotX = lerp(rotX, targetRotX, 0.05);

  rotateY(rotY);
  rotateX(rotX);

  stroke(100, 220, 255, 80);
  noFill();
  strokeWeight(1.0);

  let radius = 180;
  let centers = [];

  centers.push(createVector(0, 0, 0));
  for (let i = 0; i < 6; i++) {
    let a = TWO_PI / 6 * i;
    let x = cos(a) * radius;
    let y = sin(a) * radius;
    centers.push(createVector(x, y, 0));
  }

  let innerRadius = radius * sqrt(3);
  for (let i = 0; i < 6; i++) {
    let a = TWO_PI / 6 * i + PI / 6;
    let x = cos(a) * innerRadius;
    let y = sin(a) * innerRadius;
    centers.push(createVector(x, y, 0));
  }

  push();
  noStroke();
  fill(255, 200, 50, 200);
  for (let pt of centers) {
    push();
    translate(pt.x, pt.y, pt.z);
    sphere(18);
    pop();
  }
  pop();

  stroke(100, 220, 255, 100);
  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      line(centers[i].x, centers[i].y, centers[i].z, centers[j].x, centers[j].y, centers[j].z);
    }
  }
}
