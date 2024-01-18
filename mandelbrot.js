function setup() {
  createCanvas(710, 400); // Create a canvas of size 710x400 pixels
  pixelDensity(1); // Set pixel density to 1, useful for high DPI displays
  noLoop(); // Ensure draw() is only called once and not looped
}

function draw() {
  background(0); // Set the background color to black

  // Define the range of values on the complex plane for the fractal
  const w = 4; // Width of the range
  const h = (w * height) / width; // Height of the range, maintaining aspect ratio

  // Starting points on the complex plane
  const xmin = -w/2;
  const ymin = -h/2;

  loadPixels(); // Prepare to manipulate pixel array directly

  // Set maximum number of iterations for fractal calculation
  const maxiterations = 100;

  // Define the range for x and y on the complex plane
  const xmax = xmin + w;
  const ymax = ymin + h;

  // Calculate increments for x and y per pixel
  const dx = (xmax - xmin) / (width);
  const dy = (ymax - ymin) / (height);

  // Iterate over every pixel
  let y = ymin;
  for (let j = 0; j < height; j++) {
    let x = xmin;
    for (let i = 0; i < width; i++) {

      // Initialize variables for fractal calculation
      let a = x;
      let b = y;
      let n = 0;
      while (n < maxiterations) {
        const aa = a * a;
        const bb = b * b;
        const twoab = 2.0 * a * b;
        a = aa - bb + x;
        b = twoab + y;

        // Check for escape condition
        if (dist(aa, bb, 0, 0) > 16) {
          break;
        }
        n++;
      }

      // Color the pixel based on the number of iterations
      const pix = (i+j*width)*4;
      const norm = map(n, 0, maxiterations, 0, 1);
      let bright = map(sqrt(norm), 0, 1, 0, 255);
      if (n == maxiterations) {
        bright = 0;
      } else {
        pixels[pix + 0] = bright;
        pixels[pix + 1] = bright;
        pixels[pix + 2] = bright;
        pixels[pix + 3] = 255;
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels(); // Update the canvas with the computed pixels
}
