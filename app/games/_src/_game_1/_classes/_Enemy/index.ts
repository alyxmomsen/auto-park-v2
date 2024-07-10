import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, GunCombat } from '../_Combat';
import { Damage } from '../_Damage';
import { DebugEntity } from '../_DebugEntity';
import { Entity } from '../_Entity';
import { EnemyHealthBehavior, Health } from '../_Health';
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
		this.debugEntity.render(ctx, renderer);
	}

	public setDebugEntityPosition(x: number, y: number): void {
		this.debugEntity.movement.positionOfOrigin.setPosition({ x, y });
		this.debugEntity.color.set(new Color().get());
	}

	fireBehavior() { }
	
	public collisionResolution(entity: Entity): void {
		
	}

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
			'enemy',
			new Health(100, new EnemyHealthBehavior()),
			new Damage(10) ,
		);
		this.debugEntity = new DebugEntity({ position: { x: 0, y: 0 } });
	}
}
