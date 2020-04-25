import { Direction } from '../types';
import Coord from '../models/location';

export default class CoordManager {
	private static instance: CoordManager;

	private constructor() {}
	static get() {
		if (!CoordManager.instance) {
			CoordManager.instance = new CoordManager();
		}

		return CoordManager.instance;
	}

	createCoordfrom(coord: Coord, direction: Direction) {
		let newX = coord.x;
		let newY = coord.y;
		let newZ = coord.z;

		switch (direction) {
			case Direction.NORTH:
				newY += 1;
				break;
			case Direction.EAST:
				newX += 1;
				break;
			case Direction.SOUTH:
				newY -= 1;
				break;
			case Direction.WEST:
				newX -= 1;
				break;
			case Direction.UP:
				newZ += 1;
				break;
			case Direction.DOWN:
				newZ -= 1;
				break;
		}

		return new Coord(newX, newY, newZ);
	}

	/**
	 * Whether this is directly <Direction> of location.
	 * @param direction
	 * @param coord
	 */
	isCoordDirectly(direction: Direction, coord: Coord, compareCoord: Coord) {
		const xDiff = compareCoord.x - coord.x;
		const yDiff = compareCoord.y - coord.y;
		const zDiff = compareCoord.z - coord.z;

		switch (direction) {
			case Direction.EAST:
				return xDiff === 1 && yDiff === 0 && zDiff === 0;
			case Direction.WEST:
				return xDiff === -1 && yDiff === 0 && zDiff === 0;
			case Direction.NORTH:
				return xDiff === 0 && yDiff === 1 && zDiff === 0;
			case Direction.SOUTH:
				return xDiff === 0 && yDiff === -1 && zDiff === 0;
			case Direction.UP:
				return xDiff === 0 && yDiff === 0 && zDiff === 1;
			case Direction.DOWN:
				return xDiff === 0 && yDiff === 0 && zDiff === -1;
		}
	}

	/**
	 * Get the direction in which location is to this.
	 * @param coord
	 */
	getImmediateDirection(coord: Coord, compareCoord: Coord): Direction {
		const xDiff = compareCoord.x - coord.x;
		const yDiff = compareCoord.y - coord.y;
		const zDiff = compareCoord.z - coord.z;

		if (xDiff === 1 && yDiff === 0 && zDiff === 0) {
			return Direction.EAST;
		} //
		else if (xDiff === -1 && yDiff === 0 && zDiff === 0) {
			return Direction.WEST;
		} //
		else if (xDiff === 0 && yDiff === 1 && zDiff === 0) {
			return Direction.NORTH;
		} //
		else if (xDiff === 0 && yDiff === -1 && zDiff === 0) {
			return Direction.SOUTH;
		} //
		else if (xDiff === 0 && yDiff === 0 && zDiff === 1) {
			return Direction.UP;
		} //
		else if (xDiff === 0 && yDiff === 0 && zDiff === -1) {
			return Direction.DOWN;
		}

		return Direction.INVALID;
	}
}
