var dog,dogi ,happyDog, database, foodS, foodStock;
var FeedTime,lastFed;

function preload()
{
  dogi=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(800, 700);
  
  database= firebase.database();
  foodObj= new Food()
  dog=createSprite(400,400,100,100)
  dog.addImage(dogi);
  dog.scale=0.6

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
  
   feed=createButton("FEED THE DOG")
   feed.position(700,95)
   feed.mousePressed(feedDog)

   addFood= createButton("ADD FOOD")
   addFood.position(820,95)
   addFood.mousePressed(addFoods)
}


function draw() {  
  background(46, 139, 87)

  textSize(15 ) ;
  if(lastFed>=12){
  text("Last Feed: "+ lastFed%12 + "PM" ,350,30) }
  else if (lastFed==0){
  text( "Last Feed : 12 AM", 350, 30)
  } else {
  text("Last Feed : "+ lastFed + " AM",350, 30);}




  fedTime=database.ref('Feed Time') ;
  fedTime.on("value") , function (data){
  lastFed=data.val()}
  drawSprites();
 textSize(23)
 text("NOTE:PRESS UP ARROW TO FEED MILK TO THE DOG",125,100)
}


function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }
database.ref('/').update({
  Food:x
})
}
function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
function addFoods () {
  foodS++
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()  })
}
