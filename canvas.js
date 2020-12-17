import {GAME} from "./game.js";
import {Tank , Defualt_TankImgSource} from "../objects/tank.js";
import {Bullet} from "./objects/bullets.js";
import {grassGround} from "./objects/textuerGround.js";
import {BuildBlock} from "./objects/blocks.js";

// game object just for game sitting & tell us about game cases 
const game = new GAME();

// target canvas in constant
export const canvas = document.querySelector("#gameCanvas");
             canvas.width = 800;
             canvas.height = 600;

// get context 2d for canvas usage "ctx"
export const ctx = canvas.getContext("2d");

// canvas background color 
var CanvasColorTerran  = "black";

ctx.fillStyle = CanvasColorTerran;
ctx.fillRect(0,0,800,600);

// defining player tank    
const playerTank = new Tank(150 , 200 , 4 , Defualt_TankImgSource);

document.addEventListener("keypress" , playerTank.move);

// when player click in canvas tank shot bullets
canvas.addEventListener("click" , function shotBullet() {
    playerTank.Bullets.push(new Bullet((playerTank.x + playerTank.height/2) , (playerTank.y + playerTank.width/2), playerTank.TankCaseString));
});

// function who draw ground depeneding grassGround object from textuerGround.js
function drawGround(){
    ctx.fillRect(0,0,800,600);
    for(let Y = 1 , y = 0; Y <= 12 ; y += grassGround.size , Y += 1){
        for(let block = 1 , x = 0; block <= 16 ; block += 1 , x+= grassGround.size){
            ctx.drawImage(grassGround.img, x , y , grassGround.size, grassGround.size);
        }
    }
}

//defined new Array of blocks for test
var ArrayOfBlocks = [];

for(let row = 1 , y = 25 , i = 1; row <= 6 ; row += 1 , y += 120){
    for(let index = 1 , x = 40 ; index <= 7 ; index += 1  , x += 110){
        ArrayOfBlocks.push(new BuildBlock(x , y ));
        i+=1;
    }
}


let fpsControl = setInterval(() => {
    game.upDatingFPS();
} , 1000);

function Render(){
    // start animation
    ctx.clearRect(0,0,800,600);

    // shadow sitting
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    // drawing ground as first step after clearing canvas
    drawGround();
   
    // drowing border in tank 
    /*ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.strokeRect(playerTank.x,playerTank.y, playerTank.width , playerTank.height);*/
    
    // rendering bullets
    for(let bullet of playerTank.Bullets){
        // if bullet out of canvas or terran just skip render
        if(bullet.isOutOfCanvas() || !bullet.isCollision){
            //debugger;
            continue;
        }
        else{ 
            for(let block of ArrayOfBlocks){
                bullet.collision(block);
            }
            bullet.movingBulletWithDirection();
            bullet.render();
        }
    }

    // rendering blocks
    for(let block of ArrayOfBlocks){      
        block.render();
        // collision player tank bettwen each block
        playerTank.collision(block);
    }

    // Rendering Player Tank
    playerTank.render();

    // turn of shadow before drawing fps & frame
    ctx.shadowColor = "transparent";
    // FPS & FRAME 
    if(game.sitting.counterFPS)   game.fps += 1; game.drawFPS();
    if(game.sitting.counterFRAME) game.frame += 1; game.drawFRAME();

    requestAnimationFrame(Render);
}

Render();
