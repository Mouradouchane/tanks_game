import {canvas , ctx} from "../canvas.js"

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