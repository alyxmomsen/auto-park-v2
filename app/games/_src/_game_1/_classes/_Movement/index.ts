import { MovementVelocity } from "../_MovementVelocity";
import { PlayerPostion } from "../_Player";
import { Position } from "../_Position";

export class Movement {

    // private nextPosition
    positionOfOrigin: Position;
    velocity: MovementVelocity;

    getNextPositionByVelocity() {

        const {x:pX , y:pY} = this.positionOfOrigin.getPosition();
        const { x: vX, y: vY } = this.velocity.getState();
        

        return {
            x: pX + vX,
            y: pY + vY ,
        } 
    }

    constructor({position , velocity}:{
        position: Position;
        velocity: MovementVelocity;
    }) {
        this.positionOfOrigin = position;
        this.velocity = velocity;
    }
}