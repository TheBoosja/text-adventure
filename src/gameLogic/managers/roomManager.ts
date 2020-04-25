import Room from '../models/room';
import { Direction, RoomTypes } from '../types';
import CoordManager from './coordManager';
import DoorManager from './doorManager';
import { getDirectionValues, getOpposite } from '../utils';
import Door from '../models/door';
import WorldManager from './worldManager';

export default class RoomManager {
	private static instance: RoomManager;

	private constructor() {}
	static get() {
		if (!RoomManager.instance) {
			RoomManager.instance = new RoomManager();
		}

		return RoomManager.instance;
	}

	/**
	 * Create a new Room adjacent to fromRoom.
	 * @param fromRoom The adjacent room
	 * @param direction The direction to the adjacent room
	 */
	createRoomFrom(fromRoom: Room, direction: Direction) {
		const location = CoordManager.get().createCoordfrom(fromRoom.coord, direction);

		return new Room(location, this.getRandomRoomType());
	}

	hasDoorWith(room: Room, compareRoom: Room) {
		return room.doors.some((d) => DoorManager.get().getOtherRoom(d, room) === compareRoom);
	}

	createRandomizedRooms(room: Room) {
		const existingDirectionRooms = WorldManager.get().getExistingDirections(room);

		const existingDirections = Object.keys(existingDirectionRooms);
		const missingDirections = getDirectionValues().filter((d) => {
			return !existingDirections.includes(d);
		});
		// console.log('dirs', { existingDirections, missingDirections });

		for (const direction of missingDirections) {
			const newRoom = this.createRoomFrom(room, direction);
			const newDoor = new Door(room, newRoom);
			room.setDoor(direction, newDoor);
			newRoom.setDoor(getOpposite(direction), newDoor);

			WorldManager.get().addRooms(newRoom);
		}

		for (const existingEntry of Object.entries(existingDirectionRooms)) {
			const direction = existingEntry[0] as Direction;
			const existingRoom = existingEntry[1];

			if (existingRoom) {
				if (!this.hasDoorWith(existingRoom, room)) {
					const newDoor = new Door(room, existingRoom);
					room.setDoor(direction, newDoor);
					existingRoom.setDoor(getOpposite(direction), newDoor);
				}
			}
		}
	}

	getRandomRoomType() {
		const types = Object.values(RoomTypes);
		const rndIndex = Math.floor(Math.random() * types.length);

		return types[rndIndex];
	}
}
