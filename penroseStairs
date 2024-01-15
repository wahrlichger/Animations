let angle = 0;

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(250);
  rotateX(-30);
  rotateY(angle);
  
  let levels = 4;
  let size = 100;
  let h = size / 2;
  
  for (let i = 0; i < levels; i++) {
    push();
    let offset = size * i;
    translate(offset, offset, offset);
    drawStair(size);
    pop();
  }
  
  angle += 0.5;
}

function drawStair(s) {
  beginShape();
  fill(150);
  vertex(-s / 2, -s / 2, 0);
  vertex(s / 2, -s / 2, 0);
  vertex(s / 2, s / 2, 0);
  vertex(0, s / 2, 0);
  vertex(0, 0, 0);
  vertex(-s / 2, 0, 0);
  endShape(CLOSE);
  
  beginShape();
  fill(100);
  vertex(s / 2, -s / 2, 0);
  vertex(s / 2, -s / 2, -s);
  vertex(s / 2, s / 2, -s);
  vertex(s / 2, s / 2, 0);
  endShape(CLOSE);
  
  beginShape();
  fill(200);
  vertex(-s / 2, -s / 2, 0);
  vertex(0, -s / 2, 0);
  vertex(0, -s / 2, -s);
  vertex(-s / 2, -s / 2, -s);
  endShape(CLOSE);
}
