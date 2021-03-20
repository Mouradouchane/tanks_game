// game moduel for dealing with all game things & stuff as "sitting" :) 
import {canvas,ctx} from "./canvas.js";
import {MAP} from "./objects/maps.js";

let mp = new MAP(15,20);

// game object just conatins all "info/sitting" at the game
export class GAME{
    constructor(){
        this.gameStatus = "stoping";

        this.sitting = {
            counterFPS   : true,
            counterFRAME : true,
        };

        this.fps = 0;
        this.frame = 0;

        // shadow deatils 
        this.shadow = {
            color : "rgba(0,0,0,0.5)",
            blur : 0.1,
            y : 4,
            x : 0
        };

        this.drawFPS = () =>{
                ctx.font = "30px tahoma";
                ctx.fillStyle = "yellow";
                ctx.fillText("FPS : " + this.fps , 4 , 40);
        };

        this.drawFRAME = () =>{
            ctx.font = "30px tahoma";
            ctx.fillStyle = "yellow";
            ctx.fillText("FRAME : " + this.frame , 4 , 80);
        };

        this.upDatingFPS = function(){
            this.fps = this.frame;
            this.frame = 0;
        };
        
        // this resloutions for calcing min & max of any maps in game 
        this.standarResloutions = {
            min : 8,
            maxWidth : 32,
            maxHeight : 19
        };

        this.avgSize = null;

        this.calcAverageSizeOfBlocks = function(levelHeight = 0){
            // calc average size of each block 
            let avgValue = Math.floor( window.innerHeight / levelHeight );

            // save value in game object
            this.avgSize = avgValue;
            return avgValue;
        };

        this.calcEmptySpace_Height = function(levelHeight){
            // calc empty space and set value in top directlly 
            canvas.style.top = (window.innerHeight % levelHeight) / 2;
        };

        this.calcEmptySpace_Width = function(levelWidth){
            // calc empty space and set value in top directlly 
            canvas.style.left = (window.innerWidth % levelWidth) / 2;
        };
    }
}

// startButton.addEventListener("click" , game.start_AnimationFrame);
// stopButton.addEventListener("click" , game.stop_AnimationFrame);