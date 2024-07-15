import { Dimensions } from "../_Dimensions";

export class HitBox {
    private dimensions: Dimensions;

    getDimensions() {
        return this.dimensions.get();
    }

    constructor(width:number , height:number) {
        this.dimensions = new Dimensions({width , height});
    }
}

const hb = new HitBox(100, 100);


