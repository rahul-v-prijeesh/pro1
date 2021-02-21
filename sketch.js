var newball;
var position,database;
function preload(){

    r=loadImage("Hot Air Ballon-01.png")
    t=loadImage("Hot Air Ballon-02.png")
}
   
function setup(){
    createCanvas(800,800);
    newball = createSprite(250,250,10,10);
    newball.shapeColor = "red";
    database=firebase.database();
    var newballpos=database.ref('ball/position');
    newballpos.on("value",readPosition,showError);
    newball.addImage(t)
}

function draw(){
    image(r,0,0,1500,800)
    
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({

    x : position.x + x,
    y : position.y + y
    })
    

}
function readPosition(data){
    position=data.val()
    console.log(position.x)
    newball.x=position.x
    newball.y=position.y
}
function showError(){
    console.log("error in writing to the database")
}