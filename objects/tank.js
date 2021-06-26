
import {ctx, canvas} from "../canvas.js";
import {Bullet} from "../objects/bullets.js"

// top          // down     // left         // right
const Defualt_TankImgSource = [new Image() , new Image() , new Image() , new Image()] ;
      Defualt_TankImgSource[0].src = "../Graphics/defultTankImgTop.png";
      Defualt_TankImgSource[1].src = "../Graphics/defultTankImgDown.png";
      Defualt_TankImgSource[2].src = "../Graphics/defultTankImgLeft.png";
      Defualt_TankImgSource[3].src = "../Graphics/defultTankImgRight.png";
                
export {Defualt_TankImgSource};

export class Tank{
constructor(x = 150, y = 200 , size = 50 ,speed = 4, imgs = []){
    // inhert bullet form fire.js
    this.speed = speed;
    this.x = x;
    this.y = y;
    // lasy X Y for collision detection staff 
    this.lastX = x;
    this.lastY = y;
    // array of tank images
    this.SourceImges = imgs;
    this.size = size;
    this.TankCase = this.SourceImges[0];
    this.TankCaseString = "top";
    this.width  = this.size;
    this.height = this.size;
    this.isTankFire = false;
    // array of all bullets in scene
    this.Bullets = [];
    // shot delay by milliseconds
    this.tankShotingDelay = 1500;
    this.avalibleShots = 2;
    this.maxAvalibleShots = 2;
    this.shotAccess = true;
    this.LastBullet = new Bullet(this.x + this.width/2, this.y + this.height/2, this.TankCaseString);
    this.collisionSound = new Audio("../audio/tank/collisionSound.mp3");

    // array take all solid objects in map => for collision detection   
    this.mapelements = [];
    // reposition to safe distance when collision detection 
    this.safeD = 1;
    // value used by ropsitionTank function  
    this.respositionValue = 4;

    this.collisionDetection = false;
    this.collisionDetectionDir = null;
    this.targetObject = {};
    
    // reserverd movement keys 
    // keys object for "fixing multiple movement in same time 'BUG'"
    this.keys = {
        z : { name : 'z' , isPressed : false} , 
        s : { name : 's' , isPressed : false} ,
        d : { name : 'd' , isPressed : false} ,
        q : { name : 'q' , isPressed : false}  
    };

    // for updating values of all keys in keys object
    // important for "fixing multiple movement in same time 'BUG'"
    this.updateKeys = (pressed_key , isKeyUp = false) =>{
        //debugger
        let isTargetKey = false;
        
        // in case 'pressed key' is equal to one of 'key in keys' 
        // that mean pressed key is movement key
        // we need that in last 'if statement'
        if(pressed_key == "z") isTargetKey = true;
        if(pressed_key == "s") isTargetKey = true;
        if(pressed_key == "d") isTargetKey = true;
        if(pressed_key == "q") isTargetKey = true;

        // in case pressed key is valid key
        if(isTargetKey){
            // in KeyUp event we switch "pressed key" to false in keys object
            if(isKeyUp) this.keys[pressed_key].isPressed = false;
            // else that mean we are in KeyDown event sooo we switch "pressed key" to true in keys object
            else this.keys[pressed_key].isPressed = true;
        }
    }

    // function who use "updateKeys function" & check if multiple keys pressed in same time or not 
    // solution for "multiple movement in same time 'BUG'"
    this.isAnotherKeyStillPressed = (pressed_key) => {
        //debugger
        // update keys first
        this.updateKeys(pressed_key , false);

        // check if anyone is pressed and not equal to current pressed key
        // if that happen that mean multiple movement key pressed in same time soo return must be true
        if( this.keys.z.isPressed && this.keys.z.name != pressed_key ) return true;
        if( this.keys.s.isPressed && this.keys.s.name != pressed_key ) return true;
        if( this.keys.d.isPressed && this.keys.d.name != pressed_key ) return true;
        if( this.keys.q.isPressed && this.keys.q.name != pressed_key ) return true;

        // if not return false that mean there's no key still pressed :) 
        return false;
    }

    this.render = () => {   
        // debugging area of tank in render time !! 
        /*
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.x,this.y, this.width , this.height);
        */
        ctx.drawImage(this.TankCase ,this.x , this.y , this.width , this.height);
    };

    // for updating resoultion of tank in each update
    this.setNewResoultion = function(newSize = 0){
        // only 80% percent of map element 
        // for making 'active object' in map smaller than 'map element'
        let only_80_percent_of_size = (newSize * 80) / 100;
        this.size = only_80_percent_of_size;
        this.width = only_80_percent_of_size;
        this.height = only_80_percent_of_size;
    }

    // reposition Tank when collision detection
    this.repositionTank = () =>{
        // let call collision sound effect afeter reposition " HERE " 
        //this.collisionSound.play();

        switch(this.collisionDetectionDir){
            case "top"  : this.y -= this.respositionValue ,this.lastX = this.x , this.lastY = this.y , this.collisionDetection = false; break;
            case "down" : this.y += this.respositionValue ,this.lastX = this.x , this.lastY = this.y , this.collisionDetection = false; break;
            case "left" : this.x -= this.respositionValue ,this.lastX = this.x , this.lastY = this.y , this.collisionDetection = false; break;
            case "right": this.x += this.respositionValue ,this.lastX = this.x , this.lastY = this.y , this.collisionDetection = false; break;
        };
        this.collisionDetectionDir = null;
    };

    this.move = (e = Event) => {
        // check collision first 
        // debugger
        this.collision();
        this.TerrainBordersCollision();

        if(!this.isAnotherKeyStillPressed(e.key)){
            switch(e.key){
                case "r" : { 
                    this.y = 158 ; this.x = 158;
                    this.lastY = 158 ; this.lastX = 158; 
                } break;
                case "z" : {
                    this.TankCase = this.SourceImges[0];
                    this.TankCaseString = "top";
                    
                    this.y -= this.speed;
                    this.LastBullet.y = this.y;     

                } break;
                case "s" : {
                    this.TankCase = this.SourceImges[1];
                    this.TankCaseString = "down";
                    
                    this.y += this.speed;
                    this.LastBullet.y = this.y;
                } break;
                case "q" : {
                    this.TankCase = this.SourceImges[2];
                    this.TankCaseString = "left";
                    
                    this.x -= this.speed;
                    this.LastBullet.x = this.x;
                } break;
                case "d" : {
                    this.TankCase = this.SourceImges[3];
                    this.TankCaseString = "right";
                    
                    this.x += this.speed;
                    this.LastBullet.x = this.x;
                } break;
            }
        }
    };

    // this function for prevent player go out canvas borders
    this.TerrainBordersCollision = () =>{
        if(this.x + 2 <= 0){
            this.collisionDetectionDir = "right";
            this.repositionTank();
        }
        else if(this.x + this.size >=  canvas.width){
            this.collisionDetectionDir = "left";
            this.repositionTank();
        }
        else if(this.y + 2 <= 0){
            this.collisionDetectionDir = "down";
            this.repositionTank();
        }
        else if(this.y + this.size >= canvas.height){
            this.collisionDetectionDir = "top";
            this.repositionTank();
        }
    };


    // this function for general collision 
    // require array of object or "map elements"  
    this.collision = () => {
        // loop over all solid object in map & check one by one 
        //debugger
        for(let i = 0 ; i < this.mapelements.length ; i += 1){
        if( 
            this.x + this.size >= this.mapelements[i].x && this.x <= this.mapelements[i].x + this.mapelements[i].size &&
            this.y + this.size >= this.mapelements[i].y && this.y <= this.mapelements[i].y + this.mapelements[i].size 
        )   {
                this.x = this.lastX;
                this.y = this.lastY;
                return;
            }
        }
        this.lastX = this.x;
        this.lastY = this.y;
    };

    this.shot = () => {
        if(this.shotAccess){
            
        this.shotAccess = false;
    
        switch(this.TankCaseString){
            case "left":
            case "right":
                this.Bullets.push(new Bullet((this.x + this.height/2 + 6) , (this.y + this.width/2 + 3), this.TankCaseString));
                this.Bullets.push(new Bullet((this.x + this.height/2 + 6) , (this.y + this.width/2 - 8), this.TankCaseString));
            break;
            
            case "top":
            case "down":
                this.Bullets.push(new Bullet((this.x + this.height/2 + 4) , (this.y + this.width/2 + 3), this.TankCaseString));
                this.Bullets.push(new Bullet((this.x + this.height/2 - 9) , (this.y + this.width/2 + 3), this.TankCaseString));
            break;
        }

        }
    };

    // deatils for shoting delay in canvas + UI stuff 
    this.shotDelayValues = {
        x : 0 , 
        y : canvas.height - (this.height + 20),
        width : 200 , 
        height : 60 ,
        readyColor : "rgba(0,255,255,0.7)" ,
        readyText : "READY : ",
        reloadColor: "rgba(255,0,0,0.7)",
        relaodText : "RELOADING...",
        reloadTextcolor : "black",
    };
    this.drawShotDelay = () =>{
        if(this.shotAccess){
            // background
            ctx.fillStyle = this.shotDelayValues.readyColor;
            ctx.fillRect(this.shotDelayValues.x , this.shotDelayValues.y , this.shotDelayValues.width , this.shotDelayValues.height);
            
            // realoding text 
            ctx.fillStyle = this.shotDelayValues.reloadTextcolor;
            ctx.fillText(`${this.shotDelayValues.readyText} ${this.avalibleShots}` , this.shotDelayValues.x + 20 ,this.shotDelayValues.y + 40 , 160)
        }
        else {
            // background    
            ctx.fillStyle = this.shotDelayValues.reloadColor;
            ctx.fillRect(this.shotDelayValues.x , this.shotDelayValues.y , this.shotDelayValues.width , this.shotDelayValues.height);
            
            // realoding text 
            ctx.fillStyle = this.shotDelayValues.reloadTextcolor;
            ctx.fillText(this.shotDelayValues.relaodText , this.shotDelayValues.x + 20 ,this.shotDelayValues.y + 40 , 160)
        }
    };

    // just for making tank respon in safe zone if kind of glitches happen 
    this.responInSafeZone = () =>{
        this.x = 158 , this.y = 158;
        this.lastX = this.x , this.lastY = this.y;
        this.collisionDetectionDir = "top";
        this.TankCaseString = "top";
        this.TankCase = this.SourceImges[0];
    };

    // engine object for sound loop
    /*
    this.engine = {
        isEngineWork : true,
        sound : new Audio("../audio/tank/TankengineHeavyLoop.mp3"),
        soundLoop : () => {
            //this.engine.sound.contentEditable = true;
            this.engine.sound.volume = 0.1;
            if(this.engine.isEngineWork) this.engine.sound.play();
        }
    }
    */
}
}
