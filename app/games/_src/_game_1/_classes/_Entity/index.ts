import { IDimensions } from "../../types";
import { CollisionCase } from "../_Collision";
import { Color } from "../_Color";
import { Combat } from "../_Combat";
import { Dimensions } from "../_Dimensions";
import { EntityState } from "../_EntityState";
import { MovementVelocity } from "../_MovementVelocity";
import { Position } from "../_Position";
import { Renderer } from "../_Renderer";

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
        let collisionCases: CollisionCase[] = [];

		const { x: myX, y: myY } = this.position.getPosition();
        const { width: myWidth, height: myHeight } = this.dimensions.get();
        const { delta:myDelta, x:myVX,y:myVY } = this.movementVelocity.getState();

		for (const entity of entities) {
			const { x, y } = entity.position.getPosition();
            const { width, height } = entity.dimensions.get();
            const { delta , x:vX , y:vY } = entity.movementVelocity.getState();

			if (myX + myVX < x + width + vX && myX + myWidth + myVX > x + vX && myY + myVY < y + height + vY && myY + myHeight + myVY > y + vY) {
                
                collisionCases.push(new CollisionCase(this , entity))
			}
        }
        
        if (collisionCases.length) {
            
            collisionCases.forEach(collisionCase => {
                collisionCase.resolve();
            });

			// !!!!!!!!
            this.updatePositionByVelocity();
        }
        else {

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