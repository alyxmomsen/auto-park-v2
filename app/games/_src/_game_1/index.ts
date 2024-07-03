import { KeyObserver } from "./_classes/_KeyObserver.ts";
import { Enemy, Player } from "./_classes/_Player";
import { Renderer } from "./_classes/_Renderer";

export default class MyGame {
    private static instance: MyGame | null = null;
    
    public keyObserver: KeyObserver;
    public renderer: Renderer;

    player:Player;
    enemies: Enemy[];
    
    setEnemy() {
        this.enemies.push(new Enemy());
    }

    public update() {
    
        this.keyObserver.getAllKeys().includes('w') ? this.player.moveUp() : null;
        this.keyObserver.getAllKeys().includes('s') ? this.player.moveDown() : null;
        this.keyObserver.getAllKeys().includes('a') ? this.player.moveLeft() : null;
        this.keyObserver.getAllKeys().includes('d') ? this.player.moveRight() : null;
    }
    
    public render(ctx: CanvasRenderingContext2D | null) {
        
        if (ctx) {
            
            this.player.render(ctx , this.renderer);
            this.enemies.forEach(elem => elem.render(ctx , this.renderer));
        }

    }
    
    public static instanceGame():MyGame|null {
        
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
    }
}


// export default Game;
