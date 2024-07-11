import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, GunCombat, MinigunCombat } from '../_Combat';
import { GameController } from '../_Controller';
import { Damage } from '../_Damage';
import { DebugEntity } from '../_DebugEntity';
import { Entity } from '../_Entity';
import { EnemyHealthBehavior, Health } from '../_Health';
import { Position } from '../_Position';
import { RendererSingleton } from '../_Renderer';

export class EnemyPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Enemy extends Character {
	private debugEntity: DebugEntity;
	renderDebug(ctx: CanvasRenderingContext2D, renderer: RendererSingleton): void {
		this.debugEntity.render(ctx, renderer);
	}

	public setDebugEntityPosition(x: number, y: number): void {
		this.debugEntity.movement.positionOfOrigin.setPosition({ x, y });
		this.debugEntity.color.set(new Color().get());
	}

	fireBehavior() { }

	protected afterUpdated(controller?:GameController): void {
		/* --- */
		// test
		// Math.floor(Math.random() * 2) && controller?.makeBullet(this);
		
		const rand = () => Math.floor(Math.random() * 200)
		
		switch (rand()) {
			case 0:
				this.moveLeft();
				break;
				case 1:
					this.moveUp();
					break;
					case 2:
						this.moveRight();
						break;
						case 3:
							this.moveDown();
							break;
						}
						
		/* --- */
	}

	protected beforeUpdated(): void {
		
	}
	
	public collisionResolution(entity: Entity): void {
		
		this.health.applyDamage(this , entity);
	}

	public ifCollissionTest(entity: Entity): boolean {

		const result = this.collider.test(entity);
		return result;
	}

	constructor({ position: { x, y } }: { position: { x: number; y: number } }) {
		super(
			new EnemyPosition(x, y),
			{ width: 50, height: 50 },
			new Color('#379'),
			new MinigunCombat(),
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
