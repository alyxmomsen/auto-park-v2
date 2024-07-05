
import { IEntityParams } from '../../types';
import { Entity } from '../_Entity';

export class Collider {
	private objA: Entity;
	private subject: Entity | null;

	private paramsA: IEntityParams | null;
    private paramsB: IEntityParams | null;
    
    private isCollided: boolean;

    private collisions: Entity[];

	private setSubject(obj: Entity) {
		this.subject = obj;
		this.paramsB = {
			position: obj.position.getPosition(),
			dimensions: obj.dimensions.get(),
			velocity: obj.movementVelocity.getState(),
		};
    }
    
    public getCollisions() {
        return this.collisions;
    }

	setA(obj: Entity) {
		this.objA = obj;
		this.paramsA = {
			position: obj.position.getPosition(),
			dimensions: obj.dimensions.get(),
			velocity: obj.movementVelocity.getState(),
		};
	}

    test(obj: Entity): void {
        
        this.setSubject(obj);

		if (!this.subject) throw new Error('collider no ready to the test');

		if (!this.paramsA || !this.paramsB) throw new Error('missing one or more');

		if (
			this.paramsA.position.x + this.paramsA.velocity.x <
				this.paramsB.position.x + this.paramsB.dimensions.width + this.paramsB.velocity.x &&
			this.paramsA.position.x + this.paramsA.dimensions.width + this.paramsA.velocity.x >
				this.paramsB.position.x + this.paramsB.velocity.x &&
			this.paramsA.position.y + this.paramsA.velocity.y <
				this.paramsB.position.y + this.paramsB.dimensions.height + this.paramsB.velocity.y &&
			this.paramsA.position.y + this.paramsA.dimensions.height + this.paramsA.velocity.y >
				this.paramsB.position.y + this.paramsB.velocity.y
        ) {
            this.collisions.push(this.subject);
        }
        
	}

    constructor(a: Entity, b?: Entity) {
        this.collisions = [];
        this.isCollided = false;
		this.objA = a;
		this.subject = b ? b : null;
		this.paramsA = {
			position: a.position.getPosition(),
			dimensions: a.dimensions.get(),
			velocity: a.movementVelocity.getState(),
		};
		this.paramsB = b
			? {
					position: b.position.getPosition(),
					dimensions: b.dimensions.get(),
					velocity: b.movementVelocity.getState(),
				}
			: null;
	}
}
