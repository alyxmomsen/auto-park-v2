import { Entity } from "../_Entity";

export interface IHealthBehavior {
    
    calculateDamageBy(entity: Entity): number;
    
}


export abstract class HealthBehavior implements IHealthBehavior {
    protected interval?: number;
    protected lastExecute: number;
    abstract calculateDamageBy(entity: Entity): number;
    protected isReadyToGo(): boolean {
        const now = Date.now();

        if (this.interval && now - this.lastExecute > this.interval) {
            this.lastExecute = now;
            return true;
        }
        else {
            return false;
        }
    }

    constructor({ interval}:{interval?:number}) {
        this.interval = interval ? interval : interval;
        this.lastExecute = 0;
    }
}


export class PlayerHealthBehavior extends HealthBehavior {

    calculateDamageBy(entity:Entity): number {
        return this.isReadyToGo() ? entity.damage.get() : 0 ;
    }

    constructor() {
        super({interval:200});
    }
}
export class EnemyHealthBehavior extends HealthBehavior {
    
    calculateDamageBy(entity:Entity): number {
        return 0;
    }
    constructor() {
        super({});
    }
}

export class BulletHealthBehavior extends HealthBehavior {
    
    calculateDamageBy(entity:Entity): number {
        return 0;
    }
    constructor() {
        super({});
    }
}

export class NoHealthBehavior extends HealthBehavior {
    
    calculateDamageBy(entity:Entity): number {
        return 0;
    }
    constructor() {
        super({});
    }
}



export class Health {

    private healthBehavior: HealthBehavior;
    private value: number;
    
    private dec(delta: number): void {
        this.value -= delta;
    } 

    private inc(delta: number): void {

    }

    get() {
        return this.value;
    }

    applyDamage(target: Entity, from: Entity) {
        
        

        const damage = this.healthBehavior.calculateDamageBy(from);
        this.dec(damage);
        
    }


    constructor(value:number , healthBehavior:HealthBehavior) {
        this.value = value;
        this.healthBehavior = healthBehavior;
    }
}