import Lock from './lock';
import Room from './room';

export default class Door {
	durability: number;
	lock: Lock;
	private room1: Room;
	private room2: Room;

	constructor(room1: Room, room2: Room) {
		this.durability = 20;
		this.lock = new Lock();
		this.room1 = room1;
		this.room2 = room2;
	}

	getRoom1() {
		return this.room1;
	}

	getRoom2() {
		return this.room2;
	}
}
