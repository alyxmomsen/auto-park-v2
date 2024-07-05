export interface IUpdateRender {
	update(): void;
	render(): void;
}

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