export class KeyObserver {
	private keys: string[];
	private static instance: KeyObserver | null = null;

	setKey(key: string) {
		if (!this.keys.includes(key)) {
			this.keys = [...this.keys, key];
		}
	}

	removeKey(key: string) {
		this.keys = [...this.keys.filter((elem) => elem !== key)];
	}

	reset() {
		this.keys = [];
	}

	isTheKeySet(key: string) {
		this.keys.includes(key);
	}

	getAllKeys() {
		return [...this.keys];
	}

	public static getInstance() {
		if (KeyObserver.instance === null) {
			KeyObserver.instance = new KeyObserver();
		}

		return KeyObserver.instance;
	}

	private constructor() {
		this.keys = [];
	}
}
