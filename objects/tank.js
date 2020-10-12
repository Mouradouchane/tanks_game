
import {canvas} from "../canvas.js";

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
        /* this.updatingReslution = () => {
            this.width  = (window.innerWidth/this.FixedSize);
            this.height = (window.innerHeight/this.FixedSize);
        };*/

        this.LastBullet = new Bullet(this.x + this.width/2, this.y + this.height/2, this.TankCaseString);
        
        this.targetObject = {};
        this.collisionDetection = false;

        this.MovingTank = (e = event) => {
            // glitch movment here
            // glitch collision here
            switch (e.key){

                // if "z" pressed
                case "z" : {
                    this.TankCase = this.SourceImges[0];
                    this.TankCaseString = "top";
                   
                    if(!(this.x + this.size < this.targetObject.x) && !(this.x > this.targetObject.x + this.targetObject.size) && 
                    (this.y < this.targetObject.y + this.targetObject.size) && (this.y + this.size > this.targetObject.y + this.targetObject.size)){
                        this.y -= 0;
                    }
                    else this.y -= this.speed;
                    
                    this.LastBullet.y = this.y;
                    return 0;     
                } 
                break;
                
                // if "s" pressed
                case "s" : {
                    this.TankCase = this.SourceImges[1];
                    this.TankCaseString = "down";

                    if(!(this.x + this.size < this.targetObject.x) && !(this.x > this.targetObject.x + this.targetObject.size) && 
                    (this.y + this.size > this.targetObject.y) && (this.y + this.size < this.targetObject.y + this.targetObject.size)){
                        this.y += 0;
                    }
                    else this.y += this.speed;

                    this.LastBullet.y = this.y;
                    return 0;

                }
                break;
                
                // if "q" pressed
                case "q" : {
                    this.TankCase = this.SourceImges[2];
                    this.TankCaseString = "left";

                    if(!(this.y + this.size < this.targetObject.y) && !(this.y > this.targetObject.y + this.targetObject.size) && 
                    (this.x < this.targetObject.x + this.targetObject.size) && (this.x > this.targetObject.x)){
                    this.x -= 0;
                    }
                    else this.x -= this.speed;

                    this.LastBullet.x = this.x;
                    return 0;
                }
                break;

                // if "d" pressed
                case "d" : {
                    this.TankCase = this.SourceImges[3];
                    this.TankCaseString = "right";

                    if(!(this.y + this.size < this.targetObject.y) && !(this.y > this.targetObject.y + this.targetObject.size) && 
                    (this.x + this.size > this.targetObject.x) && (this.x < this.targetObject.x + this.targetObject.size)){
                        this.x += 0;
                    }
                    else this.x += this.speed;

                    this.LastBullet.x = this.x;
                    return 0;
                }
                break;

            }
        };

        this.collision = (cobj = {}) => {
            // if( this.x > cobj.x + cobj.size && this.x + this.size < cobj.x &&
            //     this.y > cobj.y + cobj.size && this.y + this.size < cobj.y ){
            if( this.x + this.size > cobj.x && this.x < cobj.x + cobj.size &&
                this.y + this.size > cobj.y && this.y < cobj.y + cobj.size ){
    
                this.collisionDetection = true;
                this.targetObject = cobj;
                
                return true;
            }
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
        this.movingBulletWithDirection =  () => {
            switch(this.direction){

                case "top"   : this.y -= this.speed; break;
                case "down"  : this.y += this.speed; break;
                case "left"  : this.x -= this.speed; break;
                case "right" : this.x += this.speed; break;
                
            }
        };
        this.isOutOfCanvas = () =>{
            let BOOL = false;

            // checking x
            if(this.x < 0){
                BOOL = true;
            }
            else if(this.x > canvas.width){
                BOOL = true;
            }

            // checking y
             if(this.y < 0){
                BOOL = true;
            }
            else if(this.y > canvas.height){
                BOOL = true;
            }

            return BOOL;
        };
    }
}