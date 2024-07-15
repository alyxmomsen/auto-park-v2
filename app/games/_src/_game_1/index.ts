
import { Enemy } from './_classes/_Enemy';
import { Entity } from './_classes/_Entity';
import { KeyObserver } from './_classes/_KeyObserver.ts';
import { Player } from './_classes/_Player';
import { RendererSingleton } from './_classes/_Renderer';
import { Bullet as AttackEntity } from './_classes/_Bullet';
import { Query } from './_classes/_Query';
import { GameController } from './_classes/_Controller';
import { Slime } from './_classes/__Slime';

export default class MyGame {
	private static instance: MyGame | null = null;
	private canvasContext: CanvasRenderingContext2D | null;
	public keyObserver: KeyObserver;
	public renderer: RendererSingleton;
	public controller: GameController;

	player: Player;
	enemies: Enemy[];
	attackEntities: AttackEntity[] = [];
	things: Entity[];

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
		const { x, y } = origin.movement.positionOfOrigin.getPosition();
		const { width, height } = origin.hitBox.getDimensions();

		const bulletStartSpeed = 31;

		if (origin.combat.checkIfReadyAndReset()) {
			this.attackEntities.push(
				new AttackEntity(
					{
						x:
							positionDelta.x !== 0
								? positionDelta.x > 0
									? x + width * positionDelta.x + 1
									: x - 1 - width
								: x + width / 2,
						y:
							positionDelta.y !== 0
								? positionDelta.y > 0
									? y + height * positionDelta.y + 1
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

	private queriesFromEntities: Query[] = [];

	public addQuery(query: Query) {
		this.queriesFromEntities.push(query);
	}

	public update() {
		this.keyObserver.getAllKeys().includes('w') ? this.player.moveUp() : null;
		this.keyObserver.getAllKeys().includes('s') ? this.player.moveDown() : null;
		this.keyObserver.getAllKeys().includes('a') ? this.player.moveLeft() : null;
		this.keyObserver.getAllKeys().includes('d') ? this.player.moveRight() : null;
		this.keyObserver.getAllKeys().includes('ArrowUp') ? this.makeAttackEntity(this.player, { x: 0, y: -1 }) : null;
		this.keyObserver.getAllKeys().includes('ArrowDown') ? this.makeAttackEntity(this.player, { x: 0, y: 1 }) : null;
		this.keyObserver.getAllKeys().includes('ArrowLeft')
			? this.makeAttackEntity(this.player, { x: -1, y: 0 })
			: null;
		this.keyObserver.getAllKeys().includes('ArrowRight')
			? this.makeAttackEntity(this.player, { x: 1, y: 0 })
			: null;

		/* --- */
		// make entity
		this.queriesFromEntities.forEach((query) => {
			// !query.state.isDone() && query.execute();
		});

		// console.log(this.queriesFromEntities.length);
		/* --- */

		if (this.attackEntities.length > 10) this.attackEntities.shift();
		/* --- */

		this.player.update([
			...this.enemies.filter((elem) => elem.health.get() > 0),
			...this.attackEntities.filter((elem) => elem.health.get() > 0),
			...this.things.filter((elem) => elem.health.get() > 0),
		]);

		this.enemies.forEach(
			(elem) =>
				elem.health.get() > 0 &&
				elem.update(
					[
						this.player,
						...this.attackEntities.filter((elem) => elem.health.get() > 0),
						...this.enemies.filter((enemy) => enemy !== elem).filter((elem) => elem.health.get() > 0),
						...this.things.filter((elem) => elem.health.get() > 0),
					],
					this.controller
				)
		);

		this.attackEntities.forEach(
			(elem) =>
				elem.health.get() > 0 &&
				elem.update([
					this.player,
					...this.enemies.filter((elem) => elem.health.get() > 0),
					...this.attackEntities.filter((bullet) => bullet !== elem).filter((elem) => elem.health.get() > 0),
					...this.things.filter((elem) => elem.health.get() > 0),
				])
		);

		this.things.forEach(thing => {
			thing.health.get() > 0 &&
				thing.update([
					this.player,
					...this.enemies.filter((elem) => elem.health.get() > 0),
					...this.attackEntities.filter((bullet) => bullet !== thing).filter((elem) => elem.health.get() > 0),
					...this.things.filter(elem => elem !== thing ).filter((elem) => elem.health.get() > 0),
				])
		});

		

	}

	public render(ctx: CanvasRenderingContext2D | null) {
		if (ctx) {
			this.enemies.forEach((elem) => elem.render(ctx, this.renderer));
			this.attackEntities.forEach((elem) => elem.render(ctx, this.renderer));
			this.things.forEach(elem => elem.render(ctx, this.renderer));
			this.player.render(ctx, this.renderer);
		}
	}

	public static instanceGame(): MyGame | null {
		if (this.instance === null) {
			this.instance = new MyGame();
		}

		return this.instance;
	}

	private constructor() {
		const rand = (n: number) => Math.floor(Math.random() * n);
		const aspectRatio = (size: number) => ({
			width: () => size * (1024 / 768),
			height: () => size * (768 / 1024),
		});
		const size = 800;
		this.player = new Player({ position: { x: 300, y: 300 } });
		this.enemies = new Array(1)
			.fill(null)
			.map(
				(elem) =>
					new Enemy({ position: { x: rand(aspectRatio(size).width()), y: rand(aspectRatio(size).height()) } })
			);
		this.keyObserver = KeyObserver.getInstance();
		this.renderer = RendererSingleton.getInstance();
		this.canvasContext = null;

		this.controller = new GameController(this);

		this.things = [
			new Slime() ,
			new Slime() ,
			new Slime() ,
		]
	}
}
