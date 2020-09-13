
import {canvas , ctx} from "../canvas.js";

export class Tank{
    constructor(x , y , speed , imgs = []){
        // inhert bullet form fire.js
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.SourceImges = imgs;
        this.FixedSize = 28;
        this.TankCase = this.SourceImges[0];
        this.TankCaseString = "top";
        this.width  = (window.innerWidth/this.FixedSize);
        this.height = (window.innerWidth/this.FixedSize);

       /* this.updatingReslution = () => {
            this.width  = (window.innerWidth/this.FixedSize);
            this.height = (window.innerHeight/this.FixedSize);
        };*/

        this.bullet = {
            img : "",
            x : this.x + this.width/2,
            y : this.y + this.height/2,
            size : 4,
            speed : 6
        };

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

                        this.bullet.y = this.y;

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

                        this.bullet.y = this.y;
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

                        this.bullet.x = this.x;
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

                        this.bullet.x = this.x;

                    }
                    return 0;
                }
                break;

            }
        }

        
    }
}

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
    }
}