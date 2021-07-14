var userPaddle, computerPaddle, computerScore, playerScore, gameState, ball,scoreSound, wall_hitSound, hitSound;

function preload(){
  scoreSound = loadSound('score.mp3');
  wall_hitSound = loadSound('wall_hit.mp3');
  hitSound = loadSound('hit.mp3');
}

function setup() {
  
createCanvas(windowWidth,windowHeight);

//create a user paddle sprite
userPaddle = createSprite(windowWidth/1.01,200,10,120);

//create a computer paddle sprite
computerPaddle = createSprite(10,200,10,120);

//create the pong ball
ball = createSprite(windowWidth/2,windowHeight/2,20,20);

computerScore = 0;
playerScore = 0;
gameState = "serve";
}

function draw() {  
  //fill the computer screen with white color
  background("white");
  edges = createEdgeSprites();
  

  //display Scores
  textSize(35)
  text(computerScore,windowWidth/2-250,30);
  text(playerScore, windowWidth/2+250,30);

  //draw dotted lines
  for (var i = 0; i < 1000; i+=10) {
     line(windowWidth/2,i,windowHeight,i+1000000000);
  }

  if (gameState === "serve") {
    textSize(35);
    text("Press Space to Serve",windowWidth/2-100,windowHeight/2);
  }

  if (gameState === "over") {
    textSize(35)
    text("Game Over!",windowWidth/2-100,windowHeight/2);
    text("Press 'R' to Restart",windowWidth/2-100,windowHeight/2+100);
  }

  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
  }


  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 8;
    ball.velocityY = 8;
    gameState = "play";
    Math.round(getFrameRate()/60);
}

  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;



  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    //hitSound.play();
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }

  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    //hitSound.play();
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }

  //place the ball back in the centre if it crosses the screen
  if(ball.x > windowWidth || ball.x < 0){
    scoreSound.play();

  if (ball.x < 0) {
      playerScore++;
    }
    else {
      computerScore++;
    }

    ball.x = windowWidth/2;
    ball.y = windowHeight/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";

    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }

  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]);
    ball.bounceOff(edges[3]);
    wall_hitSound.play();
  }

  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y;
  drawSprites();
}
