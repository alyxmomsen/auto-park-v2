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
		}


		const checkCollision__ = ({x,y}:{x:number , y:number}) => {

			if (
				main_items.left + x < subj_items.right + subj_items.velocityX &&
				main_items.right + x > subj_items.left + subj_items.velocityX &&
				main_items.top + y < subj_items.bottom + subj_items.velocityY &&
				main_items.bottom + y > subj_items.top + subj_items.velocityY
			) {
				return true;
			}

			return false;
		}


		const foo = () => {
		
		
			const testByX = () => {

				const x = subj_items.left + subj_items.velocityX - main_items.width;
				const newVectorX = (subj_items.left + subj_items.velocityX) - (main_items.right + main_items.velocityX);
				const getNewVectorY = (newVectorX: number) => (main_items.velocityY / main_items.velocityX) * newVectorX;
				const y = main_items.left + getNewVectorY(newVectorX);
				
				return {
					x: newVectorX, y: getNewVectorY(newVectorX) ,
				}
			}

			const testByY = () => {

				const y = subj_items.top - main_items.height;
				const newVectorY = (subj_items.top + subj_items.velocityY) - (main_items.bottom + main_items.velocityY);
				// const getNewVectorY = (newVectorX: number) => (subj_items.velocityY / subj_items.velocityX) * newVectorX;
				const getNewVectorX = (newVectorY: number) => (main_items.velocityX / main_items.velocityY) * newVectorY;
				const x = main_items.top + getNewVectorX(newVectorY);
				
				return {
					x:getNewVectorX(newVectorY), y:newVectorY
				}
			}
			
			const case_1 = checkCollision__(testByX());
			const case_2 = checkCollision__(testByY());

			return `x: ${case_1 ? 'true' : 'false'} ,y:${case_2 ? 'true': 'false'}`
		}

		if(this.main.getTitle() === "player") console.log(foo());
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
			vectorModule: Math.sqrt(velocity.x ** 2 + velocity.y ** 2) ,
			vectorAngle: Math.atan2(velocity.y, velocity.x) * (180 / Math.PI) , // Угол в градусах
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

	resolution() {
		

	}

	constructor(
		subjectA: { subj: Entity; state: ICollisionItemState },
		subjectB: { subj: Entity; state: ICollisionItemState }
	) {
		this.subjectA = subjectA;
		this.subjectB = subjectB;
	}
}


