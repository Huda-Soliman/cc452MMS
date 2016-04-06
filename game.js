// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x999, true);

// create a renderer instance
if (window.innerWidth > 800) {
  var renderer = PIXI.autoDetectRenderer(1750, window.innerHeight, null, true);
  var width = 1750;
} else {
  var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null, true);
  var width = window.innerWidth;
}

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "" + ((window.innerWidth / 2) - 800) + "px";
var container = new PIXI.DisplayObjectContainer();
container.position.y = 0;

var bgDrawY1 = 0;
var bgDrawY2 = 2038;
var bgDrawY3 = -2308;
//Back();

// Determine the starting place of each frame for the moving background

var texture6 = PIXI.Texture.fromImage("media/background.png");
//Adding background to the stage
var imgSprite = new PIXI.Sprite(texture6);
imgSprite.scale.x = 2;
imgSprite.scale.y = 3.6;
var imgSprite2 = new PIXI.Sprite(texture6);
imgSprite2.scale.x = 2;
imgSprite2.scale.y = 3.6;

var imgSprite3 = new PIXI.Sprite(texture6);
imgSprite3.scale.x = 2;
imgSprite3.scale.y = 3.6;

Back();

function Back() {
  stage.addChild(imgSprite3, 0, bgDrawY3);
  stage.addChild(imgSprite);
  stage.addChild(imgSprite2, 0, bgDrawY2);
  requestAnimFrame(moveBg);
}

function moveBg() {
  bgDrawY1 += 2;
  bgDrawY2 += 2;
  bgDrawY3 += 2;

  if (bgDrawY1 >= 2 * 2308) {
    bgdrawY1 = -2308;
  }
  if (bgDrawY2 >= 2 * 2308) {
    bgDrawY2 = -2308;
  }
  if (bgDrawY3 >= 2 * 2308) {
    bgDrawY3 = -2308;
  }
  imgSprite.position.y = bgDrawY1;
  imgSprite2.position.y = bgDrawY2;
  imgSprite3.position.y = bgDrawY3;
  renderer.render(stage);
  requestAnimFrame(moveBg);
}

// creating the textures
var planeTexture = PIXI.Texture.fromImage("media/myplane.png");
var badTexture = PIXI.Texture.fromImage("media/badguy.png");
var rocketTexture = PIXI.Texture.fromImage("media/Rocket.png");
var fireTexture = PIXI.Texture.fromImage("media/boom.png");
var eplosionTexture = PIXI.Texture.fromImage("media/explosion.png");
var startTexture = PIXI.Texture.fromImage("media/start.png");
var gameoverTexture = PIXI.Texture.fromImage("media/over.png");
var resetTexture = PIXI.Texture.fromImage("media/reset.png");
var pauseTexture = PIXI.Texture.fromImage("media/pause.png");
var playTexture = PIXI.Texture.fromImage("media/play.png");
var soundText = PIXI.Texture.fromImage("media/sound.png");
var muteText = PIXI.Texture.fromImage("media/mute.png");
var lifeText = PIXI.Texture.fromImage("media/life.png");
var extraText = PIXI.Texture.fromImage("media/heart.png");
var badFireTexture = PIXI.Texture.fromImage("media/badGuyFire.png");

var myplane = new PIXI.Sprite(planeTexture);
var explosion = new PIXI.Sprite(eplosionTexture);
explosion.scale.x = explosion.scale.y = 2;
var fire = new PIXI.Sprite(fireTexture);
fire.scale.x = fire.scale.y = 0.5;
var extraLife = new PIXI.Sprite(extraText);

var score = 0;
// the score of the game
var life = 3;
var shooting = false;
// indicates wether the plane is shooting or not
var elashrar = [];
var narelashrar = [];
var rockets = [];
var lives = [];
var firing = [];
var gift = [];
var scoreText;
var level = 1;

var removed = false;
var pause = false;
var endGame = false;

var resetBtn = new PIXI.Sprite(resetTexture);
resetBtn.setInteractive(true);
resetBtn.position.x = 80;
resetBtn.position.y = window.innerHeight - 300;
resetBtn.mousedown = resetBtn.touchstart = function(data) {
  container.removeChild(myplane);
  container.removeChild(scoreText);
  life = 3;
  reset();

};

