export interface IDebugerShowBehevior {
	show(): void;
}

export abstract class Debugger implements IDebugerShowBehevior {
	abstract show(): void;
}
