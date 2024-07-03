import { Enemy, Player } from "./_classes/_Player";

export default class MyGame {
    private static instance: MyGame|null = null;

    player = new Player();
    enemies:Enemy[] = []
    
    setEnemy() {
        this.enemies.push(new Enemy());
    }

    public update() {
        
    }
    
    public render() {
        
    }
    
    public static instanceGame():MyGame|null {
        
        if (this.instance === null) {

            this.instance = new MyGame();
        }

        return this.instance;
    }

    private constructor() {
        
    }
}


// export default Game;

