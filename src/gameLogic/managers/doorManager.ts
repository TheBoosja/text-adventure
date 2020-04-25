import Door from '../models/door';
import Room from '../models/room';

export default class DoorManager {
	private static instance: DoorManager;

	private constructor() {}
	static get() {
		if (!DoorManager.instance) {
			DoorManager.instance = new DoorManager();
		}

		return DoorManager.instance;
	}

	getOtherRoom(door: Door, otherThan: Room) {
		const r1 = door.getRoom1();
		const r2 = door.getRoom2();

		if (r1 !== otherThan) {
			return r1;
		} else {
			return r2;
		}
	}
}
