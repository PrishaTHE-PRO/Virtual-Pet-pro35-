var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feedpet,addFood;
var fedTime,lastFed;
var foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  foodObj = new Food();

  feed=createButton("Feed the dog");
  feed.position(670,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(770,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
  
  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",320,30)
  }else if(lastFed==0){
    txt("Last Feed : 12 AM",320,30);
  }else{
    text("Last Feed : "+ lastFed + " AM",320,30)
  }
 
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }*/

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
 // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
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
// function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()

  })
}

// function to add food in stock
function addFoods(){
foodS++;
database.ref('/').update({
    Food:foodS
  })
}