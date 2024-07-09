import { IDimensions } from '../../types';
import { Collider } from '../_Collider';
import { Color } from '../_Color';
import { Combat, GunCombat, MinigunCombat, NoCombat } from '../_Combat';
import { Dimensions } from '../_Dimensions';
import { EntityState } from '../_EntityState';
import { MovementVelocity } from '../_MovementVelocity';
import { Position } from '../_Position';
import { Renderer } from '../_Renderer';

export abstract class Entity {
	protected title: string;

	public getTitle() {
		return this.title;
	}
	public position: Position;
	public movementVelocity: MovementVelocity;
	public dimensions: Dimensions;
	public color: Color;
	public state: EntityState;

	public combat: Combat;
	private combatVariants: Combat[] = [new MinigunCombat(), new GunCombat(), new NoCombat()];

	private setCombat() {
		if (this.combatVariants.length) {
			this.combat = this.combatVariants[0];
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
					collision.resolve();
				});
		} else {
			this.updatePositionByVelocity();
		}

		this.movementVelocity.collapseBy(0.95);
	}

	public render(ctx: CanvasRenderingContext2D, renderer: Renderer) {
		renderer.renderSquare(ctx, this);
	}

	constructor(
		position: Position,
		dimensions: IDimensions,
		color: Color,
		combat: Combat,
		movVel: { x: number; y: number },
		title: string
	) {
		this.position = position;
		this.dimensions = new Dimensions(dimensions);
		this.color = color;
		this.state = new EntityState();
		this.movementVelocity = new MovementVelocity(movVel.x, movVel.y);
		this.combat = combat;
		this.setCombat();
		this.title = title;
	}
}
