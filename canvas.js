import {GAME} from "./game.js";
import {Tank , Defualt_TankImgSource} from "../objects/tank.js";
import {grassGround} from "./objects/textuerGround.js";
import {BuildBlock} from "./objects/blocks.js";
import {Bullet , BulletHitWallEffect} from "./objects/bullets.js";
import {MAP} from "./objects/maps.js";

// game object just for game sitting & telling us about game cases 
const game = new GAME();

// start & stop button just for testing how should we "stop//start" rendering in canvas
var [startButton , stopButton] = document.querySelectorAll(".testControlCanvas");

// target canvas in constant
export const canvas = document.querySelector("#gameCanvas");
const canvasBackground = document.querySelector("#canvasBackground"); // black background for canvas

// get context 2d for canvas usage "ctx"
export const ctx = canvas.getContext("2d");

// just new map for test
var defMap = new MAP(12,18);

// ==== calc canvas resoultion as first step ====
defMap.calcElementsHW(); 
defMap.upDateCanvasResoultion();

game.fixCanvasBlurProblem(); // fixing blur & low_graphics problem :)

// canvas background color 
var CanvasColorTerran  = "black";

ctx.fillStyle = CanvasColorTerran;
ctx.fillRect(0,0,canvas.width,canvas.height);

// defining player tank    
const playerTank = new Tank(100 , 150 , defMap.elements_Height ,4 , Defualt_TankImgSource);

document.addEventListener("keypress" , playerTank.move);

// auto reload for next shot every '?/ms' depend tankShotingDelay proprty in 'tank class'
let shotTime = setInterval( _ =>{
    playerTank.shotAccess = true;
}, playerTank.tankShotingDelay);

// CLICK EVENT FOR SHOTTING 
// when player click in canvas tank shot bullets
canvas.addEventListener("click" , function shotBullet() {
    switch(game.gameStatus){
        case "playing": playerTank.shot(); break;
        
        case "stoping":
        default : return null;
    }
});

let fpsControl = setInterval(() => {
    game.upDatingFPS();
} , 1000);

// adding clicks events in "start//stop" buttons for "start//stop" rendering in canvas

// == start rendering function ==
startButton.addEventListener("click" , function(){
    switch(game.gameStatus){
        // in case game stoping we switch it to playing & start new game
        case "stoping":
            // game status important
            game.gameStatus = "playing";

            // make canvas visible in start
            canvas.style.display = "block";
            canvasBackground.style.display = "block";

            // responing in safe zone first 
            playerTank.responInSafeZone();
        
            // start rendering & storing Frame-ID in renderControl for stoping rendering if we want
            renderControl = requestAnimationFrame(Render);
        break;

        // in case playing & user press we do nothing because it's a "new game button" that illeagl action
        case "playing": default : return null; 
    }
});

// == stop rendering function ==
stopButton.addEventListener("click" , function(){
    switch(game.gameStatus){
    case "playing":
        // doing some stuff before stoping rendering like cleaning all bullets & this game-round stuff 
        game.gameStatus = "stoping";
        
        // make canvas invisible in stop
        canvas.style.display = "none";

        // clearining frame
        ctx.clearRect(0,0,canvas.width , canvas.height);

        // make array of bullets empty [] :)
        playerTank.Bullets = [];

        cancelAnimationFrame(renderControl);
    case "stoping" : default : return null;
    }
});

// this var for controlling rendering in canvas "start/stop"
var renderControl = null;

// main render function
export function Render(){
    // start rendering by cleaining old renderd frame 
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // shadow sitting
    ctx.shadowColor   = game.shadow.color ;
    ctx.shadowBlur    = game.shadow.blur ;
    ctx.shadowOffsetX = game.shadow.x ;
    ctx.shadowOffsetY = game.shadow.y ;

    // render map elements
    defMap.render();
  
    // ========= drawing border around tank as "kind of debuggin" =================
        /*
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.strokeRect(playerTank.x,playerTank.y, playerTank.width , playerTank.height);
        */
    
    // rendering bullets
    for(let i = 0 ; i < playerTank.Bullets.length ; i += 1){
        if(playerTank.Bullets[i] != null){
            //playerTank.Bullets[i].collision(ArrayOfBlocks);
            playerTank.Bullets[i].TerrainBordersCollision();
            
            // if bullet out of terran or collided some block just skip render & play sound of hit
            if(playerTank.Bullets[i].isCollision){
                BulletHitWallEffect.play();
                playerTank.Bullets[i] = null;
                continue;
            }
            else{
                playerTank.Bullets[i].movingBulletWithDirection();
                playerTank.Bullets[i].render();
            }
        }
    }

    /* rendering blocks
    for(let block of ArrayOfBlocks){      
        block.render();
        // collision player tank bettwen each block
        playerTank.collision(block);
    }
    */

    // Rendering Player Tank
    playerTank.render();
    // bad engine sound
    //playerTank.engine.soundLoop();
    
    // turn of shadow before drawing fps & frame
    ctx.shadowColor = "transparent";
    
    // drawing "shots/reload" delay UI
    playerTank.drawShotDelay();

    // FPS & FRAME 
    if(game.sitting.counterFPS)   game.fps += 1; game.drawFPS();
    if(game.sitting.counterFRAME) game.frame += 1; game.drawFRAME();

    renderControl = requestAnimationFrame(Render);
}

//Render();

window.onresize = () => {
        // average size of each block in game
    defMap.calcElementsHW();  
        // after calc avg size the we update canvas resoultion 
    defMap.upDateCanvasResoultion();
}