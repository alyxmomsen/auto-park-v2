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
			this.collisions.push(new Collision(this.main, main_items, entity, subj_items));
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
		if (this.subjectA.state.left > this.subjectB.state.right) {
			const dive =
				this.subjectB.state.right +
				this.subjectB.state.velocityX -
				(this.subjectA.state.left + this.subjectA.state.velocityX);
			// console.log(dive);

			this.subjectA.subj.position.setPosition({
				x: this.subjectA.state.left + (this.subjectA.state.velocityX + dive / 2),
				y: this.subjectA.state.top,
			});
			this.subjectB.subj.position.setPosition({
				x: this.subjectB.state.left + (this.subjectA.state.velocityX - dive / 2),
				y: this.subjectB.state.top,
			});
		}
		// else if (this.subjectA.state.right < this.subjectB.state.left) {

		// }
	}

	constructor(subjectA: Entity, stateA: ICollisionItemState, subjectB: Entity, stateB: ICollisionItemState) {
		this.subjectA = {
			subj: subjectA,
			state: stateA,
		};
		this.subjectB = {
			subj: subjectB,
			state: stateB,
		};
	}
}