var pauseBtn = new PIXI.Sprite(pauseTexture);
var playBtn = new PIXI.Sprite(playTexture);
pauseBtn.setInteractive(true);
playBtn.setInteractive(true);
pauseBtn.position.x = 160;
pauseBtn.position.y = window.innerHeight - 400;
playBtn.position.x = 160;
playBtn.position.y = window.innerHeight - 400;
playBtn.anchor.x = playBtn.anchor.y = 0.5;
pauseBtn.anchor.x = pauseBtn.anchor.y = 0.5;
pauseBtn.scale.x = pauseBtn.scale.y = 0.4;
playBtn.scale.x = playBtn.scale.y = 0.4;
pauseBtn.mousedown = pauseBtn.touchstart = function(data) {
  container.removeChild(pauseBtn);
  container.addChild(playBtn);
  myplane.setInteractive(false);
  pause = true;

};
playBtn.mousedown = playBtn.touchstart = function(data) {
  container.removeChild(playBtn);
  container.addChild(pauseBtn);
  myplane.setInteractive(true);
  pause = false;

};

var soundBtn = new PIXI.Sprite(soundText);
var muteBtn = new PIXI.Sprite(muteText);
soundBtn.setInteractive(true);
muteBtn.setInteractive(true);
soundBtn.position.x = 100;
soundBtn.position.y = 100;
muteBtn.position.x = 100;
muteBtn.position.y = 100;
muteBtn.anchor.x = muteBtn.anchor.y = 0.5;
soundBtn.anchor.x = soundBtn.anchor.y = 0.5;
soundBtn.scale.x = soundBtn.scale.y = 0.4;
muteBtn.scale.x = muteBtn.scale.y = 0.4;
soundBtn.mousedown = soundBtn.touchstart = function(data) {
  container.removeChild(soundBtn);
  container.addChild(muteBtn);
  document.getElementById("audio1").pause();

};
muteBtn.mousedown = muteBtn.touchstart = function(data) {
  container.removeChild(muteBtn);
  container.addChild(soundBtn);
  document.getElementById("audio1").play();
};

startPanel();

function startPanel() {
  document.getElementById("audio1").play();
  var start = new PIXI.Sprite(startTexture);
  start.anchor.x = start.anchor.y = 0.5;
  start.position.x = width / 2;
  start.position.y = window.innerHeight / 2;
  start.scale.x = start.scale.y = 3;
  start.setInteractive(true);
  stage.addChild(start);

  start.mousedown = start.touchstart = function(data) {
    stage.removeChild(start);
    stage.addChild(container);
    reset();

  };

}

function reset() {// to be called when you want to stop the timer
  stage.removeChild(container);
  Back();
  container = new PIXI.DisplayObjectContainer();
  container.position.y = 0;
  stage.addChild(container);
  createMyplane(Math.random() * width, Math.random() * window.innerHeight);
  setTimer();
  container.addChild(resetBtn);
  container.addChild(pauseBtn);
  container.addChild(soundBtn);

  score = 0;
  // the score of the game
  life = 3;
  shooting = false;
  // indicates wether the plane is shooting or not
  elashrar = [];
  narelashrar = [];
  rockets = [];
  lives = [];
  firing = [];
  addScore();
  addLives();

}

function setTimer() {

  clearInterval(badTimer);
  clearInterval(shootTimer);
  clearInterval(removeFireTimer);
  // clearInterval(giftTimer);
  // var giftTimer = setInterval(Gifts,Math.random*100000+100);
  var badTimer = setInterval(addBad, 2000 / (level));
  var shootTimer = setInterval(shoot, 40);
  var removeFireTimer = setInterval(removeFire, 100);

}

var levelText;
function addScore() {
  scoreText = new PIXI.Text(score, "bold 200px arial", "white");
  scoreText.anchor.x = 0.5;
  scoreText.position.x = width - 150;
  scoreText.position.y = 50;
  container.addChild(scoreText);
  requestAnimFrame(updateScore);
  levelText = new PIXI.Text("LEVEL 1 ", "bold 80px ms comic sans", "white");
  levelText.position.x = width - 350;
  levelText.position.y = 5;
  container.addChild(levelText);
}

function updateScore() {
  requestAnimFrame(updateScore);
  scoreText.setText(score, "bold 200px ms comic sans", "white");
  if (score >= 100) {
    levelText.setText("LEVEL 2 ", "bold 80px ms comic sans", "white");
  }
  // render the stage
  renderer.render(stage);
}

