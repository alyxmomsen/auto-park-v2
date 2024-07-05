export class Color {
	private value: string;

	get() {
		return this.value;
	}

	set(value: string): string | false {
		const rgx = /^#[abcdef0123456789]{3,6}$/i;

		if (rgx.test(value)) {
			this.value = value;
			return this.value;
		} else {
			return false;
		}
	}

	constructor(value?: string) {
		if (value) {
			const defaultColor: string = '#000';
			const rgx = /^#[abcdef0123456789]{3,6}$/i;

			this.value = rgx.test(value) ? value : defaultColor;
		} else {
			let randomcolor = '#';
			const letters = '0123456789abcdef';
			while (randomcolor.length < 7) {
				randomcolor += letters[Math.floor(Math.random() * letters.length)];
			}

			this.value = randomcolor;
		}
	}
}
