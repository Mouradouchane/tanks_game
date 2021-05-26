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
   
        // this function responsible for calcing perfect width & hegiht for all elements map
        this.calcGameResoultion = function(mapW = -1, mapH = -1){
            if( mapW == -1 || mapH == -1) throw new Error("invalid resoultion");
            //debugger
            let biggerSide = (mapW > mapH) ? mapW : mapH;
            let smallScreenSide = (window.innerHeight < window.innerWidth) ? window.innerHeight : window.innerWidth;

            let avgSize = Math.floor(smallScreenSide / biggerSide);

            canvas.style.width  = (avgSize * mapW) + "px";
            canvas.style.height = (avgSize * mapH) + "px";

            return avgSize;
        }

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