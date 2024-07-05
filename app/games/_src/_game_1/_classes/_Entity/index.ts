import { IDimensions } from '../../types';
import { Color } from '../_Color';
import { Combat } from '../_Combat';
import { Dimensions } from '../_Dimensions';
import { EntityState } from '../_EntityState';
import { MovementVelocity } from '../_MovementVelocity';
import { Position } from '../_Position';
import { Renderer } from '../_Renderer';
import { Collider } from '../_Collider';

export abstract class Entity {
	public position: Position;
	public movementVelocity: MovementVelocity;
	public dimensions: Dimensions;
	public color: Color;
	public state: EntityState;

	public combat: Combat;

	private updatePositionByVelocity() {
		const { x, y } = this.position.getPosition();
		const { x: vX, y: vY } = this.movementVelocity.getState();
		this.position.setPosition({ x: x + vX, y: y + vY });
	}

	//move up === increment velocity
	public moveUp() {
		this.movementVelocity.decrement('y');
	}
	public moveDown() {
		this.movementVelocity.increment('y');
	}
	public moveLeft() {
		this.movementVelocity.decrement('x');
	}
	public moveRight() {
		this.movementVelocity.increment('x');
	}
	//fire === ???
	public fire() {}

	abstract fireBehavior(): void;

	public update(entities: Entity[]) {
		//check collision
		const collider = new Collider(this);

		for (const entity of entities) {
			collider.test(entity);
		}

		if (collider.getCollisions().length) {
			
			// !!!!!!!!
			// this.updatePositionByVelocity();
		} else {
			this.updatePositionByVelocity();
		}

		this.movementVelocity.collapseBy(0.9);
	}

	public render(ctx: CanvasRenderingContext2D, renderer: Renderer) {
		renderer.renderSquare(ctx, this);
	}

	constructor(
		position: Position,
		dimensions: IDimensions,
		color: Color,
		combat: Combat,
		movVel: { x: number; y: number }
	) {
		this.position = position;
		this.dimensions = new Dimensions(dimensions);
		this.color = color;
		this.state = new EntityState();
		this.movementVelocity = new MovementVelocity(movVel.x, movVel.y);
		this.combat = combat;
	}
}
