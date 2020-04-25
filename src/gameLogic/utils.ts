import { Direction, CommandWord } from './types';

export function getDirectionValues(): Direction[] {
	// console.log('directionValues', Object.values(Direction), Object.keys(Direction));
	return Object.values(Direction).filter((d) => d !== Direction.INVALID) as Direction[];
}

export function getDirectionKeys(): string[] {
	return Object.keys(Direction).filter((d) => d !== Direction.INVALID) as string[];
}

export function getOpposite(direction: Direction): Direction {
	switch (direction) {
		case Direction.NORTH:
			return Direction.SOUTH;
		case Direction.EAST:
			return Direction.WEST;
		case Direction.SOUTH:
			return Direction.NORTH;
		case Direction.WEST:
			return Direction.EAST;
		case Direction.UP:
			return Direction.DOWN;
		case Direction.DOWN:
			return Direction.UP;
		default:
			return Direction.INVALID;
	}
}

export function getCommandWordValues(): CommandWord[] {
	return Object.values(CommandWord).filter((cw) => cw !== CommandWord.UNKNOWN) as CommandWord[];
}

export function getCommandWordKeys(): string[] {
	return Object.keys(CommandWord).filter((cw) => cw !== CommandWord.UNKNOWN) as string[];
}

export function toTitleCase(str: string) {
	return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
