var mySound, myPhrase, myPart;
var pattern = [1,0,1,0,2,2,0,1,5,4,3,1,0,4,1,0,1,2,2,0, 1,2, 2, 1,1,2,1, 3,1,2, 5,5, 2,3,4];
var heartimg;
var amp;
var button;
var bg;
var sounds;
var bg2;
var canvas;
var volhistory = [];
var stick;
var stick_createimg;
var xpos = 0;
var xpos2 = 0;
var infectedmush;
var shake;
function preload() {
 
  mySound = loadSound('beating.wav');
   
    stick_createimg = createImg("stickfigure.gif");
    infectedmush = loadSound('strange.wav');
    sounds = loadSound('p5sound.wav');
}

function setup() {
  canvas = createCanvas(1200, 600);
canvas.parent('sketch-holder');
  canvas.position(55,20);
bg = loadImage("track.jpg");
bg2 = loadImage("track.jpg");
  myPhrase = new p5.Phrase('bbox', makeSound, pattern);
  myPart = new p5.Part();
  myPart.addPhrase(myPhrase);
  myPart.setBPM(random(20));
    masterVolume(1.7);
  myPart.loop();
  sounds.loop();
 

mySound.loop();
 infectedmush.loop();
 infectedmush.amp(2);
  amp = new p5.Amplitude();
  heartimg = loadImage("humanheart.png");
shake = new Jitter();
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
  stroke(255,0,0);
  strokeWeight(2);
  fill(255,255,255,100);
  push();
  var currentY = map(0, 0, 1, height, 0);
  translate(0, height  - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1.5, height, 300);
    vertex(i, y);
  }
  endShape();
  pop();
  if (volhistory.length > width - 50) {
    volhistory.splice(0, 1);
  }
  
shake.move();
shake.display();

 

  image(heartimg, 580,120, vol* 300,vol * 300);
  
  stroke(255,255,255,100);
  strokeWeight(2);
  noFill();
  rect(0,100,420,30);
fill(255,0,0);
rect(0,100,vol*300,30);
}

function Jitter() {
  this.x = (random(10), random(1050));
  this.speed = 4;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    stick_createimg.position(this.x,400);
  }
}
function makeSound(time, playbackRate) {
  mySound.rate(playbackRate);
  mySound.loop(time);
  

}


