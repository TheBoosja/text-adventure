import Room from '../models/room';
import { Direction } from '../types';
import CoordManager from './coordManager';

export default class WorldManager {
	private static instance: WorldManager;

	private allRooms: Room[] = [];

	private constructor() {}

	static get() {
		if (!WorldManager.instance) {
			WorldManager.instance = new WorldManager();
		}

		return WorldManager.instance;
	}

	addRooms(...rooms: Room[]) {
		this.allRooms.push(...rooms);
	}

	getExistingDirections(room: Room) {
		return this.allRooms.reduce((directions, r) => {
			const direction = CoordManager.get().getImmediateDirection(room.coord, r.coord);
			if (direction !== Direction.INVALID) {
				return {
					...directions,
					[direction]: r,
				};
			}

			return directions;
		}, {} as { [key in Direction]: Room });
	}
}
