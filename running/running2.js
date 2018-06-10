var mySound;

var heartimg;
var amp;
var button;
var bg;
var bg2;
var canvas;
var volhistory = [];
var stick;
var stick_loadimg, stick_createimg;
var xpos = 0;
var xpos2 = 0;
var bmsr;

var sun;
var ding;
var timeleft = 30;
var startTime = 0;
var currentTime = 0;
var dingenv;
var delay;
var heartbeat;
function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

function preload() {
 
  mySound = loadSound('beating.wav');
 stick_loadimg = loadImage ("pinkstick.gif");
 stick_createimg = createImg("pinkstick.gif");
   // bmsr = loadSound('bmsr.wav');
    heartbeat = loadSound('happyheart.wav');
    
}

function setup() {
  canvas = createCanvas(1200, 600);
canvas.parent('sketch-holder');
  canvas.position(55,20);
bg = loadImage("prettytrack.jpg");
bg2 = loadImage("prettytrack.jpg");
//mySound.loop();
delay = new p5.Delay();
//delay.process(bmsr, .12, .7, 2300);
ding = new p5.Env();
   dingenv = new p5.Env();
  dingenv.setADSR(0.0, 0.1, 0.5, 1);
  dingenv.setRange(2, 0);
 dingenv.setADSR(0.0, 0.1, 0.5, 1);
  dingenv.setRange(2, 0);
heartbeat.loop();
  ding = new p5.SawOsc();

  ding.setType('sawtooth');
  ding.start();
  ding.freq(300);
  ding.amp(dingenv);
 //bmsr.loop();
  amp = new p5.Amplitude();
  heartimg = loadImage("heart2.png");
sun = loadImage("sun2.png");
startTime = millis();
var params = getURLParams();
  console.log(params);
  if (params.minute) {
    var min = params.minute;
    timeleft = min * 60;
  }

  var timer = select('#timer');
  timer.html(convertSeconds(timeleft - currentTime));

  var interval = setInterval(timeIt, 1000);
  
  function timeIt() {
    currentTime = floor((millis() - startTime) / 1000);
    timer.html(convertSeconds(timeleft - currentTime));
    if (currentTime == timeleft) {
     dingenv.play();
      clearInterval(interval);
      //counter = 0;
    }
  }

}

function draw() {
  background(bg);
   
  xpos = xpos + 2;
  if(xpos > width)
  {
    xpos = 0;
  }


  image(bg,xpos,0,1200,600);
 

  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke(92,244,255);
  strokeWeight(2);
  fill(242,242,112,155);
  push();
  var currentY = map(0, 0, 1, height, 0);
  translate(0, height  - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1.5, height, 40);
    vertex(i, y);
  }
  endShape();
  pop();
  if (volhistory.length > width - 50) {
    volhistory.splice(0, 1);
  }
  


stick_createimg.position(mouseX,mouseY);

  image(heartimg, 580,120, vol* 900,vol * 900);
  image(sun, 20,20, vol * 1100, vol * 1100);

}


