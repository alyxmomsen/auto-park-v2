import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, NoCombat } from '../_Combat';
import { DebugEntity } from '../_DebugEntity';
import { Position } from '../_Position';
import { Renderer } from '../_Renderer';

export class Bullet extends Character {
	debugEntity: DebugEntity;
	renderDebug(ctx: CanvasRenderingContext2D, renderer: Renderer): void {
		this.debugEntity.render(ctx , renderer);
	}
	public setDebugEntityPosition(x: number, y: number): void {
		this.debugEntity.movement.positionOfOrigin.setPosition({x , y});
	}

	fireBehavior(): void {}

	constructor(position: { x: number; y: number }, movVelo: { x: number; y: number }) {
		super(
			new BulletPosition(position.x, position.y),
			{ width: 25, height: 25 },
			new Color(/* '#9c3278' */),
			new NoCombat(),
			movVelo,
			'bullet'
		);
		this.debugEntity = new DebugEntity({ position: {x:0 , y:0} });
	}
}

export class BulletPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
	
}
