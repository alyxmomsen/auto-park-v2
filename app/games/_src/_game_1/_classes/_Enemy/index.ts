import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, GunCombat } from '../_Combat';
import { DebugEntity } from '../_DebugEntity';
import { Entity } from '../_Entity';
import { Position } from '../_Position';
import { Renderer } from '../_Renderer';

export class EnemyPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Enemy extends Character {
	private debugEntity: DebugEntity;
	renderDebug(ctx: CanvasRenderingContext2D, renderer: Renderer): void {
		this.debugEntity.render(ctx , renderer);
	}
	public setDebugEntityPosition(x: number, y: number): void {
		this.debugEntity.movement.positionOfOrigin.setPosition({x , y});
	}
	fireBehavior() {}
	constructor({ position: { x, y } }: { position: { x: number; y: number } }) {
		super(
			new EnemyPosition(x, y),
			{ width: 50, height: 50 },
			new Color('#379'),
			new GunCombat(),
			{
				x: 0,
				y: 0,
			},
			'enemy'
		);
		this.debugEntity = new DebugEntity({ position: {x:0 , y:0} });
	}
}
