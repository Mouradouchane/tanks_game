
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

    // safe Distance when we check collision detection 
    this.safeD = 1;
    // value used by ropsitionTank function  
    this.respositionValue = 2;

    this.collisionDetection = false;
    this.collisionDetectionDir = null;
    this.targetObject = {};

    this.render = () => {
        ctx.drawImage(this.TankCase ,this.x , this.y , this.width , this.height);
    };

    // reposition Tank when collision detection
    this.repositionTank = () =>{
        // let call collision sound effect afeter reposition " HERE " 
        this.collisionSound.play();

        switch(this.collisionDetectionDir){
            case "top"  : this.y -= this.respositionValue , this.collisionDetection = false; break;
            case "down" : this.y += this.respositionValue , this.collisionDetection = false; break;
            case "left" : this.x -= this.respositionValue , this.collisionDetection = false; break;
            case "right": this.x += this.respositionValue , this.collisionDetection = false; break;
        };
        this.collisionDetectionDir = null;
    };

    this.move = (e = Event) => {
        if(this.collisionDetection){
            // if tank glitch in block this for press r to teleport
            if(e.key == "r") this.y = 80 , this.x = 210 , this.collisionDetection = false;

            this.repositionTank();
        }
        else {
            // glitch movment here
            switch (e.key){
                case "r" :  this.y = 80 , this.x = 210 ;break;
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
    // this function for prevent player in terrain borders
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
    // required object for collision-detected  
    this.collision = (cobj = {}) => {
        this.TerrainBordersCollision();
        if( this.x + this.size + this.safeD > cobj.x && this.x - this.safeD < cobj.x + cobj.size &&
            this.y + this.size + this.safeD > cobj.y && this.y - this.safeD < cobj.y + cobj.size ){
            //debugger;
            this.collisionDetection = true;
            this.targetObject = cobj;

            /* checking where collision */
            // debugger;
            if( (this.y > cobj.y || this.y + this.size > cobj.y) && this.y < cobj.x + cobj.size){
                //if(this.x + this.size + this.safeD > cobj.x && this.x < cobj.x + cobj.size){ 
                if(this.x < cobj.x && this.x + this.size  + this.safeD< (cobj.x + (cobj.size / 2)) ){
                    this.collisionDetectionDir = "left";
                    //console.log("left"); 
                    return this.collisionDetection;
                }
                //if(this.x - this.safeD <= cobj.x + cobj.size ){
                if(this.x + this.safeD > (cobj.x + (cobj.size/2))){
                    this.collisionDetectionDir = "right";
                    //console.log("right"); 
                    return this.collisionDetection;
                } 
            }
            if( (this.x > cobj.x || this.x + this.size > cobj.x) && this.x < cobj.x + cobj.size){
                //if( (this.y + this.size + this.safeD) > cobj.y && this.y + this.size + this.safeD < (cobj.y + (cobj.size/2))){
                if(this.y < cobj.y && (this.y < cobj.y + cobj.size)){
                    this.collisionDetectionDir = "top";
                    //console.log("top");
                    return this.collisionDetection;
                }                     // + 1 for fix 
                //if( this.y - (this.safeD + 1) < cobj.y + cobj.size + this.safeD){
                if(this.y + this.size + this.safeD > cobj.y + (cobj.size)){ 
                    this.collisionDetectionDir = "down";
                    //console.log("down");
                    return this.collisionDetection;
                }  
        }
        else {
            /* this.collisionDetection = false;
            this.collisionDetectionDir = null;*/
            this.targetObject = cobj;
            return this.collisionDetection;
        }
    };

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
        this.x = 150 , this.y = 200;
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
