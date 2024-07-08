import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, NoCombat } from '../_Combat';
import { Position } from '../_Position';

export class Bullet extends Character {
	fireBehavior(): void {}

	constructor(position: { x: number; y: number }, movVelo: { x: number; y: number }) {
		super(
			new BulletPosition(position.x, position.y),
			{ width: 25, height: 25 },
			new Color(/* '#9c3278' */),
			new NoCombat(),
			movVelo, 
			"bullet",
		);
	}
}

export class BulletPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}
