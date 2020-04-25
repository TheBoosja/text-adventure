import Item from '../item';

export default abstract class Tool extends Item {
	protected damage: number;

	constructor(durability: number, damage: number) {
		super(durability);

		this.damage = damage;
	}
}
