import Room from './room';
import Item from './item';

export default class Character {
	private static currentRoom: Room;

	name: string;
	private inventory: Item[] = [];

	constructor(name: string, currentRoom: Room) {
		this.name = name;
		Character.currentRoom = currentRoom;
	}

	static getCurrentRoom() {
		return Character.currentRoom;
	}

	static setCurrentRoom(room: Room) {
		Character.currentRoom = room;
	}

	getInventory() {
		return this.inventory;
	}

	addItem(item: Item) {
		this.inventory.push(item);
	}
}
