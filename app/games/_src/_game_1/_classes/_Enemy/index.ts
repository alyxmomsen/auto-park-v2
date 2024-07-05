import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat } from '../_Combat';
import { Position } from '../_Position';

export class EnemyPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Enemy extends Character {
	fireBehavior() {}
	constructor() {
		super(new EnemyPosition(100, 100), { width: 50, height: 50 }, new Color('#379'), new Combat(200), {
			x: 0,
			y: 0,
		});
	}
}
