//Create variables here
var happyDog,dog,database,foodref,ball,food,feed,add,dinner,hour,n,minute;
let b=[];
function preload()
{
  happy=loadImage("images/dogImg.png");
  normal=loadImage("images/dogImg1.png");
}

class Milk{
  constructor(x){
    this.x=x;
   this.y=200;
   this.width=50;
   this.height=50;
   this.image=loadImage("Milk.png")
  }
  display(){
    push();
    image(this.image,this.x,this.y,this.width,this.height);
    pop();
  }
  }
function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  hour=0;
  time=0;
  ball=new Ball();
  n=new Ball();
  m=new Ball();
  
feed=createButton("Feed");
add=createButton("Add Food");
  for (let i=1;i<=ball.x;i++){
    var x=10+i*30;
    b[i]=new Milk(x);
  }
  dog=createSprite(410,250,10,10);
   dog.addImage("n",normal);
  dog.scale=0.15
  dog.addImage("h",happy);
  foodref=database.ref("food");
  foodref.on('value',readPosition);
  
}
function draw() {  
background(46, 139, 87);
getTime();
console.log(hour);
if(food!==undefined){
 
    feed.mousePressed(function(){
      ball.move();
      dog.changeImage("h",happy);
      n.x=hour;
      m.x=minute;
    })
    add.mousePressed(function(){
      ball.x=ball.x+1;
      dog.changeImage("n",normal);
    })
    if(ball.x>10){
      ball.x=10;
    }
    for (let i=1;i<=ball.x;i++){
      b[i].display();
    }
   n.display();
    ball.display();
    m.display();
    writePosition();
  if(ball.x<0){
    ball.x=0;
  }
  feed.position(170,10);
  add.position(230,10);
  textSize(20);
  fill("white");
  text("Food Remaining:"+ball.x,180,100);
  text("Last Fed:"+n.x+":"+m.x,20,20);
  drawSprites(); 
  }
  
}

function writePosition(){
  database.ref('food').set({
    milk:ball.x,
    time:n.x,
    min:m.x
  })
}
function readPosition(data){
  food=data.val();
  ball.x=food.milk;
  n.x=food.time;
  m.x=food.min;
}
async function getTime(){
  var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
     hour=datetime.slice(11,13);
     minute=datetime.slice(14,16);
}
