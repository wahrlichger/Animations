let angle = 0;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  setGradient(0, 0, width, height, color(255, 200, 200), color(0, 102, 153));
  translate(width / 2, height / 2);

  for (let i = 0; i < 6; i++) {
    push();
    rotate(angle + 60 * i);
    drawEscherShape();
    pop();
  }

  angle += 2;
}

function drawEscherShape() {
  stroke(255);
  fill(100, 100, 200, 150);
  beginShape();
  vertex(-50, -50);
  vertex(50, -50);
  vertex(50, 50);
  vertex(-50, 50);
  endShape(CLOSE);
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
