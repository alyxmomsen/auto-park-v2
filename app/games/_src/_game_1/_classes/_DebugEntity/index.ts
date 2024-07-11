import { Character } from '../_Character';
import { Color } from '../_Color';
import { NoCombat } from '../_Combat';
import { Damage } from '../_Damage';
import { Entity } from '../_Entity';
import { NoHealthBehavior, Health } from '../_Health';
import { PlayerPostion } from '../_Player';
import { RendererSingleton } from '../_Renderer';

export interface IDebugEntity {
	renderDebug(ctx: CanvasRenderingContext2D, renderer: RendererSingleton): void;
	setDebugEntityPosition(x: number, y: number): void;
}

export class DebugEntity extends Character {
	renderDebug(ctx: CanvasRenderingContext2D, renderer: RendererSingleton): void {}

	public setDebugEntityPosition(x: number, y: number): void { }
	
	public collisionResolution(): void {
		
	}

	fireBehavior(): void {}
	constructor({ position }: { position: { x: number; y: number } }) {
		super(
			new PlayerPostion(position.x, position.y),
			{ width: 50, height: 50 },
			new Color('#999'),
			new NoCombat(),
			{
				x: 0,
				y: 0,
			},
			'debug_entity',
			new Health(100, new NoHealthBehavior()),
			new Damage(0),
		);

		this.setNoI(); // инкремент счетчика инстанций, для отладки
		// console.log(this.getNoI());
	}
}
