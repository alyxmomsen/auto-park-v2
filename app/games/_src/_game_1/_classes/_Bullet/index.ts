import { AttackEntity } from '../_AttackEntity';
import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, NoCombat } from '../_Combat';
import { GameController } from '../_Controller';
import { Damage } from '../_Damage';
import { Entity } from '../_Entity';
import { BulletHealthBehavior as BulletHealthBehavior, Health } from '../_Health';
import { Position } from '../_Position';
import { RendererSingleton } from '../_Renderer';

export class Bullet extends AttackEntity {

	

	public collisionResolution(): void {}

	public ifCollissionTest(entity: Entity): boolean {
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
			new Damage(20)
		);

	}
}

export class BulletPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}
