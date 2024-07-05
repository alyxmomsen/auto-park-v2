import { Entity } from "../_Entity";

export class CollisionCase {

    private subject: Entity;
    private main: Entity;

    resolve() {

        const { x: mainvx, y: mainvy } = this.main.movementVelocity.getState();
        const { x: subjvx, y: subjvy } = this.subject.movementVelocity.getState();

        const { x:mainx , y:mainy } = this.main.position.getPosition();
        const { x:subjx , y:subjy } = this.subject.position.getPosition();


        const summ = Math.abs(subjvx) + Math.abs(mainvx);

        ((mainx + mainvx) - (subjx + subjvx)) * (mainy + mainvy)
        // this.main.position.setPosition({x:subjx + this.subject.dimensions.get().width + 100 , y:mainy});
        // this.subject.position.setPosition({x:subjx + summ / 2 , y:subjy});
    }
    
    constructor(main:Entity , subject:Entity) {
        this.subject = subject;
        this.main = main;
    }

}