import { headers } from 'next/headers';
import { IEntityParams } from '../../types';
import { Entity } from '../_Entity';
import { Renderer } from '../_Renderer';
import { DebugEntity } from '../_DebugEntity';

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
	vectorModule: number;
	vectorAngle: number;
}

export class Collider {
	private main: Entity;
	private collisions: Collision[];

	test(entity: Entity) {
		if (entity === this.main) return false;

		const main_items = this.getMovementItems(this.main);
		const subj_items = this.getMovementItems(entity);

		const checkCollision = () => {
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
		};

		const checkCollision__ = ({ x, y }: { x: number; y: number }) => {
			if (
				main_items.left + x < subj_items.right + subj_items.velocityX &&
				main_items.right + x > subj_items.left + subj_items.velocityX &&
				main_items.top + y < subj_items.bottom + subj_items.velocityY &&
				main_items.bottom + y > subj_items.top + subj_items.velocityY
			) {
				subj_items.subject.setDebugEntityPosition(main_items.left + x, main_items.top + y);
				return true;
			}
			// subj_items.subject.setDebugEntityPosition(main_items.left + x , main_items.top + y);
			// if(this.main.getTitle() === 'player') subj_items.subject.setDebugEntityPosition(main_items.left + x , main_items.top + y);
			return false;
		};

		const foo = () => {
			const testByX = () => {
				let newVectorX = 0;
				const getNewVectorY = (newVectorX: number) =>
					(main_items.velocityY / main_items.velocityX) * newVectorX;
				if (main_items.velocityX > 0) {
					newVectorX =
						(subj_items.left/*  + subj_items.velocityX */) > (main_items.right) && (subj_items.left + subj_items.velocityX) <  (main_items.right + main_items.velocityX)
							? subj_items.left/*  + subj_items.velocityX */ - (main_items.right/*  - main_items.velocityX */)
							: main_items.velocityX;
				} else if (main_items.velocityX < 0) {
					newVectorX = (subj_items.right + subj_items.velocityX) < (main_items.left) && (subj_items.right + subj_items.velocityX) > (main_items.left + main_items.velocityX)
							? (main_items.left - main_items.velocityX) - subj_items.right - subj_items.velocityX
							: main_items.velocityX;
				}

				return {
					x: newVectorX,
					y: getNewVectorY(newVectorX),
				};
			};

			const testByY = () => {

				let newVectorY = 0;
				const getNewVectorX = (newVectorY: number) =>
					(main_items.velocityX / main_items.velocityY) * newVectorY;

				if (main_items.velocityY > 0) {
					newVectorY =
						(subj_items.top + subj_items.velocityY) > (main_items.bottom) && (subj_items.top + subj_items.velocityY) <  (main_items.bottom + main_items.velocityY)
							? subj_items.top + subj_items.velocityY - (main_items.bottom - main_items.velocityY)
							: main_items.velocityY;
				} else if (main_items.velocityY < 0) {
					newVectorY = (subj_items.bottom + subj_items.velocityY) < (main_items.top) && (subj_items.bottom + subj_items.velocityY) > (main_items.top + main_items.velocityY)
							? (main_items.top - main_items.velocityY) - subj_items.bottom - subj_items.velocityY
							: main_items.velocityY;
				}

				return {
					x: getNewVectorX(newVectorY),
					y: newVectorY,
				};
			};

			const tBX = testByX();
			const tBY = testByY();

			const case_2 = true && checkCollision__(tBY);
			const case_1 = true && checkCollision__(tBX);

			return `x: ${case_1 ? 'true' : 'false'} \n,y:${case_2 ? 'true' : 'false'} \nmain: \nvx${main_items.velocityX} , \nvy${main_items.velocityY} \ntestx:${true && JSON.stringify(tBX)} \ntesty:${true && JSON.stringify(tBY)}`;
		};

		const debugStr = foo();
		if (this.main.getTitle() === 'player') {
			console.log(debugStr);
		}
	}

	getCollisions() {
		return [...this.collisions];
	}

	private getMovementItems(entity: Entity): ICollisionItemState {
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
		};
	}

	constructor(mainEntity: Entity, debugEntity?: DebugEntity) {
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

	resolution() {}

	constructor(
		subjectA: { subj: Entity; state: ICollisionItemState },
		subjectB: { subj: Entity; state: ICollisionItemState },
		debugEntity?: DebugEntity
	) {
		this.subjectA = subjectA;
		this.subjectB = subjectB;
	}
}
