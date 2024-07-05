
import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat } from '../_Combat';
import { Entity } from '../_Entity';
import { Position } from '../_Position';

class PlayerPostion extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Player extends Character {
	fireBehavior() {}
	constructor() {
		super(new PlayerPostion(0, 0), { width: 50, height: 100 }, new Color('#2a2869'), new Combat(50), {
			x: 0,
			y: 0,
		});
	}
}


