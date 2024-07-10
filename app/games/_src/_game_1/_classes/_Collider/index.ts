
import { Entity, IEntityState } from '../_Entity';
import { DebugEntity, IDebugEntity } from '../_DebugEntity';


interface IMovementStateVariant {
	currentState(): IEntityState;
	nextState(): IEntityState;
}

type TCheckCollision = {
	left: number,
	top: number,
	width: number,
	height: number,
	right: number,
	bottom:number ,
}

export class Collider {
	private main: Entity;
	private collisions: Collision[];

	private resolution(entity: Entity & IDebugEntity) {
		const {x , y } = entity.movement.positionOfOrigin.getPosition();
		entity.setDebugEntityPosition(x ,y) ;
	}

	test(entity: Entity):boolean {
		if (entity === this.main) return false;

		const a = this.getMovementState(this.main);
		const b = this.getMovementState(entity);

		if (this.checkCollision({ ...a.currentState() }, {...b.currentState()})) {
			this.resolution(entity);
			return true;
		}
		else if (this.checkCollision({ ...a.nextState() }, { ...b.nextState() })) {
			this.resolution(entity);
			return true;
		}
		else {
			return false;
		}
	}

	private checkCollision(a:TCheckCollision , b:TCheckCollision):boolean {
		if (a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top) {
			return true;
		}
		else {
			return false;
		}
	}

	getCollisions() {
		return [...this.collisions];
	}


	

	private getMovementState(entity: Entity): IMovementStateVariant {
		
		return {
			currentState: () => {
				const position = entity.movement.positionOfOrigin.getPosition();
				const velocity = entity.movement.velocity.getState();
				const dimensions = entity.dimensions.get();
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
				}
			}, 
			nextState: () => {
				const position = entity.movement.positionOfOrigin.getPosition();
				const velocity = entity.movement.velocity.getState();
				const dimensions = entity.dimensions.get();
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
				}
			}
		}
	}

	constructor(mainEntity: Entity, debugEntity?: DebugEntity) {
		this.main = mainEntity;
		this.collisions = [];
	}
}

export class Collision {
	private subjectA: {
		subj: Entity;
		state: IEntityState;
	};

	private subjectB: {
		subj: Entity;
		state: IEntityState;
	};

	resolution() {}

	constructor(
		subjectA: { subj: Entity; state: IEntityState },
		subjectB: { subj: Entity; state: IEntityState },
		debugEntity?: DebugEntity
	) {
		this.subjectA = subjectA;
		this.subjectB = subjectB;
	}
}
