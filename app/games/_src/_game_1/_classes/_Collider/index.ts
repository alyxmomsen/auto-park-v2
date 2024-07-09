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
			this.collisions.push(
				new Collision({ subj: this.main, state: main_items }, { subj: entity, state: subj_items })
			);
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
		const newPositionXByCenterA =
			this.subjectA.state.right -
			(this.subjectA.state.right - this.subjectA.state.left) / 2 +
			this.subjectA.state.velocityX;
		const newPositionYByCenterA =
			this.subjectA.state.bottom -
			(this.subjectA.state.bottom - this.subjectA.state.top) / 2 +
			this.subjectA.state.velocityY;
		const newPositionXByCenterB =
			this.subjectB.state.right -
			(this.subjectB.state.right - this.subjectB.state.left) / 2 +
			this.subjectB.state.velocityX;
		const newPositionYByCenterB =
			this.subjectB.state.bottom -
			(this.subjectB.state.bottom - this.subjectB.state.top) / 2 +
			this.subjectB.state.velocityY;

		const subjARelativeVector = Math.sqrt(this.subjectA.state.velocityX ** 2 + this.subjectA.state.velocityY ** 2);

		const distanceXAbs = newPositionXByCenterA - newPositionXByCenterB;
		const distanceYAbs = newPositionYByCenterA - newPositionYByCenterB;
		const collisionVectorAbs = Math.sqrt(distanceXAbs ** 2 + distanceYAbs ** 2);
		const angle = Math.atan2(distanceYAbs, distanceXAbs) * (180 / Math.PI); // Угол в градусах
		if (this.subjectA.subj.getTitle() === 'player')
			console.log({
				/* collisionVectorAbs, distanceXAbs, distanceYAbs,  */ angle,
				vec: subjARelativeVector,
				x: this.subjectA.state.velocityX,
				y: this.subjectA.state.velocityY,
			});

		if ((angle < 45 && angle >= 0) || (angle < -0 && angle >= -45)) {
			if (this.subjectA.subj.getTitle() === 'player') {
				console.log('right');
			}
		} else if (angle < -45 && angle >= -135) {
			if (this.subjectA.subj.getTitle() === 'player') {
				console.log('top');
			}
		} else if ((angle < -135 && angle >= -180) || (angle < 180 && angle >= 135)) {
			if (this.subjectA.subj.getTitle() === 'player') {
				console.log('left');
			}
		} else if (angle < 135 && angle >= 45) {
			if (this.subjectA.subj.getTitle() === 'player') {
				console.log('bottom');
			}
		}
	}

	constructor(
		subjectA: { subj: Entity; state: ICollisionItemState },
		subjectB: { subj: Entity; state: ICollisionItemState }
	) {
		this.subjectA = subjectA;
		this.subjectB = subjectB;
	}
}

// function util_1() {
// 	const getRelDistanceXByAxisDir = (dir: number) => this.subjectA.state.left + this.subjectA.state.velocityX - this.subjectB.state.right + this.subjectB.state.velocityX;
// 	const getRelDistanceYByAxisDir = (dir: number) => this.subjectA.state.left + this.subjectA.state.velocityX - this.subjectB.state.right + this.subjectB.state.velocityX;

// 	const distanceXAbs = this.subjectA.state.left + this.subjectA.state.velocityX - this.subjectB.state.left + this.subjectA.state.velocityX;
// 	const distanceYAbs = this.subjectA.state.top + this.subjectA.state.velocityY - this.subjectB.state.top + this.subjectB.state.velocityY;
// 	const collisionVectorAbs = Math.sqrt((distanceXAbs ** 2) + (distanceYAbs ** 2));
// 	const distanceXRel = distanceXAbs > 0
// 		? this.subjectA.state.left + this.subjectA.state.velocityX - this.subjectB.state.right + this.subjectB.state.velocityX
// 		: distanceXAbs < 0
// 			? this.subjectA.state.right + this.subjectA.state.velocityX - this.subjectB.state.left + this.subjectB.state.velocityX
// 			: 0;
// 	const distanceYRel = distanceYAbs > 0
// 		? this.subjectA.state.top + this.subjectA.state.velocityY - this.subjectB.state.bottom + this.subjectB.state.velocityY
// 		: distanceXAbs < 0
// 			? this.subjectA.state.bottom + this.subjectA.state.velocityY - this.subjectB.state.top + this.subjectB.state.velocityY
// 			: 0;
// 	const collisionVectorRel = Math.sqrt((distanceXRel ** 2) + (distanceYRel ** 2));

// 	const dive = ''
// }
