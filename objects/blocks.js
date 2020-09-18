import {ctx} from "../canvas.js";

const   NewBuildBlockIMG = new Image();
        NewBuildBlockIMG.src = "../Graphics/textures/BuildBlock.png";

export {NewBuildBlockIMG};

export class BuildBlock{
    constructor(blockImg = NewBuildBlockIMG , x = 200, y = 200){
        this.size = 50;
        this.x = x;
        this.y = y;
        this.blockImg = blockImg;
        this.height = this.size;
        this.width = this.size;
        this.render = () => {
            // draw block
            ctx.drawImage(this.blockImg , this.x , this.y , this.width , this.height);
        }
    }
}