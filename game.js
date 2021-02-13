// game moduel for dealing with all game things & stuff as "sitting" :) 
import {ctx} from "./canvas.js";

// for making game-object 
export class GAME{
    constructor(){
        this.gameStatus = "playing";

        this.sitting = {
            counterFPS   : true,
            counterFRAME : true,
        };

        this.fps = 0;
        this.frame = 0;

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
        
    }
}

// startButton.addEventListener("click" , game.start_AnimationFrame);
// stopButton.addEventListener("click" , game.stop_AnimationFrame);