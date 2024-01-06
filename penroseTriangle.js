var tri = []; // array for penrose triangles
var sizeSlider;		// range 1~60, default 30
var alphaSlider;	// range 0~1, defalut 1
var speedSlider;	// range -3~3, default 0
var borderSlider;	// range 1~6, default 3

function setup() {
  createCanvas(750, 750);
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSL, 360, width, height);

  sizeSlider = createSlider(1, 60, 60, 0);		// max, min, default
  sizeSlider.position(20, 20);
  
  alphaSlider = createSlider(0, 1, 0.5, 0);
  alphaSlider.position(20, 60);
  
  speedSlider = createSlider(-3, 3, 1, 0);
  speedSlider.position(20, 100);
  borderSlider = createSlider(1, 7, 4, 0);
  borderSlider.position(20, 140);
  

/*
  for (let m = 0; m <= width; m = m + width / 2) {
    for (let n = 0; n <= height; n = n + height / 2) {
      let centerX = m + width / 4;
      let centerY = n + height / 5;			// randomness
      tri.push(new penrose(
        centerX,
        centerY,
        5
      ));
    }
  }
  */
  tri.push(new penrose(width / 2, height / 2, 5));
}
/*
function mouseDragged() {
		tri.push(new penrose(mouseX, mouseY, 5));
}
*/
function draw() {
  background(22);

  for (let i = 0; i < tri.length; i++) {
    tri[i].update();
  }
}

class rotator {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = 0; // angle
    this.c = 0;

  }

  update() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    stroke(200);
    strokeWeight(borderSlider.value());
    fill(this.c % 360, mouseX, mouseY, alphaSlider.value());
    rect(0, 0, this.w, this.h);
    pop();
    this.a = this.a + speedSlider.value();
    this.w = sizeSlider.value();
    this.h = this.w;
    this.c++;
  }
}

class penrose {
  constructor(centerX, centerY, inc) {
    /*
     * 					  p1
     *					/   \
     *         /	   \
     *			  s2     s3
     *			 /	(x,y)  \
     *		  /		        \
     *   	p2 - s1 - s4 - p3
     *
     * p1 = (x,y-r*(sqrt(3)-1))
     * p2 = (x-r, y+r)
     * p3 = (x+r, y+r)
     */
    this.centerX = centerX;
    this.centerY = centerY;
    this.inc = inc;
    this.size = 10;

    this.r = 100; // set
    this.count = 0;

    this.s1 = [];
    this.s2 = [];
    this.s3 = [];
    this.s4 = []; // extension of s1

    for (let x = this.centerX - this.r; x < this.centerX; x = x + 2 * this.inc) {
      // p2 = (x-r, y+r)
      // p3 = (x+r, y+r)
      let x1 = this.centerX - this.r;
      let y1 = this.centerY + this.r;
      let x2 = this.centerX + this.r;
      let y2 = this.centerY + this.r;
      // linear equation
      let y = (y2 - y1) / (x2 - x1) * x + (x2 * y1 - x1 * y2) / (x2 - x1);

      this.s1.push(new rotator(
        x,
        y,
        this.size,
        this.size
      ));
      this.count++;
    }

    for (let x = this.centerX - this.r; x <= this.centerX; x = x + this.inc) {
      // p1 = (x,y-r*(sqrt(3)-1))
      // p2 = (x-r, y+r)
      let x1 = this.centerX;
      let y1 = this.centerY - this.r * (sqrt(3) - 1);
      let x2 = this.centerX - this.r;
      let y2 = this.centerY + this.r;
      // linear equation
      let y = (y2 - y1) / (x2 - x1) * x + (x2 * y1 - x1 * y2) / (x2 - x1);
      this.s2.push(new rotator(
        x,
        y,
        this.size,
        this.size
      ));
    }

    for (let x = this.centerX; x <= this.centerX + this.r; x = x + this.inc) {
      // p1 = (x,y-r*(sqrt(3)-1))
      // p3 = (x+r, y+r)
      let x1 = this.centerX;
      let y1 = this.centerY - this.r * (sqrt(3) - 1);
      let x2 = this.centerX + this.r;
      let y2 = this.centerY + this.r;
      // linear equation
      let y = (y2 - y1) / (x2 - x1) * x + (x2 * y1 - x1 * y2) / (x2 - x1);

      this.s3.push(new rotator(
        x,
        y,
        this.size,
        this.size
      ));
    }

    //  for (let x = centerX + inc; x < centerX / 2 * 3 + inc; x = x + inc * 2) {
    for (let x = this.centerX - this.r / 2 + this.count * this.inc; x < this.centerX + this.r + this.inc; x = x + this.inc * 2) {
      // p2 = (x-r, y+r)
      // p3 = (x+r, y+r)
      let x1 = this.centerX - this.r;
      let y1 = this.centerY + this.r;
      let x2 = this.centerX + this.r;
      let y2 = this.centerY + this.r;
      // linear equation
      let y = (y2 - y1) / (x2 - x1) * x + (x2 * y1 - x1 * y2) / (x2 - x1);

      this.s4.push(new rotator(
        x,
        y,
        this.size,
        this.size
      ));
    }
  }

  update() {

    for (let i = 0; i < this.s1.length; i++) {
      this.s1[i].update();
    }
    for (let i = 0; i < this.s2.length; i++) {
      this.s2[i].update();
    }
    for (let i = 0; i < this.s3.length; i++) {
      this.s3[i].update();
    }
    for (let i = 0; i < this.s4.length; i++) {
      this.s4[i].update();
    }
  }

}