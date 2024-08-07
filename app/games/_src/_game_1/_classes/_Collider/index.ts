import { Entity, IEntityProperties } from '../_Entity';

interface IMovementStateVariant {
	currentState(): IEntityProperties;
	nextState(): IEntityProperties;
}

type TCheckCollision = {
	left: number;
	top: number;
	// width: number;
	// height: number;
	right: number;
	bottom: number;
};


export interface IBoundingRectangle {
	left: number,
	right: number,
	bottom: number,
	top:number ,
}

export class Collider {
	private origin: Entity;

	test(entity: Entity): boolean {
		
		return this.checkCollision(this.origin.getBoundingRect(), entity.getBoundingRect());
	}

	private checkCollision(a: TCheckCollision, b: TCheckCollision): boolean {
		if (a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top) {
			return true;
		} else {
			return false;
		}
	}

	private getMovementState(entity: Entity): IMovementStateVariant {
		return {
			currentState: () => {
				const position = entity.movement.positionOfOrigin.getPosition();
				const velocity = entity.movement.velocity.getXY();
				const dimensions = entity.hitBox.getDimensions();
				return {
					left: position.x,
					right: position.x + dimensions.width,
					top: position.y,
					bottom: position.y + dimensions.height,
					width: dimensions.width,
					height: dimensions.height,
					velocityX: velocity.x,
					velocityY: velocity.y,
					subject: entity,
					vectorModule: Math.sqrt(velocity.x ** 2 + velocity.y ** 2),
					vectorAngle: Math.atan2(velocity.y, velocity.x) * (180 / Math.PI), // Угол в градусах
				};
			},
			nextState: () => {
				const position = entity.movement.positionOfOrigin.getPosition();
				const velocity = entity.movement.velocity.getXY();
				const dimensions = entity.hitBox.getDimensions();
				return {
					left: position.x + velocity.x,
					right: position.x + dimensions.width + velocity.x,
					top: position.y + velocity.y,
					bottom: position.y + dimensions.height + velocity.y,
					width: dimensions.width,
					height: dimensions.height,
					velocityX: velocity.x,
					velocityY: velocity.y,
					subject: entity,
					vectorModule: Math.sqrt(velocity.x ** 2 + velocity.y ** 2),
					vectorAngle: Math.atan2(velocity.y, velocity.x) * (180 / Math.PI), // Угол в градусах
				};
			},
		};
	}

	constructor(mainEntity: Entity) {
		this.origin = mainEntity;
	}
}

export class Collision {
	private subjectA: {
		subj: Entity;
		state: IEntityProperties;
	};

	private subjectB: {
		subj: Entity;
		state: IEntityProperties;
	};

	resolution() {}

	constructor(
		subjectA: { subj: Entity; state: IEntityProperties },
		subjectB: { subj: Entity; state: IEntityProperties },
	) {
		this.subjectA = subjectA;
		this.subjectB = subjectB;
	}
}
