import { Character, Color, Combat, Position } from "../_Player";

export class Bullet extends Character {

    fireBehavior(): void {
        
    }

    constructor(position: {x:number , y:number}) {
        super(new BulletPosition(position.x , position.y), { width: 25, height: 25 } , new Color('#9c3278') , new Combat(200));
    }

}

export class BulletPosition extends Position {
    
    constructor(x:number , y:number) {
        super({x , y});
    }
}