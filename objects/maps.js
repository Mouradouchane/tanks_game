
// class for make any map you want to make
export class MAP{
    constructor(mapHeight = 8, mapWidth = 8){
                      // check if height between 8 and 19
        this.height = mapHeight < 8 ? mapHeight = 8 : mapHeight > 19 ? mapHeight = 19 : mapHeight;
                      // check if width between 8 and 32
        this.width  = mapWidth < 8 ? mapWidth = 8 : mapWidth > 32 ? mapWidth = 32 : mapWidth;
        
        // empty array in height & width "not fill yet"
        this.Elements = [];

        // === fill Elements by "dg" defualt ground as first step :) ===

        // fill in height by using empty array in each time 
        for(let h = 0; h < this.height ; h += 1){
            this.Elements.push([]);

            // fill in width "dg" value in each array
            for(let w = 0 ; w < this.width ; w += 1){
                this.Elements[h][w] = "dg";
            }
        };

        this.setNewElements = () =>{

        };     
    }
}