export class MovementVelocity {
	private x: number;
	private y: number;
	private delta: number = 0.2;

	getState() {
		const { x, y, delta } = this;
		return {
			x,
			y,
			delta,
		};
	}

	set(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	incrementBy(x: number, y: number) {
		this.x = this.x + x;
		this.y = this.y + y;
	}

	increment(axis: 'y' | 'x') {
		this[axis] = this[axis] + this.delta;
	}

	decrement(axis: 'x' | 'y') {
		this[axis] = this[axis] + -this.delta;
	}

	// must to renamed
	collapseBy(value: number) {
		if (value < 1 && value >= 0) {
			this.x = this.x * value;
			this.y = this.y * value;
		}
	}

	setXY() {}

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
