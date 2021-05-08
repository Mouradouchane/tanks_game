// game moduel for dealing with all game things & stuff as "sitting" :) 
import {canvas,ctx} from "./canvas.js";

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
        
        // this resloutions for check min & max resultion of any maps in game 
        this.standarResloutions = {
            min : 8,
            maxWidth : 32,
            maxHeight : 19
        };

        // this for fixing blur/low quality problem 
        this.fixCanvasBlurProblem = function(){
            let dpi = window.devicePixelRatio;
            
            let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
            let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
            
            canvas.setAttribute('height', style_height * dpi);
            canvas.setAttribute('width', style_width * dpi);
        };
    
    }
}

// startButton.addEventListener("click" , game.start_AnimationFrame);
// stopButton.addEventListener("click" , game.stop_AnimationFrame);