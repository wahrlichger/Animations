let x = 0.01;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 8 / 3;

let points = [];

function setup() {
  createCanvas(600, 450, WEBGL);  
  colorMode(RGB, 1);
  background(0);
}

function draw() {
  let dt = 0.01;
  let dx = (a * (y - x)) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;
  x += dx;
  y += dy;
  z += dz;

  points.push(createVector(x, y, z));

  scale(8);  
  stroke(255, 255, 255, 0.6);
  noFill();

  translate(0, 0, -80);
  rotateX(PI / 2);

  beginShape();
  for (let v of points) {
    vertex(v.x, v.y, v.z);
  }
  endShape();
}
function keyPressed() {
  if (key === 's') {
   
    saveFrames('out', 'png', 5, 1, data => {
      print('Frames Saved');
     
    });
  }
}
