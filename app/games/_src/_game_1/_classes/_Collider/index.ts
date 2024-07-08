import { headers } from 'next/headers';
import { IEntityParams } from '../../types';
import { Entity } from '../_Entity';

interface ICollisionItemState {
	left: number;
	right: number;
	top: number;
	bottom: number;
	width: number;
	height: number;
	velocityX: number;
	velocityY: number;
	subject: Entity;
}

export class Collider {
	private main: Entity;
	private collisions: Collision[];

	test(entity: Entity) {
		if (entity === this.main) return false;

		const main_items = this.getMovementItems(this.main);
		const subj_items = this.getMovementItems(entity);

		if (
			main_items.left + main_items.velocityX < subj_items.right + subj_items.velocityX &&
			main_items.right + main_items.velocityX > subj_items.left + subj_items.velocityX &&
			main_items.top + main_items.velocityY < subj_items.bottom + subj_items.velocityY &&
			main_items.bottom + main_items.velocityY > subj_items.top + subj_items.velocityY
		) {
			this.collisions.push(new Collision({ subj: this.main, state: main_items }, {subj:entity , state:subj_items}));
		}
	}

	getCollisions() {
		return [...this.collisions];
	}

	private getMovementItems(entity: Entity): ICollisionItemState {
		const position = entity.position.getPosition();
		const velocity = entity.movementVelocity.getState();
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
		};
	}

	constructor(mainEntity: Entity) {
		this.main = mainEntity;
		this.collisions = [];
	}
}

export class Collision {
	private subjectA: {
		subj: Entity;
		state: ICollisionItemState;
	};
	private subjectB: {
		subj: Entity;
		state: ICollisionItemState;
	};

	resolve() {
		const diffX = this.subjectA.state.left + this.subjectA.state.velocityX - this.subjectB.state.left + this.subjectA.state.velocityX;
		const diffY = this.subjectA.state.top + this.subjectA.state.velocityX - this.subjectB.state.top + this.subjectA.state.velocityX;
		const collisionVector = Math.sqrt((diffX ** 2) + (diffY ** 2));

		
		console.log();
	}

	constructor(subjectA: { subj:Entity , state:ICollisionItemState} , subjectB: { subj:Entity , state:ICollisionItemState}) {
		this.subjectA = subjectA ;
		this.subjectB = subjectB ;
	}
}

