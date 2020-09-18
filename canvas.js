import {Tank , Bullet , bullet , Defualt_TankImgSource} from "../objects/tank.js";

import {grassGround} from "./objects/textuerGround.js";

import {NewBuildBlockIMG , BuildBlock} from "./objects/blocks.js";

// this function just for adding canvas in dom :)
function setCanvasInDom(){
    document.body.insertAdjacentHTML("afterbegin",`<canvas id="gameCanvas"> </canvas>`);
}
setCanvasInDom(); // call

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
const playerTank = new Tank(150 , 150 , 4 , Defualt_TankImgSource);

document.addEventListener("keypress" , playerTank.MovingTank);

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

//defined new block for test
const testblock = new BuildBlock();

function Render(){
    // start animation
    ctx.clearRect(0,0,800,600);

    // shadow sitting
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 0.1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;

    // drawing ground as first step after clearing canvas
    drawGround();

   
    // ctx.lineWidth = 4;
    // ctx.strokeStyle = "red";
    // ctx.strokeRect(playerTank.x,playerTank.y, playerTank.width , playerTank.height);
    
    // rendering bullets
    for(let i = 0 ; i < playerTank.Bullets.length ; i += 1){
        // if bullet out of canvas or terran just skip render
        if(playerTank.Bullets[i].isOutOfCanvas()) continue;
        else{
            // else render bullet
            playerTank.Bullets[i].movingBulletWithDirection();
            ctx.drawImage(bullet ,  playerTank.Bullets[i].x ,  playerTank.Bullets[i].y ,  playerTank.Bullets[i].size ,  playerTank.Bullets[i].size);    
        }
    }

    // rendering test block
    testblock.render(250,250);

    // Rendering Player Tank
    ctx.drawImage(playerTank.TankCase , playerTank.x , playerTank.y , playerTank.width , playerTank.height);

    requestAnimationFrame(Render);
}

Render();
