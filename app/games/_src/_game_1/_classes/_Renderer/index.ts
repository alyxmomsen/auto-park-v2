import { Entity } from '../_Entity';
// why it is the Singleton
export class RendererSingleton {
	renderSquare(ctx: CanvasRenderingContext2D, entity: Entity) {
		ctx.fillStyle = entity.color.get();

		const { x, y } = entity.movement.positionOfOrigin.getPosition();
		const { width, height } = entity.dimensions.get();
		ctx.fillRect(x, y, width, height);
	}

	renderText(ctx: CanvasRenderingContext2D, entity: Entity) {
		ctx.fillStyle = entity.color.get();

		ctx.fillStyle = "blue";
		ctx.font = "bold 16px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const { x, y } = entity.movement.positionOfOrigin.getPosition();
		ctx.fillText(entity.combat.IsReady() ?  "" : "reload".toUpperCase(), (x), (y));

	}

	renderHealthState(ctx: CanvasRenderingContext2D, entity: Entity) {
		ctx.fillStyle = entity.color.get();

		ctx.fillStyle = "green";
		ctx.font = "bold 16px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const { x, y } = entity.movement.positionOfOrigin.getPosition();
		ctx.fillText(entity.health.get().toLocaleString().toUpperCase(), (x), (y + 13));

	}
	
	private static instance: RendererSingleton | null = null;

	public static getInstance() {
		if (RendererSingleton.instance === null) {
			RendererSingleton.instance = new RendererSingleton();
		}

		return RendererSingleton.instance;
	}

	private constructor() {}
}
