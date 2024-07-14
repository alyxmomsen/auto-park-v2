import { Character } from '../_Character';
import { Color } from '../_Color';
import { GunCombat } from '../_Combat';
import { GameController } from '../_Controller';
import { Damage } from '../_Damage';
import { collisionBehavior, Entity } from '../_Entity';
import { Health, PlayerHealthBehavior } from '../_Health';
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
		
	}

	public ifCollissionTest(entity: Entity): boolean {
		return this.collider.test(entity);
	}

	protected beforeUpdated(): void {}

	protected afterUpdated(controller?: GameController): void {}

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
			new Damage(10)
		);

		this.setNoI(); // инкремент счетчика инстанций, для отладки
		// console.log(this.getNoI());
	}
}
