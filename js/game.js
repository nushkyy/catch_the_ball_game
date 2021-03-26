//BY NUSHKY
//THIS IS CREATED FOR UNIVERSITY PROJECT

//Init canvas
var game = document.getElementById("game");
var g = game.getContext("2d");
var ball = "";
var missed2 = 5;
var failSound;
var gameover;

var basketWidth = 73;
var basketHeight = 63;
var basketX = 0;
var basketY = 0;

var speed = 50;
var d = new Date();
var hours = d.getHours(); //get the hours

if (hours >= 18) {
  //if time more than 7Pm then show night background
  var background = new Image();
  background.src = "assets/field_dark.png";

  var background2 = new Image();
  background2.src = "assets/sky_dark.png";
} else {
  //if time not more than 7pm show normal
  var background = new Image();
  background.src = "assets/field.png";

  var background2 = new Image();
  background2.src = "assets/sky.png";
}

//Ball image load
var background3 = new Image();
background3.src = "assets/ball.png";

//initialize the game
failSound = new sound("assets/fail.mp3");
gameover = new sound("assets/gameover.mp3");

function init_game() {
  g.moveTo(0, 0);
  g.lineTo(0, 100);
  g.stroke();
  //create the ball falling
  ball = new createBall();
}

background.onload = function () {
  //start the game
  redrawGame();
};

//set random x co-ordinate
var lastx = Math.round(Math.random() * 600);
var lasty = 0;

function redrawGame() {
  //increment the y co-ordinate
  lastx = lastx;
  lasty = lasty + 10;
  g.drawImage(background, 0, 0);
  g.drawImage(background2, 0, 0);
  //start the game
  init_game();
}

function createBall() {
  this.param1 = {
    x: lastx,
    y: lasty,
    width: 50,
    height: 50,
    color: "#222",
  };

  //		console.log("Ball " +lastx+" "+lasty);

  if (lasty >= 320) {
    //if y co-ordinate more or equal 320 mean the ball hit the ground
    if (missed2 <= 1) {
      //if no more misses remain then game over
      document.getElementById("heart" + missed2).style.display = "none";
      document.getElementById("game_over").style.display = "block";

      var old_score = parseInt(document.getElementById("score").innerHTML);
      //display the score
      document.getElementById("nowscore").innerHTML = old_score;

      //get last high score from local storage
      var last_score_play = localStorage.getItem("hscore");

      var high_score = parseFloat(last_score_play);

      if (isNaN(high_score)) {
        high_score = 0;
      }
      if (parseFloat(high_score) < old_score) {
        //set local storage to the new high score
        document.cookie = "hscore=" + old_score;
        localStorage.setItem("hscore", old_score);

        high_score = old_score;
      }

      //display the high score
      document.getElementById("highscore").innerHTML = high_score;

      missed2--;

      //play the music game over
      gameover.play();
      clearInterval(myVar);
      return;
    } else {
      //play the fail sound
      failSound.play();
      //remove one live from the list
      document.getElementById("heart" + missed2).style.display = "none";
      missed2--;
    }

    var old_missed = parseInt(document.getElementById("missed").innerHTML);

    old_missed++;

    //display total misses

    document.getElementById("missed").innerHTML = old_missed;

    //restart the ball from random point
    lastx = Math.round(Math.random() * 590);
    lasty = 0;
    redrawGame();
    //alert("Lost");
    //clearInterval(myVar);
  }

  if (
    lastx >= basketX - 10 &&
    lastx <= basketX + basketWidth &&
    lasty >= basketY &&
    lasty < basketY + basketHeight
  ) {
    //if ball hit the basket then increase one point
    var old_score = parseInt(document.getElementById("score").innerHTML);

    old_score++;

    //display the points

    document.getElementById("score").innerHTML = old_score;

    //start ball again with increased speed
    lastx = Math.round(Math.random() * 600);
    lasty = 0;
    redrawGame();

    speed = speed - 0.5;
    clearInterval(myVar);
    myVar = setInterval(function () {
      redrawGame();
    }, speed);
  }

  this.hit = function (x, y) {
    if (
      x <= this.param1.x + this.param1.width &&
      x >= this.param1.x &&
      y <= this.param1.y + this.param1.height &&
      y >= this.param1.y
    ) {
      //g.clearRect(0,0,this.param1.width,this.param1.height);
      lastx = Math.round(Math.random() * 600);
      lasty = 0;
      redrawGame();
    }
  };

  this.move = function (x, y) {
    //when mouse moves set the last basket position other wise if basket not move and ball hit basket cannot identify
    basketX = x;
    basketY = y;
  };

  //g.fillStyle=this.param1.color;
  //g.fillRect(this.param1.x,this.param1.y,this.param1.width,this.param1.height);

  g.drawImage(background3, this.param1.x, this.param1.y);
}

game.addEventListener(
  "click",
  function (event) {
    //when mouse click function
    var x = event.pageX - game.offsetLeft,
      y = event.pageY - game.offsetTop;

    ball.hit(x, y);
  },
  false
);

game.addEventListener(
  "mousemove",
  function (event) {
    //when mouse move function
    var x = event.pageX - game.offsetLeft,
      y = event.pageY - game.offsetTop;

    ball.move(x, y);
  },
  false
);

var myVar = setInterval(function () {
  //make the ball falling down
  redrawGame();
}, speed);

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
