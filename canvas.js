import {Tank , Bullet} from "../objects/tank.js";

function setCanvasInDom(){
    document.body.insertAdjacentHTML("afterbegin",`<canvas id="gameCanvas"> </canvas>`);
}

// this function just for printing canvas in dom :)
setCanvasInDom();

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

                    // top          // down     // left         // right
var TankImgSource = [new Image() , new Image() , new Image() , new Image()] ;

    TankImgSource[0].src = "../Graphics/defultTankImgTop.png";
    TankImgSource[1].src = "../Graphics/defultTankImgDown.png";
    TankImgSource[2].src = "../Graphics/defultTankImgLeft.png";
    TankImgSource[3].src = "../Graphics/defultTankImgRight.png";

const playerTank = new Tank(150 , 150 , 4 , TankImgSource);

document.addEventListener("keypress" , playerTank.MovingTank);

var isTankFire = false;

var bullet = new Image();
    bullet.src = "../Graphics/Bullet.png";

var bullets = [];

let RecentBullet = new Bullet(playerTank.x , playerTank.y , playerTank.TankCaseString);

canvas.addEventListener("click" , function shotBullet() {

    bullets.push(new Bullet((playerTank.x + playerTank.height/2) , (playerTank.y + playerTank.width/2), playerTank.TankCaseString));

});

function Animation(){
    
    // start animation
    ctx.clearRect(0,0,800,600);
    ctx.fillRect(0,0,800,600);
    
    ctx.drawImage(playerTank.TankCase , playerTank.x , playerTank.y , playerTank.width , playerTank.height);

    for(let i = 0 ; i < bullets.length ; i += 1){
        bullets[i].movingBulletWithDirection();
        ctx.drawImage(bullet ,  bullets[i].x ,  bullets[i].y ,  bullets[i].size ,  bullets[i].size);    
    }

    requestAnimationFrame(Animation);
}

Animation();

window.onresize = _ =>{
    playerTank.updatingReslution(); 
}