function addLives() {
  //containerRemoved =false;
  //adding 3 lives to the container
  for (var g = 1; g <= 3; g++) {
    var live = new PIXI.Sprite(lifeText);
    live.position.x = scoreText.position.x - 10;
    live.position.y = 200 + (150 * (g));
    live.anchor.x = live.anchor.y = 0.25;
    live.scale.x = live.scale.y = 0.15;
    lives.push(live);
    container.addChild(live);
  }
  lives = lives.reverse();
  requestAnimFrame(lifeUpdate);
}

function lifeUpdate() {

  requestAnimFrame(lifeUpdate);

  if (lives.length == 0)//gameOver
  {
    if (!removed) {
      var gameOver = new PIXI.Sprite(gameoverTexture);
      gameOver.anchor.x = gameOver.anchor.y = 0.5;
      gameOver.scale.x = gameOver.scale.y = 2;
      gameOver.position.x = width / 2;
      gameOver.position.y = window.innerHeight / 2;
      gameOver.setInteractive(true);

      var over = new PIXI.DisplayObjectContainer();
      //stage.removeChild(container);
      //containerRemoved=true;
      container.removeChild(myplane);
      container.removeChild(scoreText);
      container.removeChild(resetBtn);
      container.removeChild(pauseBtn);
      over.addChild(gameOver);
      stage.addChild(over);
      life = 3;

      removed = true;
      gameOver.mousedown = gameOver.touchstart = function(data) {

        stage.removeChild(over);
        stage.addChild(container);
        reset();
        removed = false;
      };
    }
  } else if (life < lives.length) {
    lives = lives.reverse();
    container.removeChild(lives.pop());
    lives = lives.reverse();
  }

}

function createMyplane(x, y) {

  // enable the myplane to be interactive.. this will allow it to respond to mouse and touch events
  myplane.setInteractive(true);

  // center the myplanes anchor point
  myplane.anchor.x = myplane.anchor.y = 0.25;

  myplane.scale.x = myplane.scale.y = 2;
  //this.dragging = true;

  // set the callbacks for when the mouse or a touch moves
  myplane.mousemove = myplane.touchmove = function(data) {
    this.dragging = true;
    this.data = data;
    this.alpha = 0.9;
    // need to get parent coords..
    var newPosition = this.data.getLocalPosition(this.parent);
    this.position.x = newPosition.x;
    this.position.y = newPosition.y;

  };

  myplane.mousedown = myplane.touchstart = function(data) {
    this.dragging = true;
    shooting = true;
  };

  // set the events for when the mouse is released or a touch is released
  myplane.mouseup = myplane.mouseupoutside = myplane.touchend = myplane.touchendoutside = function(data) {
    this.dragging = true;
    shooting = false;
  };

  // move the sprite to its designated position
  myplane.position.x = x;
  myplane.position.y = y;

  // add it to the stage
  container.addChild(myplane);
}

function addBad() {
  if (!pause) {
    var badguy = new PIXI.Sprite(badTexture);
    badguy.position.x = (Math.random() * width);
    var badGuysFire = new PIXI.Sprite(badFireTexture);
    badGuysFire.position.x = badguy.position.x + 10;

    badguy.anchor.x = badguy.anchor.y = 0.5;
    badGuysFire.anchor.x = badGuysFire.anchor.y = 0.5;

    elashrar.push(badguy);
    narelashrar.push(badGuysFire);
    container.addChild(badguy);
    container.addChild(badGuysFire);
    requestAnimFrame(moveBadguys);
    requestAnimFrame(moveBadGuysFire);

    badguy.end = false;
    badguy.Speed = Math.random() % 10 + 2;
    badguy.life = true;
  }
}

var steps = 0;
function moveBadguys() {
  if (!pause) {
    for (var i = 0; i < elashrar.length; i++) {
      var xMove;
      if (steps % 8 == 0) {
        xMove = -elashrar[i].Speed * 3;
      } else if (steps % 10 == 0) {
        xMove = -elashrar[i].Speed * 3;
      } else {
        xMove = elashrar[i].Speed;
      }

      elashrar[i].position.x += xMove;
      elashrar[i].position.y += 3;
      if (elashrar[i].position.y == window.height) {
        elashrar[i].end = true;
        if (elashrar[i].life) {
          // container.removeChild(elashrar[i]);
          elashrar[i].visible = false;
          elashrar[i].life = false;
        }

      }
      if (elashrar[i].life) {
        if ((elashrar[i].position.y > myplane.position.y - 100) && (elashrar[i].position.y < myplane.position.y + 100)) {
          if ((elashrar[i].position.x > myplane.position.x - 100) && (elashrar[i].position.x < myplane.position.x + 100)) {

            explosion.position.x = elashrar[i].position.x;
            explosion.position.y = elashrar[i].position.y;
            explosion.anchor.x = fire.anchor.y = 0.5;
            container.addChild(explosion);
            firing.push(explosion);
            elashrar[i].visible = false;
            elashrar[i].life = false;
            life--;
            break;
          }
        }
      }
    }
    steps++;
    renderer.render(stage);
    requestAnimFrame(moveBadguys);
  }
}

