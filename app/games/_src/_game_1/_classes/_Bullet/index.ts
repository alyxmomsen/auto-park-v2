import { AttackEntity } from '../_AttackEntity';
import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, NoCombat } from '../_Combat';
import { GameController } from '../_Controller';
import { Damage } from '../_Damage';
import { DebugEntity } from '../_DebugEntity';
import { Entity } from '../_Entity';
import { BulletHealthBehavior as BulletHealthBehavior, Health } from '../_Health';
import { Position } from '../_Position';
import { RendererSingleton } from '../_Renderer';

export class Bullet extends AttackEntity {
	private debugEntity: DebugEntity;
	renderDebug(ctx: CanvasRenderingContext2D, renderer: RendererSingleton): void {
		// this.debugEntity.render(ctx , renderer);
	}
	public setDebugEntityPosition(x: number, y: number): void {
		// this.debugEntity.movement.positionOfOrigin.setPosition({x , y});
	}

	public collisionResolution(): void {
		
	}

	public ifCollissionTest(entity: Entity): boolean {
		return false;
	}

	fireBehavior(): void { }
	
	protected afterUpdated(controller?:GameController): void {
		
	}

	protected beforeUpdated(): void {
		
	}

	constructor(position: { x: number; y: number }, movVelo: { x: number; y: number }) {
		super(
			new BulletPosition(position.x, position.y),
			{ width: 25, height: 25 },
			new Color(/* '#9c3278' */),
			new NoCombat(),
			movVelo,
			'bullet',
			new Health(100, new BulletHealthBehavior()),
			new Damage(20),
		);
		this.debugEntity = new DebugEntity({ position: { x: 0, y: 0 } });
	}
}

export class BulletPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}
