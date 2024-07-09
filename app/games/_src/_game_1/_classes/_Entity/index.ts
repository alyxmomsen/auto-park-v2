import { IDimensions } from '../../types';
import { Collider } from '../_Collider';
import { Color } from '../_Color';
import { Combat, GunCombat, MinigunCombat, NoCombat } from '../_Combat';
import { DebugEntity, IDebugEntity } from '../_DebugEntity';
import { Dimensions } from '../_Dimensions';
import { EntityState } from '../_EntityState';
import { Movement } from '../_Movement';
import { MovementVelocity } from '../_MovementVelocity';
import { Position } from '../_Position';
import { Renderer } from '../_Renderer';

export abstract class Entity implements IDebugEntity {

	private static numberOfInstncies: number = 0;
	protected title: string;

	public abstract renderDebug(ctx: CanvasRenderingContext2D, renderer: Renderer): void 
	public abstract setDebugEntityPosition(x: number, y: number): void;

	public setNoI() {
		Entity.numberOfInstncies += 1;
	}

	public getNoI() {
		return Entity.numberOfInstncies;
	}

	public getTitle() {
		return this.title;
	}

	public movement: Movement;

	public dimensions: Dimensions;
	public color: Color;
	public state: EntityState;

	public combat: Combat;
	private combatVariants: Combat[];

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
		const { x: vX, y: vY } = this.movement.velocity.getState();
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

	public update(entities: Entity[] ) {
		const collider = new Collider(this);

		entities.forEach((entity) => {
			collider.test(entity);
		});

		// collider.getCollisions().forEach(collision => {
		// 	collision.resolve(this);
		// });
		const collisions = collider.getCollisions();

		if (collisions.length) {
			collisions /* [0].resolve(); */
				.forEach((collision) => {
					collision.resolution();
				});
		} else {
			this.updatePositionByVelocity();
		}

		this.movement.velocity.collapseBy(0.95);

		// this.renderDebug();
	}

	public render(ctx: CanvasRenderingContext2D, renderer: Renderer) {
		renderer.renderSquare(ctx, this);

		this.renderDebug(ctx , renderer);
	}

	constructor(
		position: Position,
		dimensions: IDimensions,
		color: Color,
		combat: Combat,
		movVel: { x: number; y: number },
		title: string
	) {
		// this.position = position;
		this.dimensions = new Dimensions(dimensions);
		this.color = color;
		this.state = new EntityState();
		// this.movementVelocity = new MovementVelocity(movVel.x, movVel.y);
		this.combat = combat;
		this.combatVariants = [new NoCombat() ,new MinigunCombat(), new GunCombat()];
		this.setCombat();
		this.title = title;
		this.movement = new Movement({
			position,
			velocity: new MovementVelocity(movVel.x, movVel.y),
		});

		
	}
}
