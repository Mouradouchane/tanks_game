import {ctx} from "../canvas.js";
//import {GAME} from "../game.js";

// class for map elements
class mapElment{
    constructor(x,y,type = "bg"){
        this.x = x;
        this.y = y;
        this.size = 0;
        this.type = type;
        this.isSolid = false;
        this.texture  = null;
        this.addTexture = (source = "") =>{ // not finished part 
            this.texture = new Image();
            this.texture.src = source;
        };
    }
}

// class for make any map you want to make
export class MAP{
    constructor(mapHeight = 8, mapWidth = 8, autoFill = true){
        // empty array in height & width who take map "not fill yet"
        this.elements = [];

        // we need this object contain al solid object for making "collision detection" in game 
        this.solidElement =  [];
        
        // check if height of map between 8 and 19
        this.height = mapHeight < 8 ? 8 : mapHeight > 19 ? 19 : mapHeight;
    
        // check if width of map between 8 and 32
        this.width  = mapWidth < 8 ? mapWidth = 8 : mapWidth > 32 ? mapWidth = 32 : mapWidth;
        
        this.elements_Height = null;
        this.elements_Width = null;

        // if autoFill true 
        if(autoFill){
            let tempElement  = null;
            // === fill elements by "dg" defualt ground as first step :) ===
            for(let h = 0; h < this.height ; h += 1){
                this.elements.push([]); // push new row 'MAP 2D ARRAY OF ROW'S'
                // fill in width "dg" value in each array
                for(let w = 0 ; w < this.width ; w += 1){
                    if(w%2 == 0 && h%2 == 0){
                        tempElement = new mapElment(h*this.elements_Width,w*this.elements_Height,"bg");
                        tempElement.isSolid = true;
                        tempElement.size = this.elements_Height;
                        this.elements[h][w] = tempElement;
                        this.elements[h][w].addTexture("../Graphics/textures/BuildBlock.png");
                        this.solidElement.push(tempElement);
                    }
                    else{
                        this.elements[h][w] = new mapElment(h*this.elements_Width,w*this.elements_Height,"bg");
                        this.elements[h][w].addTexture("../Graphics/textures/grassGround.png");
                        //this.elements[h][w].addTexture("../Graphics/textures/BuildBlock.png");
                    }
                }; 

            };   

        };
   
        // just defualt ground texture for testing :) 
        this.defGround =  new Image(this.elements_Height,this.elements_Width);
        this.defGround.src = "../Graphics/textures/grassGround.png";

        // this function for "rendering/drawing" each "map element" in => canvas
        this.render = () =>{
            ctx.font = "10px tahoma";
            ctx.fillStyle= "yellow";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "rgb(0,255,0)";

            for(let h = 0; h < this.elements.length ; h += 1){
                for(let w = 0 ; w < this.elements[h].length ; w += 1){
                    ctx.drawImage(
                        this.elements[h][w].texture , 
                        w*this.elements_Width , 
                        h*this.elements_Height , 
                        this.elements_Width ,
                        this.elements_Height
                    );
                    // debugging map elements in render time
                    /*
                    ctx.strokeRect( 
                        w*this.elements_Width , 
                        h*this.elements_Height , 
                        this.elements_Width ,
                        this.elements_Height
                    );
                    */
                }
            }  
        };
    }
}

