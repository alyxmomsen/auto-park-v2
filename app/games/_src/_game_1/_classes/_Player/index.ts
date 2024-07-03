
interface IUpdateRender {
    update(): void;
    render(): void;
}

interface IPosition {
    x: number;
    y: number;
} 

abstract class Position {
    private position: IPosition;
    getPosition() {
        return { ...this.position };
    }
    setPosition(position:IPosition) {
        this.position = {...position};
    }
    updateBy(position:IPosition) {
        this.position.x += position.x;
        this.position.y += position.y;
    }
    constructor(position:IPosition) {
        this.position = {x:position.x , y:position.y};
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
    private position: Position;
    private dimensions: Dimensions;

    getPosition(): IPosition {
        
        const { x, y } = this.position.getPosition();
        return { x ,y }; 
    }

    getDimensions():IDimensions {
        return {...this.dimensions.get()};
    }

    public update() {
        this.position.updateBy({ x: 0, y: 0 });
    }

    public render(ctx:CanvasRenderingContext2D) {

        ctx.fillStyle = 'black';
        const position = this.getPosition();
        const dimensions = this.getDimensions();

        ctx.fillRect(position.x, position.y, dimensions.width , dimensions.height);
    }
    
    constructor(position:Position , dimensions:IDimensions) {
        this.position = position;
        this.dimensions = new Dimensions(dimensions);
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