var steps1 = 0;
function moveBadGuysFire() {
  if (!pause) {
    for (var i = 0; i < narelashrar.length; i++) {
      var xMove;
      if ((steps1 % 10) == 0) {
        xMove = -10;
      } else {
        xMove = 1;
      }
      narelashrar[i].position.x += xMove;
      narelashrar[i].position.y += 2;

      if ((narelashrar[i].position.y >= myplane.position.y) && (narelashrar[i].position.y <= myplane.position.y + myplane.height) && (narelashrar[i].position.x >= myplane.position.x) && (narelashrar[i].position.x <= myplane.position.x + myplane.width)) {
        container.removeChild(narelashrar[i]);
        explosion.position.x = myplane.position.x;
        explosion.position.y = myplane.position.y;
        explosion.anchor.x = fire.anchor.y = 0.5;
        container.addChild(explosion);
        firing.push(explosion);
        life--;
        mplane.position.x = Math.random() * width;
        myplane.position.y = Math.random() * window.innerHeight;
        break;
      }
    }
    steps1++;
    renderer.render(stage);
    requestAnimFrame(moveBadGuysFire);
  }
}

function shoot() {

  if (shooting && !pause) {
    //var rocket = new PIXI.Sprite(rocketTexture);

    var rocket = new PIXI.Sprite(rocketTexture);
    rocket.position.x = myplane.position.x;
    rocket.position.y = myplane.position.y;
    rocket.setInteractive(true);
    rocket.scale.x = rocket.scale.y = 0.5;
    rocket.anchor.x = 0.5;
    rocket.anchor.y = 0.5;
    rocket.speedY = Math.random() * 10;
    rocket.end = false;
    rocket.life = true;
    rockets.push(rocket);
    container.addChild(rocket);
    requestAnimFrame(rocketMove);
  }
}

function rocketMove() {
  if (!pause) {
    for (var i = 0; i < rockets.length; i++) {

      rockets[i].position.y -= (rockets[i].speedY) % 6 + 3;

      if (rockets[i].position.y <= 0) {
        rockets[i].end = true;
        if (rockets[i].life)
          container.removeChild(rockets[i]);

      } else {

        for (var x = 0; x < elashrar.length; x++)// checkig for "darb "
        {
          if (elashrar[x].life && rockets[i].life) {

            if ((rockets[i].position.y > elashrar[x].position.y - 200) && (rockets[i].position.y < elashrar[x].position.y + 200)) {
              if ((rockets[i].position.x > elashrar[x].position.x - 100) && (rockets[i].position.x < elashrar[x].position.x + 100)) {
                score += 10;
                if (score >= 100) {
                  level = 3;
                }

                var fire = new PIXI.Sprite(fireTexture);
                fire.scale.x = fire.scale.y = 0.5;
                fire.position.x = rockets[i].position.x;
                fire.position.y = rockets[i].position.y;
                fire.anchor.x = fire.anchor.y = 0.5;
                firing.push(fire);

                if (rockets[i].life && elashrar[x].life) {

                  rockets[i].visible = false;
                  rockets[i].life = false;
                  container.addChild(fire);
                  elashrar[x].visible = false;
                  elashrar[x].life = false;
                }
              }
              break;
            }
          }
        }
      }
    }
    var temp = [];
    for (var i = 0; i < rockets.length; i++) {
      var b = rockets.slice(i, i + 1);
      if (b[0].end == false) {
        temp.push(b[0]);
      }
    }
    rockets = temp;
    renderer.render(stage);
    requestAnimFrame(rocketMove);
  }
}

function removeFire() {
  if (firing.length > 0 && !pause && !endGame) {
    for (var i = 0; i < firing.length; i++) {
      container.removeChild(firing.pop());
    }
  }
}


