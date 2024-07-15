import { AttackEntity } from '../_AttackEntity';
import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, NoCombat } from '../_Combat';
import { GameController } from '../_Controller';
import { Damage } from '../_Damage';
import { Entity } from '../_Entity';
import { BulletHealthBehavior as BulletHealthBehavior, Health } from '../_Health';
import { HitBox } from '../_HitBox';
import { Position } from '../_Position';
import { RendererSingleton } from '../_Renderer';

export class Bullet extends AttackEntity {

	affectToExternalVelocity(): number {
		return 1;
	}

	//override 
    affectToExternalHealth(): number {
		return 1.05;
	}

	public collisionResolution(): void {}

	public ifCollissionByNextPositionWith(entity: Entity): boolean {
		return false;
	}

	fireBehavior(): void {}

	protected afterUpdated(controller?: GameController): void {}

	protected beforeUpdated(): void {}

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
			new HitBox(25, 25 ,true) ,
		);

	}
}

export class BulletPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}
