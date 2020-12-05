var dog, happyDog, database, foodS, foodStock;
var dogI, happyDogI;

function preload(){
  dogI=loadImage("images/dogImg.png")
  happyDogI=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 800);
  database = firebase.database();
  
  dog=createSprite(500,500,20,20)
  dog.addImage(dogI);
  dog.scale=0.5;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogI)
    dog.scale=0.5;
  }

  drawSprites();
fill("black");
textSize(20)
  text("Note: Press up arrow to feed",300,20)
  text("Food remaining : "+ foodS, 300, 150)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



