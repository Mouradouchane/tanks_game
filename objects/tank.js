
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
        this.FixedSize = 40;
        this.TankCase = this.SourceImges[0];
        this.TankCaseString = "top";
        this.width  = this.FixedSize;
        this.height = this.FixedSize;
        this.isTankFire = false;
        this.Bullets = [];
        /* this.updatingReslution = () => {
            this.width  = (window.innerWidth/this.FixedSize);
            this.height = (window.innerHeight/this.FixedSize);
        };*/

        this.LastBullet = new Bullet(this.x + this.width/2, this.y + this.height/2, this.TankCaseString);

        this.MovingTank = (e = event) => {
            // glitch movment here
            switch (e.keyCode){

                // if "z" pressed
                case 122 : {
                    this.TankCase = this.SourceImges[0];
                    this.TankCaseString = "top";
                    if(this.y >= 0){
                        this.y -= this.speed;
                        this.x -= 0;

                        this.LastBullet.y = this.y;

                    }
                    return 0;
                        
                } 
                break;
                
                // if "s" pressed
                case 115 : {
                    this.TankCase = this.SourceImges[1];
                    this.TankCaseString = "down";

                    if(this.y <= (canvas.height - this.height) ){
                        this.y += this.speed;
                        this.x += 0;

                        this.LastBullet.y = this.y;
                    }
                    return 0;

                }
                break;
                
                // if "q" pressed
                case 113 : {
                    this.TankCase = this.SourceImges[2];
                    this.TankCaseString = "left";

                    if(this.x >= 0 ){
                        this.y += 0;
                        this.x -= this.speed;

                        this.LastBullet.x = this.x;
                    }
                    return 0;
                }
                break;

                // if "d" pressed
                case 100 : {
                    this.TankCase = this.SourceImges[3];
                    this.TankCaseString = "right";

                    if(this.x <= (canvas.width - this.width) ){
                        this.y += 0;
                        this.x += this.speed;

                        this.LastBullet.x = this.x;

                    }
                    return 0;
                }
                break;

            }
        }

        
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