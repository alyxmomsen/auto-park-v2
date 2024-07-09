import { Character } from '../_Character';
import { Color } from '../_Color';
import { GunCombat } from '../_Combat';
import { Position } from '../_Position';
import { Renderer } from '../_Renderer';

export class PlayerPostion extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Player extends Character {
	fireBehavior() { }
	public renderDebug(ctx: CanvasRenderingContext2D, renderer: Renderer): void {
		
	}
	public setDebugEntityPosition(x: number, y: number): void {
		
	}
	
	constructor({ position }: { position: { x: number; y: number } }) {
		super(
			new PlayerPostion(position.x, position.y),
			{ width: 50, height: 50 },
			new Color('#2a2869'),
			new GunCombat(),
			{
				x: 0,
				y: 0,
			},
			'player'
		);

		this.setNoI(); // инкремент счетчика инстанций, для отладки
		console.log(this.getNoI());
	}
}
