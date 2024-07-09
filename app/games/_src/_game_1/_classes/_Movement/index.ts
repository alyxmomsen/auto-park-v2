import { MovementVelocity } from "../_MovementVelocity";
import { PlayerPostion } from "../_Player";
import { Position } from "../_Position";

export class Movement {

    // private nextPosition
    position: Position;
    velocity: MovementVelocity;

    constructor({position , velocity}:{
        position: Position;
        velocity: MovementVelocity;
    }) {
        this.position = position;
        this.velocity = velocity;
    }
}