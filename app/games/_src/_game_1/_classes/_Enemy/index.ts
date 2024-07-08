import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, GunCombat } from '../_Combat';
import { Position } from '../_Position';

export class EnemyPosition extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Enemy extends Character {
	fireBehavior() {}
	constructor({ position: { x, y } }: { position: { x: number; y: number } }) {
		super(new EnemyPosition(x, y), { width: 50, height: 50 }, new Color('#379'), new GunCombat(), {
			x: 0,
			y: 0,
		} , "enemy");
	}
}
