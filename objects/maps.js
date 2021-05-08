import {ctx} from "../canvas.js";

// class for map elements
class mapElment{
    constructor(x,y,type = "bg"){
        this.x = x;
        this.y = y;
        this.type = type;
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

        if(autoFill){
            // === fill elements by "dg" defualt ground as first step :) ===
            
            // fill in height by using empty array in each time 
            for(let h = 0; h < this.height ; h += 1){
                this.elements.push([]);
                
                // fill in width "dg" value in each array
                for(let w = 0 ; w < this.width ; w += 1){
                    this.elements[h][w] = new mapElment(w,h,"bg");
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

        // this function for "rendering/drawing" each map element in canvas
        this.render = (avgSize = 10) =>{
            for(let h = 0; h < this.elements.length ; h += 1){
                avgSize+=avgSize;
                for(let w = 0 ; w < this.elements[h].length ; w += 1){
                   if(this.elements[h][w] == "bg") ctx.drawImage("../Graphics/textures/grassGround.png" ,
                   w+avgSize,h);
                }
            }  
        };
    }
}

