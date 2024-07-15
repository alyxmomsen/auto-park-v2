import { Character } from '../_Character';
import { Color } from '../_Color';
import { GunCombat } from '../_Combat';
import { GameController } from '../_Controller';
import { Damage } from '../_Damage';
import { collisionBehavior, Entity } from '../_Entity';
import { Health, PlayerHealthBehavior } from '../_Health';
import { HitBox } from '../_HitBox';
import { Position } from '../_Position';
import { RendererSingleton } from '../_Renderer';

export class PlayerPostion extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Player extends Character implements collisionBehavior {
	//collisionBehavior
	setHealthWithCollisionBy(): void {
		
	}
	//collisionBehavior
	setVelocityWithCollisionBy(): void {
		
	}

	fireBehavior() {}

	public collisionResolution(entity: Entity): void {

		// this.health.applyDamage

		// this.health.

		// health
		// velocity

	}

	public ifCollissionByNextPositionWith(entity: Entity): boolean {

		const aRect = this.getNextPositionBoundingRect();
		const bRect = entity.getNextPositionBoundingRect();
		
		if (aRect.left <= bRect.right && aRect.right >= bRect.left && aRect.top <= bRect.bottom && aRect.bottom >= bRect.top) {
			
			return true;
		}
		else {

			return false;
		}

	}

	checkCollision({bottom , top , left , right,  entity}:{left:number , right:number , top:number , bottom:number , entity:Entity}): boolean {
		const entityRect = this.getNextPositionBoundingRect();
		
		if (left <= entityRect.right && right >= entityRect.left && top <= entityRect.bottom && bottom >= entityRect.top) {
			
			return true;
		}
		else {

			return false;
		}
	}

	protected beforeUpdated(): void {}

	protected afterUpdated(controller?: GameController): void { }

	//override 
	affectToExternalVelocity(): number {
		return 1;
	}

	//override 
    affectToExternalHealth(): number {
		return 1;
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
			'player',
			new Health(100, new PlayerHealthBehavior()),
			new Damage(10),
			new HitBox(50 , 50 , true)
		);

		this.setNoI(); // инкремент счетчика инстанций, для отладки
		// console.log(this.getNoI());
	}
}
