import {ctx} from "../canvas.js";

const   NewBuildBlockIMG = new Image();
        NewBuildBlockIMG.src = "../Graphics/textures/BuildBlock.png";

export {NewBuildBlockIMG};

export class BuildBlock{
    constructor(x = 0, y = 0 , size = 50 , img = NewBuildBlockIMG){
        this.size = size;
        this.x = x;
        this.y = y;
        this.img = img;
        this.height = this.size;
        this.width = this.size;
        this.render = () => {
            // draw block
            ctx.drawImage(this.img , this.x , this.y , this.width , this.height);
        }
    }
}