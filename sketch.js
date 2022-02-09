var hypnoticBall, database;
var position;
var star
var bg
var bg1
function preload(){
star=loadImage('star 11.png')
bg=loadImage('work.png')
}
function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  bg1=createSprite(200,200,10,10)
  bg1.addImage(bg)
  bg1.scale=1.5
  hypnoticBall = createSprite(250,250,10,10);

  hypnoticBall.shapeColor = "red";
  hypnoticBall.addImage(star)

  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
