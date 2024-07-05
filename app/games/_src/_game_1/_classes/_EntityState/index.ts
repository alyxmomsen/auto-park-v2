import { MovingX, MovingY } from '../../types';

export class EntityState {
	protected moving: [MovingX, MovingY];
	getState() {
		return this.moving;
	}

	setState(x: MovingX, y: MovingY) {
		this.moving = [x, y];
	}
	constructor() {
		this.moving = [MovingX.NULL, MovingY.NULL];
	}
}
