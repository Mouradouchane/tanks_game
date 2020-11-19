
import {canvas , ctx} from "../canvas.js";

// top          // down     // left         // right
const Defualt_TankImgSource = [new Image() , new Image() , new Image() , new Image()] ;
      Defualt_TankImgSource[0].src = "../Graphics/defultTankImgTop.png";
      Defualt_TankImgSource[1].src = "../Graphics/defultTankImgDown.png";
      Defualt_TankImgSource[2].src = "../Graphics/defultTankImgLeft.png";
      Defualt_TankImgSource[3].src = "../Graphics/defultTankImgRight.png";
                
export {Defualt_TankImgSource};

export class Tank{
constructor(x , y , speed = 4, imgs = []){
    // inhert bullet form fire.js
    this.speed = speed;
    this.x = x;
    this.y = y;
    // array of tank images
    this.SourceImges = imgs;
    this.size = 50;
    this.TankCase = this.SourceImges[0];
    this.TankCaseString = "top";
    this.width  = this.size;
    this.height = this.size;
    this.isTankFire = false;
    this.Bullets = [];
    this.LastBullet = new Bullet(this.x + this.width/2, this.y + this.height/2, this.TankCaseString);
    
    // safe Doistance when we check collision detection
    this.safeD = 1;
    // value used by ropsitionTank function 
    this.respositionValue = 2;

    this.collisionDetection = false;
    this.collisionDetectionDir = null;
    this.targetObject = {};

    this.render = () => {
        ctx.drawImage(this.TankCase ,this.x , this.y , this.width , this.height);
    };

    this.repositionTank = () =>{
        switch(this.collisionDetectionDir){
            case "top"  : this.y -= this.respositionValue , this.collisionDetection = false; break;
            case "down" : this.y += this.respositionValue , this.collisionDetection = false; break;
            case "left" : this.x -= this.respositionValue , this.collisionDetection = false; break;
            case "right": this.x += this.respositionValue , this.collisionDetection = false; break;
        };
        this.collisionDetectionDir = null;
    };

    this.move = (e = event) => {
        if(this.collisionDetection){
            this.repositionTank();
        }
        else {
            // glitch movment here
            switch (e.key){
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

    this.collision = (cobj = {}) => {
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
                    console.log("left"); 
                    return this.collisionDetection;
                }
                //if(this.x - this.safeD <= cobj.x + cobj.size ){
                if(this.x + this.safeD > (cobj.x + (cobj.size/2))){
                    this.collisionDetectionDir = "right";
                    console.log("right"); 
                    return this.collisionDetection;
                } 
            }
            if( (this.x > cobj.x || this.x + this.size > cobj.x) && this.x < cobj.x + cobj.size){
                //if( (this.y + this.size + this.safeD) > cobj.y && this.y + this.size + this.safeD < (cobj.y + (cobj.size/2))){
                if(this.y < cobj.y && (this.y < cobj.y + cobj.size)){
                    this.collisionDetectionDir = "top";
                    console.log("top");
                    return this.collisionDetection;
                }                     // + 1 for fix 
                //if( this.y - (this.safeD + 1) < cobj.y + cobj.size + this.safeD){
                if(this.y + this.size + this.safeD > cobj.y + (cobj.size)){ 
                    this.collisionDetectionDir = "down";
                    console.log("down");
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
}
}

let bullet = new Image();
    bullet.src = "../Graphics/Bullet.png";

export {bullet};

export class Bullet{
    constructor(x,y,direction){
        this.x = x;
        this.y = y;
        this.speed = 8;
        this.direction = direction;
        this.size = 4;
        this.isCollision = false;

        this.render = () =>{
            ctx.drawImage(bullet ,  this.x ,  this.y ,  this.size ,  this.size);    
        };

        this.movingBulletWithDirection =  () => {
            switch(this.direction){

                case "top"   : this.y -= this.speed; break;
                case "down"  : this.y += this.speed; break;
                case "left"  : this.x -= this.speed; break;
                case "right" : this.x += this.speed; break;
                
            }
        };             // tobj = target object
        this.collision = (tobj = {}) =>{

            if( this.x + this.size > tobj.x && this.x < tobj.x + tobj.size &&
                this.y + this.size > tobj.y && this.y < tobj.y + tobj.size){
                    this.isCollision = true;
            }
            return this.isCollision;
        };
        this.isOutOfCanvas = () =>{
            let BOOL = false;

            // checking x
            if(this.x < 0) BOOL = true;
            else if(this.x > canvas.width)  BOOL = true;

            // checking y
            if(this.y < 0) BOOL = true;
            else if(this.y > canvas.height) BOOL = true;

            this.isCollision = true;
            return BOOL;
        };
    }
}