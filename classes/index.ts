interface Tool {
	draw: (value: number) => boolean;
	reset: () => void;
}

class BaseClass {
	x: number;
	y: number;

	constructor() {
		this.x = 1;
		this.y = 2;
	}
}

class MyClass extends BaseClass implements Tool {
	draw: (value: number) => boolean;
	reset: () => void;

	setTool(tool: Tool) {
		this.draw = tool.draw;
		this.reset = tool.reset;
	}

	constructor(mtds: Tool) {
		super();
		this.draw = mtds.draw;
		this.reset = mtds.reset;
	}
}

function draw(n: number): boolean {
	if (n > 0) {
		console.log('draw 1');
		return true;
	} else {
		console.log('draw 2');
		return false;
	}
}

function reset(this: MyClass): void {
	this.x = 0;
	this.y = 0;

	console.log('reset all');
	return undefined;
}

export function doit(): void {
	const classinstance = new MyClass({
		draw,
		reset,
	});

	classinstance.draw(2);
	classinstance.draw(0);
	classinstance.reset();

	return;
}
