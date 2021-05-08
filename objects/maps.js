import {canvas, ctx} from "../canvas.js";

// class for map elements
class mapElment{
    constructor(x,y,type = "bg"){
        this.x = x;
        this.y = y;
        this.type = type;
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

        // check if height of map between 8 and 19
        this.height = mapHeight < 8 ? 8 : mapHeight > 19 ? 19 : mapHeight;
    
        // check if width of map between 8 and 32
        this.width  = mapWidth < 8 ? mapWidth = 8 : mapWidth > 32 ? mapWidth = 32 : mapWidth;
        
        this.elements_Height = null;
        this.elements_Width = null;

        // calc average height & width of each element in game & save values in elements_Height/Width 
        this.calcElementsHW = function(){
            this.elements_Height = Math.floor( window.innerHeight / this.height );
            this.elements_Width  = Math.floor( window.innerWidth  / this.width  );
        };

        // function work in each resize to updating canvas resoultion
        this.upDateCanvasResoultion = function(){
            canvas.style.height = (this.height * this.elements_Height) + "px";
            canvas.style.width  = (this.width  * this.elements_Width) + "px";
        };

        if(autoFill){
            // === fill elements by "dg" defualt ground as first step :) ===
            
            // fill in height by using empty array in each time 
            for(let h = 0; h < this.height ; h += 1){
                this.elements.push([]);
                
                // fill in width "dg" value in each array
                for(let w = 0 ; w < this.width ; w += 1){
                    this.elements[h][w] = new mapElment(h*this.elements_Width,w*this.elements_Height,"bg");
                }
            };      
        };

        // in case we need to make some edits in map 
        /*
        this.fillMap = (ArrayAsNewMap = []) =>{
            if(arr.length === 0){ return null }
            else{
                for(let h = 0; h < ArrayAsNewMap.height ; h += 1){
                    if(Array.isArray(ArrayAsNewMap[h])){
                        this.elements[h] = ArrayAsNewMap[h];
                    }
                }
            }
        };   
        */  
        // just defualt ground texture for testing :) 
        this.defGround =  new Image(this.elements_Height,this.elements_Width);
        this.defGround.src = "../Graphics/textures/grassGround.png";

        // this function for "rendering/drawing" each "map element" in => canvas
        this.render = () =>{
            for(let h = 0; h < this.elements.length ; h += 1){
                for(let w = 0 ; w < this.elements[h].length ; w += 1){
                    ctx.drawImage(
                        this.defGround , 
                        w*this.elements_Width , 
                        h*this.elements_Height , 
                        this.elements_Width ,
                        this.elements_Height
                        );
                    //if(this.elements[h][w] == "bg")
                }
            }  
        };
    }
}

