import { IDimensions } from '../../types';
import { Collider, IBoundingRectangle } from '../_Collider';
import { Color } from '../_Color';
import { Combat, GunCombat, MinigunCombat, NoCombat } from '../_Combat';
import { GameController } from '../_Controller';
import { Damage } from '../_Damage';

import { Dimensions } from '../_Dimensions';
import { EntityState } from '../_EntityState';
import { Health } from '../_Health';
import { HitBox } from '../_HitBox';
import { Movement } from '../_Movement';
import { MovementVelocity } from '../_MovementVelocity';
import { Position } from '../_Position';
import { Query } from '../_Query';
import { RendererSingleton } from '../_Renderer';

export interface collisionBehavior {
	setHealthWithCollisionBy(): void,
	setVelocityWithCollisionBy():void,
}

export interface IAffectByCollision {
	affectToExternalVelocity(): number;
	affectToExternalHealth(): number;
}

export interface IEntityProperties {
	left: number;
	right: number;
	top: number;
	bottom: number;
	width: number;
	height: number;
	velocityX: number;
	velocityY: number;
	subject: Entity;
	vectorModule: number;
	vectorAngle: number;
}

export interface ICollisionResolutionBehavior {
	collisionResolution(entity: Entity): void;
}

export interface ICollisionProcessing {
	ifCollissionByNextPositionWith(entity: Entity): boolean;
	checkCollision({bottom , top , left , right,  entity}:{left:number , right:number , top:number , bottom:number , entity:Entity}): boolean;
}

export abstract class Entity implements ICollisionResolutionBehavior, ICollisionProcessing,  IAffectByCollision {
	public collider: Collider;
	private static numberOfInstncies: number = 0;
	protected title: string;
	public damage: Damage;
	public health: Health;
	protected armor: string = '';
	protected mass: number = 100;

	public movement: Movement;

	// public dimensions: Dimensions;
	public color: Color;
	public state: EntityState;

	public hitBox: HitBox;

	public combat: Combat;
	private combatVariants: Combat[];

	abstract collisionResolution(entity: Entity): void;

	// override
	abstract ifCollissionByNextPositionWith(entity: Entity): boolean;

	// override
	abstract checkCollision({bottom , top , left , right,  entity}:{left:number , right:number , top:number , bottom:number , entity:Entity}): boolean;

	abstract affectToExternalVelocity(): number;
	abstract affectToExternalHealth(): number;


	getBoundingRect(): IBoundingRectangle {
		const {width , height } = this.hitBox.getDimensions();
		const {px:x , py:y } = this.movement.getCurrentState();
		return {
			left: x,
			right: x + width,
			top: y,
			bottom:y + height ,
		}
	}

	getNextPositionBoundingRect(): IBoundingRectangle {
		const {width , height } = this.hitBox.getDimensions();
		const { px: x, py: y } = this.movement.getCurrentState();
		const {x:vx , y:vy } = this.movement.velocity.getXY();
		return {
			left: x + vx,
			right: x + vx + width,
			top: y + vy,
			bottom:y + vy + height ,
		}
	}

	public setNoI() {
		Entity.numberOfInstncies += 1;
	}

	public getNoI() {
		return Entity.numberOfInstncies;
	}

	public getTitle() {
		return this.title;
	}

	private setCombat() {
		if (this.combatVariants.length) {
			this.combat = this.combatVariants[this.combatVariants.length - 1];
		}
	}

	public changeCombat() {
		if (this.combatVariants.length) {
			if (this.combatVariants.length > 1) {
				const spliced = this.combatVariants.splice(0, 1);

				this.combatVariants = [...this.combatVariants, ...spliced];
				this.setCombat();
			}
		}
	}

	public addCombat() {}

	private updatePositionByVelocity() {
		const { x, y } = this.movement.positionOfOrigin.getPosition();
		const { x: vX, y: vY } = this.movement.velocity.getXY();
		this.movement.positionOfOrigin.setPosition({ x: x + vX, y: y + vY });
	}

	//move up === increment velocity
	public moveUp() {
		this.movement.velocity.decrement('y');
	}
	public moveDown() {
		this.movement.velocity.increment('y');
	}
	public moveLeft() {
		this.movement.velocity.decrement('x');
	}
	public moveRight() {
		this.movement.velocity.increment('x');
	}
	//fire === ???
	public fire() {}

	abstract fireBehavior(): void;

	protected abstract beforeUpdated(): void;
	protected abstract afterUpdated(controller?: GameController): void;



	public update(
		entities: (ICollisionResolutionBehavior & ICollisionProcessing & Entity)[],
		controller?: GameController
	) {
		/* --- */

		this.beforeUpdated();

		/* --- */

		entities.forEach((entity) => {
			if (this.ifCollissionByNextPositionWith(entity)) {

				if (this.hitBox.isRigidBody() && !entity.hitBox.isRigidBody()) {

				
					
				}

				// set a object position
				//set b object postition

				// this.collisionResolution(entity);
				// entity.collisionResolution(this);
			}
		});

		const health = this.health.get();
		// if(this.title === "player") console.log(health);

		this.updatePositionByVelocity();
		this.movement.velocity.collapseBy(0.95);

		/* --- */

		this.afterUpdated(controller);

		/* --- */
	}

	public render(ctx: CanvasRenderingContext2D, renderer: RendererSingleton) {
		// render hit box
		renderer.renderSquare(ctx, this);

		// render the if reload state
		renderer.renderText(ctx, this);

		// render health
		renderer.renderHealthState(ctx, this);
	}

	constructor(
		position: Position,
		hitBoxDimensions: IDimensions,
		color: Color,
		combat: Combat,
		movVel: { x: number; y: number },
		title: string,
		health: Health,
		damage: Damage,
		hitBox:HitBox,
	) {
		// this.dimensions = new Dimensions(hitBoxDimensions);
		this.color = color;
		this.state = new EntityState();
		this.combat = combat;
		this.combatVariants = [new NoCombat(), new MinigunCombat(), new GunCombat()];
		this.setCombat();
		this.title = title;
		this.movement = new Movement({
			position,
			velocity: new MovementVelocity(movVel.x, movVel.y),
		});
		this.health = health;
		this.damage = damage;
		this.collider = new Collider(this);
		this.hitBox = hitBox;
	}
}
