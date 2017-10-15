let fft;
let spectrum;
let whiteAmp, pinkAmp, brownAmp;
let c;

function setup() {

  createCanvas(512, 300);
  wnoise = new p5.Noise('white');
  pnoise = new p5.Noise('pink');
  bnoise = new p5.Noise('brown');
  whiteAmp = 0;
  pinkAmp = 0;
  brownAmp = 0;
  c = color(255);

  wnoise.amp(0);
  pnoise.amp(0);
  bnoise.amp(0);
  wnoise.start();
  pnoise.start();
  bnoise.start();
  fft = new p5.FFT(0, 512);

}

function draw() {

  background(80);
  noStroke();
  fill(255);
  rect(0, 0, width/3, width/3);
  fill(255, 200, 200);
  rect(width/3, 0, width/3, width/3);
  fill(139,69,19);
  rect(width*2/3, 0, width/3, width/3);

  wnoise.amp(whiteAmp);
  pnoise.amp(pinkAmp);
  bnoise.amp(brownAmp);

  spectrum = fft.analyze();

  fill(c);
  beginShape();
  vertex(0, height);
  for (var i = 0; i< spectrum.length; i++){
    vertex(i, map(spectrum[i], 0, height, height, 0));
  }
  vertex(width, height);
  endShape();

  fill(80);
  textAlign(CENTER);
  textFont('arial', 30);
  text('White Noise', width*1/6, width/6);
  text('Pink Noise', width/2, width/6);
  text('Brown Noise', width*5/6, width/6);

}

function mousePressed() {
  if (mouseY >= 0 && mouseY <= width/3) {
    if (mouseX >= 0 && mouseX <= width/3) {
      whiteAmp = 0.01;
      pinkAmp = 0;
      brownAmp = 0;
      c = color(255, 255, 255);
    } else if (mouseX >= width/3 && mouseX <= width*2/3) {
      whiteAmp = 0;
      pinkAmp = 0.01;
      brownAmp = 0;
      c = color(255, 200, 200);
    } else if (mouseX >= width*2/3 && mouseX <= width) {
      whiteAmp = 0;
      pinkAmp = 0;
      brownAmp = 0.01;
      c = color(139, 69, 19)
    }
  }
}
