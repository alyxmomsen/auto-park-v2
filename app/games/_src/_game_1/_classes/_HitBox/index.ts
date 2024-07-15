import { Dimensions } from "../_Dimensions";
import { Entity } from "../_Entity";

export class HitBox {
    private dimensions: Dimensions;
    private rigidBody: boolean;

    isRigidBody() {
        return this.rigidBody;    
    }

    getDimensions() {
        return this.dimensions.get();
    }

    constructor(width:number , height:number , rigidBody:boolean) {
        this.dimensions = new Dimensions({ width, height });
        this.rigidBody = rigidBody;
    }
}

const hb = new HitBox(100, 100 , true);


