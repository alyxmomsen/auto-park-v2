import { Color } from "../_Color";
import { MinigunCombat, NoCombat } from "../_Combat";
import { GameController } from "../_Controller";
import { Damage } from "../_Damage";
import { EnemyPosition } from "../_Enemy";
import { collisionBehavior, Entity } from "../_Entity";
import { EnemyHealthBehavior, Health } from "../_Health";
import {  } from "../_Player";
import { RendererSingleton } from "../_Renderer";

export class Slime extends Entity implements collisionBehavior {


    /* collisionBehavior */

    setHealthWithCollisionBy(): void {
        
    }

    setVelocityWithCollisionBy(): void {
        
    }

    /* ---  */

    public renderDebug(ctx: CanvasRenderingContext2D, renderer: RendererSingleton): void {
        
    }

    collisionResolution(entity: Entity): void {
        
    }

    ifCollissionTest(entity: Entity): boolean {
        return false;
    }

    fireBehavior(): void {
        
    }


    protected beforeUpdated(): void {
        
    }

    protected afterUpdated(controller?: GameController): void {
        
    }
    
    constructor() {

        const rand = (value: number) => Math.floor(Math.random() * value);
        super(
            new EnemyPosition(rand(1000), rand(900)),
			{ width: 200, height: 200 },
			new Color('#508433'),
			new NoCombat(),
			{
				x: 0,
				y: 0,
			},
			'enemy',
			new Health(100, new EnemyHealthBehavior()),
			new Damage(10)
        );
    }
}