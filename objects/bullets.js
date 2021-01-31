import {canvas , ctx} from "../canvas.js"

let bullet = new Image();
bullet.src = "../Graphics/Bullet.png";
export {bullet};

// this sounds used here  in Bullet constructor
const defultBulletShotSoundEffect = new Audio("../audio/bullet/BulletShotEffect2.mp3");
export const BulletHitWallEffect = new Audio("../audio/bullet/BulletHitWallEffect.mp3");

export class Bullet{
constructor(x,y,direction){
    // play shot sound with every new defult bullet pushed in terrian
    defultBulletShotSoundEffect.play();
    this.x = x;
    this.y = y;
    this.speed = 12;
    this.direction = direction;
    this.size = 5;
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
    };             // ArrayOfObjcts = all terrian objects
    this.collision = (ArrayOfBlocks = {}) =>{
        for(let block of ArrayOfBlocks){
            if( this.x + this.size > block.x && this.x < block.x + block.size &&
                this.y + this.size > block.y && this.y < block.y + block.size){
                    this.isCollision = true;
                    break;
            }
        }
    };
    // "like class tank" - this function for prevent player in terrain borders
    this.TerrainBordersCollision = () =>{

        // checking x
        if(this.x < 0 || this.x > canvas.width ) this.isCollision = true //, BulletHitWallEffect.play();

        // checking y
        if(this.y < 0 || this.y > canvas.height) this.isCollision = true //, BulletHitWallEffect.play();

    };
}
}