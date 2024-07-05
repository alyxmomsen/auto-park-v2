export class Combat {
	private last: number;
	private firerate: number;
	isReady(): boolean {
		const now = Date.now();
		const isReady = (now - this.last > this.firerate) ;
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