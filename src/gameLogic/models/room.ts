import Coord from './location';
import Door from './door';
import { Direction, RoomTypes, IInteractable } from '../types';
import DirectionArray from './builtIns/directionArray';
import { IDtoRoom } from '../types';

export default class Room implements IInteractable {
	readonly coord: Coord;

	private _type: RoomTypes;
	private _doors: Map<Direction, Door>;

	constructor(location: Coord, type: RoomTypes = RoomTypes.EMPTY) {
		this.coord = location;
		this._type = type;
		this._doors = new Map();
	}

	get doors(): Door[] {
		return Object.values(this._doors);
	}

	get exits(): Direction[] {
		return DirectionArray.from(this._doors.keys()).sort();
	}

	getDoor(direction: Direction) {
		return this._doors.get(direction) || null;
	}

	setDoor(direction: Direction, door: Door) {
		this._doors.set(direction, door);
	}

	getInfo(): IDtoRoom {
		return {
			_type: Room.name,
			type: this._type,
			exits: this.exits,
		};
	}
}
