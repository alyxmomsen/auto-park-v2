import { Renderer } from "../_Renderer/index.js";

interface IUpdateRender {
    update(): void;
    render(): void;
}

interface IPosition {
    x: number;
    y: number;
} 

enum MovingX {
    LEFT = -1,
    NULL ,
    RIGHT,
}

enum MovingY {
    UP = -1,
    NULL,
    DOWN, 
}



class EntityState {
    protected moving: [MovingX, MovingY];
    getState() {
        return this.moving;
    }

    setState(x:MovingX , y:MovingY) {
        this.moving = [x, y];
    }
    constructor() {
        this.moving = [MovingX.NULL, MovingY.NULL];

    }
}

abstract class Position {
    private x: number;
    private y: number;

    getPosition() {
        return { x:this.x , y:this.y };
    }
    setPosition(position:IPosition) {
        this.x = position.x;
        this.y = position.y;
    }
    
    constructor(position:IPosition) {
        // this.position = { x: position.x, y: position.y };
        this.x = position.x;
        this.y = position.y;
    }
}

interface IDimensions {
    width: number;
    height: number;
}

class Dimensions {
    
    private width: number;
    private height: number;

    get() {
        return {
            width: this.width,
            height: this.height ,
        }
    }

    constructor(dimensions:IDimensions) {
        this.width = dimensions.width;
        this.height = dimensions.height;
    }
}

class Color {

    private value: string;

    get() {
        return this.value;
    }

    set(value: string):string|false {
        
        const rgx = /#[abcdef0123456789]{3,6}/gi

        if (rgx.test(value)) {
            this.value = value;
            return this.value ;
        }
        else {
            return false;
        }

    }

    constructor(value:string) {

        const defaultColor:string = '#000';
        const rgx = /#[abcdef0123456789]{3,6}/gi;

        this.value = rgx.test(value) ? value : defaultColor ;
    }
}

interface Vector2 {
    x: number;
    y: number;
}

abstract class VelocityVector2 {
    private x: number;
    private y: number;

    protected set(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    foo(xd:number, yd:number) {
        this.set(0 ,0);
    }

    public abstract update(x: number, y: number):void;

    constructor(x:number , y:number) {
        this.x = x;
        this.y = y;
    }
}

class PlayerVelocity extends VelocityVector2 {

    public update(x: number, y: number): void {
        this.set(0, 0);
    }
}

class PlayerPostion extends Position {
    constructor(x:number , y:number) {
        super({x , y});
    }
}

class EnemyPosition extends Position {
    constructor(x:number , y:number) {
        super({x , y});
    }
}

export abstract class Entity {
    public position: Position;
    // public movementVelocity: VelocityVector2;
    public dimensions: Dimensions;
    public color: Color;
    public state: EntityState;
    
    public moveUp() {
        const {x , y } = this.position.getPosition();
        this.position.setPosition({x , y:y - 1});
    }

    public moveDown() {
        const {x , y } = this.position.getPosition();
        this.position.setPosition({x , y:y + 1});
    }
    public moveLeft() {
        const {x , y } = this.position.getPosition();
        this.position.setPosition({x:x - 1 , y});
    }
    public moveRight() {
        const {x , y } = this.position.getPosition();
        this.position.setPosition({x:x + 1 , y});
    }

    public update() {

    }

    public render(ctx: CanvasRenderingContext2D, renderer: Renderer) {
        
        renderer.renderSquare(ctx , this);
    }
    
    constructor(position:Position , dimensions:IDimensions) {
        this.position = position;
        this.dimensions = new Dimensions(dimensions);
        this.color = new Color("#379");
        this.state = new EntityState();
        // this.movementVelocity = 
    }
}

export abstract class Character extends Entity {

}

export class Player extends Character {



    constructor() {
        super(new PlayerPostion(0, 0), {width:100 , height:100});
    }
}

export class Enemy extends Character {

    constructor() {
        super(new EnemyPosition(100 , 100) ,{width:50 , height:50});
    }
}
