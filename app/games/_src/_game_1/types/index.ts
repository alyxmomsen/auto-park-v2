export interface IPosition {
	x: number;
	y: number;
}

export enum MovingX {
	LEFT = -1,
	NULL,
	RIGHT,
}

export enum MovingY {
	UP = -1,
	NULL,
	DOWN,
}

export interface IDimensions {
	width: number;
	height: number;
}

export interface IEntityParams {
	position: {
		x: number;
		y: number;
	};
	dimensions: {
		width: number;
		height: number;
	};
	velocity: {
		x: number;
		y: number;
	};
}