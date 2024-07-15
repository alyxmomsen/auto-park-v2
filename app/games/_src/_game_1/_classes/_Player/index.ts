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

		// const velocityDelta = entity.affectToExternalVelocity();
		const {x, y} = this.movement.velocity.getState();
		// const newVelocity = {x:x / velocityDelta , y:y / velocityDelta};
		// this.movement.velocity.set(newVelocity.x, newVelocity.y);

		const {x:evx , y:evy} = entity.movement.velocity.getState();
		console.log(JSON.stringify({ x: x - evx, y: y - evy }));
		
		const { x: epx, y: epy } = entity.movement.positionOfOrigin.getPosition();
		const { width , height} = this.hitBox.getDimensions();

		this.movement.positionOfOrigin.setPosition({x:epx - width , y:epy - height});

	}

	public ifCollissionTest(entity: Entity): boolean {
		return this.collider.test(entity);
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
			new Damage(10)
		);

		this.setNoI(); // инкремент счетчика инстанций, для отладки
		// console.log(this.getNoI());
	}
}
