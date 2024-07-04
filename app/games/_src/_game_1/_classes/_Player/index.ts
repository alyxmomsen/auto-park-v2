
import { CollisionCase } from '../_Collision';
import { Renderer } from '../_Renderer';

interface IUpdateRender {
	update(): void;
	render(): void;
}

interface IPosition {
	x: number;
	y: number;
}

enum MovingX {
	LEFT = -1,
	NULL,
	RIGHT,
}

enum MovingY {
	UP = -1,
	NULL,
	DOWN,
}

class EntityState {
	protected moving: [MovingX, MovingY];
	getState() {
		return this.moving;
	}

	setState(x: MovingX, y: MovingY) {
		this.moving = [x, y];
	}
	constructor() {
		this.moving = [MovingX.NULL, MovingY.NULL];
	}
}

export abstract class Position {
	private x: number;
	private y: number;

	getPosition() {
		return { x: this.x, y: this.y };
	}
	setPosition(position: IPosition) {
		this.x = position.x;
		this.y = position.y;
	}

	constructor(position: IPosition) {
		// this.position = { x: position.x, y: position.y };
		this.x = position.x;
		this.y = position.y;
	}
}

interface IDimensions {
	width: number;
	height: number;
}

class Dimensions {
	private width: number;
	private height: number;

	get() {
		return {
			width: this.width,
			height: this.height,
		};
	}

	constructor(dimensions: IDimensions) {
		this.width = dimensions.width;
		this.height = dimensions.height;
	}
}

export class Color {
	private value: string;

	get() {
		return this.value;
	}

	set(value: string): string | false {
		const rgx = /#[abcdef0123456789]{3,6}/gi;

		if (rgx.test(value)) {
			this.value = value;
			return this.value;
		} else {
			return false;
		}
	}

    constructor(value?: string) {
        
        if (value) {
            
            const defaultColor: string = '#000';
            const rgx = /#[abcdef0123456789]{3,6}/gi;
    
            this.value = rgx.test(value) ? value : defaultColor;
        }
        else {
            let randomcolor = '#';
            const letters = '0123456789abcdef';
            while (randomcolor.length < 7) {
                randomcolor += letters[Math.floor(Math.random() * letters.length)];
            }

            this.value =  randomcolor;
        }

	}
}

interface Vector2 {
	x: number;
	y: number;
}

abstract class VelocityVector2 {
	private x: number;
	private y: number;

	protected set(x: number, y: number) {
		this.x += x;
		this.y += y;
	}

	foo(xd: number, yd: number) {
		this.set(0, 0);
	}

	public abstract update(x: number, y: number): void;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

class PlayerVelocity extends VelocityVector2 {
	public update(x: number, y: number): void {
		this.set(0, 0);
	}
}

class PlayerPostion extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

class EnemyPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

interface IMovementVelocity {}

class MovementVelocity {
	private x: number;
	private y: number;
	private delta: number = 0.2;

	getState() {
		const { x, y, delta } = this;
		return {
			x,
			y,
			delta,
		};
	}

	incrementBy(x: number, y: number) {
		this.x = this.x + x;
		this.y = this.y + y;
	}

	increment(axis: 'y' | 'x') {
		this[axis] = this[axis] + this.delta;
	}

	decrement(axis: 'x' | 'y') {
		this[axis] = this[axis] + -this.delta;
	}

	collapseBy(value: number) {
		if (value < 1 && value >= 0) {
			this.x = this.x * value;
			this.y = this.y * value;
		}
    }
    
    setXY() {

    }

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export class Combat {
	private last: number;
	private firerate: number;
	isReady(): boolean {
		const now = Date.now();
		const isReady = now - this.last > this.firerate ? true : false;
		if (isReady) {
			this.last = now;
			return true;
		} else {
			return false;
		}
	}
	constructor(firerate: number) {
		this.firerate = firerate;
		this.last = 0;
	}
}

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

export abstract class Character extends Entity {}

export class Player extends Character {
	fireBehavior() {}
	constructor() {
		super(new PlayerPostion(0, 0), { width: 50, height: 100 }, new Color('#2a2869'), new Combat(50), {
			x: 0,
			y: 0,
		});
	}
}

export class Enemy extends Character {
	fireBehavior() {}
	constructor() {
		super(new EnemyPosition(100, 100), { width: 50, height: 50 }, new Color('#379'), new Combat(200), {
			x: 0,
			y: 0,
		});
	}
}
