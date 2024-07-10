import { MovementVelocity } from '../_MovementVelocity';
import { PlayerPostion } from '../_Player';
import { Position } from '../_Position';

interface IMovementState {
	px: number;
	py: number;
	vx: number;
	vy: number;
}

export class Movement {
	
	positionOfOrigin: Position;
	velocity: MovementVelocity;

	getCurrentState(): IMovementState {
		const { x:px, y:py } = this.positionOfOrigin.getPosition();
		const {x:vx , y:vy } = this.velocity.getState();
		return {
			px ,py , vx , vy
		}
	}

	getNextState() {
		const { x:px, y:py } = this.positionOfOrigin.getPosition();
		const {x:vx , y:vy } = this.velocity.getState();
		return {
			px:px + vx ,py:py+vy , vx , vy
		}
	}

	constructor({ position, velocity }: { position: Position; velocity: MovementVelocity }) {
		this.positionOfOrigin = position;
		this.velocity = velocity;
	}
}
