import {GAME} from "./game.js";
import {Tank , Defualt_TankImgSource} from "../objects/tank.js";
//import {grassGround} from "./objects/textuerGround.js";
//import {BuildBlock} from "./objects/blocks.js";
import {Bullet , BulletHitWallEffect} from "./objects/bullets.js";
import {MAP} from "./objects/maps.js";

// game object just for game deatils & telling us about game cases 
const game = new GAME();

// start & stop button just for testing how should we "stop//start" rendering in canvas
var [startButton , stopButton] = document.querySelectorAll(".testControlCanvas");

// target canvas in constant
export const canvas = document.querySelector("#gameCanvas");
const canvasBackground = document.querySelector("#canvasBackground"); // black background for canvas

// get context 2d for canvas usage "ctx"
export const ctx = canvas.getContext("2d");

// just new map for test
var defMap = new MAP(12,12);

// canvas background color 
var CanvasColorTerran  = "black";

ctx.fillStyle = CanvasColorTerran;
ctx.fillRect(0,0,canvas.width,canvas.height);

// defining player tank    
const playerTank = new Tank(158 , 158 , defMap.elements_Height ,4 , Defualt_TankImgSource);

      playerTank.mapelements = defMap.solidElement;
// to important events in movement 
// when user press movement key down or up we do something 
document.addEventListener("keydown" , playerTank.move);
document.addEventListener("keyup",(e = Event) => {
    playerTank.updateKeys(e.key , true);
});

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
            // ==== calc canvas resoultion as first step ====
            // calcGameResoultion return average size for each element in map for correct rendering 
let averageSizeForEachBlock = game.calcGameResoultion(defMap.width , defMap.height); 
            // ==== then fixing blur & low_graphics problem :) ====
            game.fixCanvasBlurProblem(); 

            defMap.elements_Height = averageSizeForEachBlock; // updating element size too
            defMap.elements_Width  = averageSizeForEachBlock; // updating element size too
            defMap.autoFillMap();

            // updating player tank too
            playerTank.setNewResoultion(averageSizeForEachBlock);
            playerTank.mapelements = defMap.solidElement;
            console.log( playerTank.mapelements )
            // make canvas visible in start
            canvas.style.display = "block";
            canvasBackground.style.display = "block";

            // switch game status important
            game.gameStatus = "playing";

            // responing player's in safe zone first 
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

        // clearing renderd frame for new frame :) 
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

// Render();


window.onresize = () => {
    console.log( defMap.solidElement);
    // in case user resize page we must calculating & updating resoultion for clean experince :)
    if(canvas.style.display == "block"){ // in case canvas visible then we updating resoultion 
        let averageSizeForEachBlock = game.calcGameResoultion(defMap.width , defMap.height);

        defMap.elements_Height = averageSizeForEachBlock; // updating element size too
        defMap.elements_Width  = averageSizeForEachBlock; // updating element size too

        playerTank.setNewResoultion(averageSizeForEachBlock); // updating player tank too

        game.fixCanvasBlurProblem();
    }
}