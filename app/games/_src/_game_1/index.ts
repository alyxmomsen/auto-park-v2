import { DebugEntity } from './_classes/_DebugEntity';
import { Enemy } from './_classes/_Enemy';
import { Entity } from './_classes/_Entity';
import { KeyObserver } from './_classes/_KeyObserver.ts';
import { Player } from './_classes/_Player';
import { Renderer } from './_classes/_Renderer';
import { Bullet as AttackEntity } from './_classes/_Bullet';

export default class MyGame {
	private static instance: MyGame | null = null;
	private canvasContext: CanvasRenderingContext2D | null;
	public keyObserver: KeyObserver;
	public renderer: Renderer;

	player: Player;
	enemies: Enemy[];
	attackEntities: AttackEntity[] = [];
	debugEntity: DebugEntity;

	private setCanvas(canvasContext: CanvasRenderingContext2D) {
		this.canvasContext = canvasContext;
	}

	private setCanvasSize(size: number) {
		if (this.canvasContext && this.canvasContext.canvas) {
			this.canvasContext.canvas.width = size;
			this.canvasContext.canvas.height = size;
		}
	}

	setEnemy({ position }: { position: { x: number; y: number } }) {
		this.enemies.push(new Enemy({ position }));
	}

	makeAttackEntity(origin: Entity, positionDelta: { x: 1 | 0 | -1; y: 1 | 0 | -1 }) {
		const { x, y } = this.player.movement.positionOfOrigin.getPosition();
		const { width, height } = this.player.dimensions.get();

		const bulletStartSpeed = 2;

		if (origin.combat.isReady()) {
			this.attackEntities.push(
				new AttackEntity(
					{
						x:
							positionDelta.x !== 0
								? positionDelta.x > 0
									? (x + width * positionDelta.x) + 1
									: x - 1 - width
								: x + width / 2,
						y:
							positionDelta.y !== 0
								? positionDelta.y > 0
									? (y + height * positionDelta.y) + 1
									: y - height - 1
								: y + height / 2,
					},
					{
						x: positionDelta.x * bulletStartSpeed,
						y: positionDelta.y * bulletStartSpeed,
					}
				)
			);
		}
	}

	init({ canvasContext = null, size }: { canvasContext?: CanvasRenderingContext2D | null; size: number }) {
		if (canvasContext) {
			this.canvasContext = canvasContext;
		}

		this.setCanvasSize(500);
	}

	public update() {
		this.keyObserver.getAllKeys().includes('w') ? this.player.moveUp() : null;
		this.keyObserver.getAllKeys().includes('s') ? this.player.moveDown() : null;
		this.keyObserver.getAllKeys().includes('a') ? this.player.moveLeft() : null;
		this.keyObserver.getAllKeys().includes('d') ? this.player.moveRight() : null;
		this.keyObserver.getAllKeys().includes('ArrowUp') ? this.makeAttackEntity(this.player, { x: 0, y: -1 }) : null;
		this.keyObserver.getAllKeys().includes('ArrowDown') ? this.makeAttackEntity(this.player, { x: 0, y: 1 }) : null;
		this.keyObserver.getAllKeys().includes('ArrowLeft') ? this.makeAttackEntity(this.player, { x: -1, y: 0 }) : null;
		this.keyObserver.getAllKeys().includes('ArrowRight') ? this.makeAttackEntity(this.player, { x: 1, y: 0 }) : null;

		if (this.attackEntities.length > 10) this.attackEntities.shift();
		/* --- */

		this.player.update([...this.enemies, ...this.attackEntities]);

		this.enemies.forEach((elem) =>
			elem.update([this.player, ...this.attackEntities, ...this.enemies.filter((enemy) => enemy !== elem)])
		);
		this.attackEntities.forEach((elem) =>
			elem.update([this.player, ...this.enemies, ...this.attackEntities.filter((bullet) => bullet !== elem)])
		);
	}

	public render(ctx: CanvasRenderingContext2D | null) {
		if (ctx) {
			this.player.render(ctx, this.renderer);
			this.enemies.forEach((elem) => elem.render(ctx, this.renderer));
			this.attackEntities.forEach((elem) => elem.render(ctx, this.renderer));
		}
	}

	public static instanceGame(): MyGame | null {
		if (this.instance === null) {
			this.instance = new MyGame();
		}

		return this.instance;
	}

	private constructor() {
		this.player = new Player({ position: { x: 300, y: 300 } });
		this.enemies = [
			new Enemy({ position: { x: 100, y: 100 } }),
			new Enemy({ position: { x: 600, y: 300 } }),
			// new Enemy({ position: {x:800 , y:800} }) ,
		];
		this.keyObserver = KeyObserver.getInstance();
		this.renderer = Renderer.getInstance();
		this.canvasContext = null;
		this.debugEntity = new DebugEntity({ position: { x: -100, y: -100 } });
	}
}

