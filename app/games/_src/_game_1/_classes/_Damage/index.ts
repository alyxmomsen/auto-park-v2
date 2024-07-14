export class Damage {
	private value: number;

	get() {
		return this.value;
	}

	constructor(value: number) {
		this.value = value;
	}
}
