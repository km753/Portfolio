// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
const MAX_BALLS = 25;


//Timer
var sec = 0;

function pad (time) {return time > 9 ? time : "0" + time;}
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// function to create a random color
function randomColor() {
    let red = random(0,255);
    let green = random(0,255);
    let blue = random(0,255);
    //console.log(red, green, blue);
    return 'rgb(' + red + ',' + blue + ',' + green + ')';
}

//Shape Constructor
function Shape(x, y, rateX, rateY, exists) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.rateX = random(-10, 10);
    this.rateY = random(-10,10);
    this.exists = exists;
}

// define Ball constructor
function Ball() {
  Shape.call(this, 
             random(0, width),
             random(0, height),
             random(-10,10),
             random(-10,10),
             true
             );

    this.color = randomColor(); 
    this.size = random(10, 25);
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// define ball draw method
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
    //console.log("Drawn!");
}

// define ball update method
Ball.prototype.update = function() {
    if (this.x <= 0 || this.x >= width){
        this.rateX = -(this.rateX);
    }
    if (this.y <= 0 || this.y >= height) {
        this.rateY = -(this.rateY);
    }
    this.x += this.rateX;
    this.y += this.rateY;
}

// define ball collision detection
Ball.prototype.collisionDetect = function() {
    let ball;
    let dx;
    let dy;
    let distance;
    
    for (var i=0; i < ball_objects.length; i++) {
        ball = ball_objects[i];
        if (this !== ball) {
            dx = this.x - ball.x;
            dy = this.y - ball.y;
            distance = Math.sqrt((dx*dx) + (dy*dy)); 
            if (distance < this.size + ball.size) {
                this.color = ball.color = randomColor();
            }
        }
    }
}  

//Evil Circle
function EvilCircle (x, y, exists) {
    Shape.call(this,
             random(0, width),
             random(0, height),
             40, 30,
             true
            );

    this.color = '#ff0';
    this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

//Define Evil Cirlce draw method
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

//checkBounds method
EvilCircle.prototype.checkBounds = function() {
if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}

//setControls method
EvilCircle.prototype.setControls = function() {
  var _this = this;
  
    window.onkeydown = function(e) {
    
    if(e.keyCode === 65) { 
      _this.x -= _this.rateX;
    } 
      else if(e.keyCode === 68) {
      _this.x += _this.rateX;
    } 
      else if(e.keyCode === 87) {
      _this.y -= _this.rateY;
    } 
      else if(e.keyCode === 83) {
      _this.y += _this.rateY;
    }
  }
}

//EvilCircle collision detect
EvilCircle.prototype.collisionDetect = function() {
    
    let ball;
    let dx;
    let dy;
    let distance;
    ball = ball_objects[i];
    
    for (var i=0; i < ball_objects.length; i++) {
        if (ball_objects[i].exists) {
            dx = this.x - ball_objects[i].x;
            dy = this.y - ball_objects[i].y;
            distance = Math.sqrt((dx*dx) + (dy*dy)); 
            
            if (distance < this.size + ball_objects[i].size) {
                ball_objects[i].exists = false;
            }
        }
    }
}  

// define array to store balls
var ball_objects = [];
var evil = new EvilCircle(random(0,width), random(0,height), true);
evil.setControls();

// Finally, define the loop function to get the balls bouncing
var ball = new Ball();

function gameLoop() {
    let ball;
    
    //fill canvas wih the color black
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,width,height);
    
    while(ball_objects.length < MAX_BALLS){
          ball_objects.push(new Ball());
    }
    
    //Draw and update each ball object in the array
    for (var i=0; i < ball_objects.length; i++) {
        ball = ball_objects[i];
        
        if (ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
        }
    }
    
 evil.draw();
 evil.checkBounds();
 evil.collisionDetect();
    //recursion. constantly running
    requestAnimationFrame(gameLoop);
}

//CAll the game loop function to start the animation
gameLoop();