import Tool from './tool';

export default class Hammer extends Tool {
	constructor(durability?: number, damage?: number) {
		const dur = durability || Math.floor(Math.random() * 20);
		const dmg = damage || 5;

		super(dur, dmg);
	}

	getDurability() {
		return this.durability;
	}

	getDamage() {
		return this.damage;
	}
}
