export abstract class Combat {
	protected last: number;
	protected firerate: number;
	isReady(): boolean {
		const now = Date.now();
		const isReady = now - this.last > this.firerate;
		if (isReady) {
			this.last = now;
			return true;
		} else {
			return false;
		}
	}
	constructor(firerate: number) {
		this.firerate = firerate;
		this.last = 0;
	}
}

export class MinigunCombat extends Combat {
	constructor() {
		super(50);
	}
}

export class GunCombat extends Combat {
	constructor() {
		super(300);
	}
}

export class NoCombat extends Combat {
	isReady(): boolean {
		return false;
	}

	constructor() {
		super(Infinity);
	}
}
