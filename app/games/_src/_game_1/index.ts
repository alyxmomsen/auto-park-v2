import { KeyObserver } from './_classes/_KeyObserver.ts';
import { Enemy, Entity, Player } from './_classes/_Player';
import { Renderer } from './_classes/_Renderer';
import { Bullet } from './_classes/Bullet';

export default class MyGame {
    private static instance: MyGame | null = null;
    private canvasContext: CanvasRenderingContext2D | null;
    public keyObserver: KeyObserver;
    public renderer: Renderer;

    player: Player;
    enemies: Enemy[];
    bullets: Bullet[] = [];
    
    private setCanvas(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
    }

    private setCanvasSize(size: number) {
        
        if (this.canvasContext && this.canvasContext.canvas) {
            
            this.canvasContext.canvas.width = size;
            this.canvasContext.canvas.height = size;
        }

    }

    setEnemy() {
        this.enemies.push(new Enemy());
    }

    makeBullet(entity: Entity, positionDelta: {x:1|0|-1 , y:1|0|-1}) {

        const {x ,y } = this.player.position.getPosition();
        const { width, height } = this.player.dimensions.get();
        
        const bulletStartSpeed = 50;

        if (entity.combat.isReady()) {

            console.log(positionDelta , positionDelta.x * x);
            
            this.bullets.push(new Bullet({
                x: positionDelta.x !== 0
                    ? positionDelta.x > 0
                        ? x + (width * positionDelta.x) 
                        : x
                    : x  + (width / 2),
                y:positionDelta.y !== 0
                    ? positionDelta.y > 0
                        ? y + (height * positionDelta.y) 
                        : y 
                    : y + (height / 2),
            } , {
                x: positionDelta.x !== 0
                    ? positionDelta.x * bulletStartSpeed
                    : 0,
                y: positionDelta.y !== 0
                    ? positionDelta.y * bulletStartSpeed
                    : 0,
            }));
        }

    }
    
    init({canvasContext = null , size }:{canvasContext?:CanvasRenderingContext2D|null , size:number}) {
        if (canvasContext) {
            this.canvasContext = canvasContext;
        }

        this.setCanvasSize(800);
    }

    public update() {
        
		this.keyObserver.getAllKeys().includes('w') ? this.player.moveUp() : null;
		this.keyObserver.getAllKeys().includes('s') ? this.player.moveDown() : null;
		this.keyObserver.getAllKeys().includes('a') ? this.player.moveLeft() : null;
        this.keyObserver.getAllKeys().includes('d') ? this.player.moveRight() : null;
        this.keyObserver.getAllKeys().includes('ArrowUp') ? this.makeBullet(this.player, {x:0 , y:-1}) : null;
        this.keyObserver.getAllKeys().includes('ArrowDown') ? this.makeBullet(this.player, {x:0 , y:1}) : null;
        this.keyObserver.getAllKeys().includes('ArrowLeft') ? this.makeBullet(this.player, {x:-1 , y:0}) : null;
        this.keyObserver.getAllKeys().includes('ArrowRight') ? this.makeBullet(this.player, {x:1 , y:0}) : null;
        
        /* --- */

        this.player.update();
        this.enemies.forEach(elem => elem.update());
        this.bullets.forEach(elem => elem.update());
	}

	public render(ctx: CanvasRenderingContext2D | null) {
		if (ctx) {
			this.player.render(ctx, this.renderer);
            this.enemies.forEach((elem) => elem.render(ctx, this.renderer));
            this.bullets.forEach(elem => elem.render(ctx , this.renderer));
		}
	}

	public static instanceGame(): MyGame | null {
		if (this.instance === null) {
			this.instance = new MyGame();
		}

		return this.instance;
	}

	private constructor() {
		this.player = new Player();
		this.enemies = [];
		this.keyObserver = KeyObserver.getInstance();
        this.renderer = Renderer.getInstance();
        this.canvasContext = null;
	}
}

// export default Game;
