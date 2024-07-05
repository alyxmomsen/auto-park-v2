import { IPosition } from "../../types";

export abstract class Position {
	private x: number;
	private y: number;

	getPosition() {
		return { x: this.x, y: this.y };
	}
	setPosition(position: IPosition) {
		this.x = position.x;
		this.y = position.y;
	}

	constructor(position: IPosition) {
		// this.position = { x: position.x, y: position.y };
		this.x = position.x;
		this.y = position.y;
	}
}