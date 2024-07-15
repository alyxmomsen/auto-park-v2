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

	calculateNextPositionByVelocity() {

		const { x:px , y:py } = this.positionOfOrigin.getPosition();
		const { x:vx , y:vy } = this.velocity.getXY();

		return {
			x: px + vx,
			y:py + vy ,
		}
	}

	calculateSpeed() {
		const { x, y } = this.velocity.getXY();

		const speed = Math.sqrt(x ** 2 + y ** 2);

		return speed;
	}

	getCurrentState(): IMovementState {
		const { x: px, y: py } = this.positionOfOrigin.getPosition();
		const { x: vx, y: vy } = this.velocity.getXY();
		return {
			px,
			py,
			vx,
			vy,
		};
	}

	getNextPosition() {
		const { x: px, y: py } = this.positionOfOrigin.getPosition();
		const { x: vx, y: vy } = this.velocity.getXY();
		return {
			x: px + vx,
			y: py + vy,
		};
	}

	constructor({ position, velocity }: { position: Position; velocity: MovementVelocity }) {
		this.positionOfOrigin = position;
		this.velocity = velocity;
	}
}
