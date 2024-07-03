import { Entity } from '../_Player';

export class Renderer {
	renderSquare(ctx: CanvasRenderingContext2D, entity: Entity) {
		ctx.fillStyle = entity.color.get();

		const { x, y } = entity.position.getPosition();
		const { width, height } = entity.dimensions.get();
		ctx.fillRect(x, y, width, height);
	}

	private static instance: Renderer | null = null;

	public static getInstance() {
		if (Renderer.instance === null) {
			Renderer.instance = new Renderer();
		}

		return Renderer.instance;
	}

	private constructor() {}
}
