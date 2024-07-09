import { Character } from '../_Character';
import { Color } from '../_Color';
import { Combat, GunCombat, MinigunCombat } from '../_Combat';
import { Position } from '../_Position';

export class PlayerPostion extends Position {
	constructor(x: number, y: number) {
		super({ x, y });
	}
}

export class Player extends Character {
	fireBehavior() {}
	constructor() {
		super(
			new PlayerPostion(0, 0),
			{ width: 50, height: 50 },
			new Color('#2a2869'),
			new GunCombat(),
			{
				x: 0,
				y: 0,
			},
			'player'
		);
	}
}
