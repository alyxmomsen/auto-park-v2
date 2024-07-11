import MyGame from "../..";
import { Entity } from "../_Entity";

abstract class Controller {

}

export class GameController extends Controller {

    private subj: MyGame;


    /* --- */
    // test
    private last = 0;
    private interval = 500; 
    /* --- */


    makeBullet(initiator: Entity) {

        /* --- */
        // test 
        const rand = (): -1 | 0 | 1 => (Math.floor(Math.random() * 3) - 1) as -1 | 0 | 1;
        
        const x = rand();
        let y = rand();
        if (x === 0 && y === 0) {
            y = 1;
        }
        
        this.subj.makeAttackEntity(initiator, {x , y});
        /* --- */

    }

    makeExplosion(initiator: Entity) {
        
    }

    constructor(subj:MyGame) {
        super();

        this.subj = subj;
    }
}




