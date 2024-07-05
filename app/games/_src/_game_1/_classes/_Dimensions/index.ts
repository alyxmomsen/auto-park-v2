import { IDimensions } from "../../types";

export class Dimensions {
	private width: number;
	private height: number;

	get() {
		return {
			width: this.width,
			height: this.height,
		};
	}

	constructor(dimensions: IDimensions) {
		this.width = dimensions.width;
		this.height = dimensions.height;
	}
}