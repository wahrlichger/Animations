let windSpeed;
let windDirection;

function setup() {
  createCanvas(400, 400);
  windSpeed = 1;
  windDirection = 0;
}

function draw() {
  background(255);

  // Rüzgarın yönünü ve şiddetini güncelle
  windDirection += 0.01;
  windSpeed = noise(frameCount * 0.01) * 5;

  // Rüzgar efektini çiz
  for (let i = 0; i < width; i += 20) {
    let angle = windDirection + (i * 0.02);
    let x = i;
    let y = height / 2 + sin(angle) * 20;
    stroke(0);
    line(x, height / 2, x, y);
  }
}
