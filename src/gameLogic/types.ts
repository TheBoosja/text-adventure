// Enums
export enum CommandWord {
	UNKNOWN = 'UNKNOWN',
	HELP = 'HELP',
	START = 'START',
	GO = 'GO',
	WALK = 'WALK',
	INSPECT = 'INSPECT',
	LOOK = 'LOOK',
}

export enum Direction {
	INVALID = 'INVALID',
	NORTH = 'NORTH',
	EAST = 'EAST',
	SOUTH = 'SOUTH',
	WEST = 'WEST',
	UP = 'UP',
	DOWN = 'DOWN',
}

export enum RoomTypes {
	EMPTY = 'EMPTY',
	STUDY = 'STUDY',
	MEDICALLAB = 'MEDICALLAB',
	LIVINGROOM = 'LIVINGROOM',
	BEDROOM = 'BEDROOM',
	GARDEN = 'GARDEN',
	COMPUTERROOM = 'COMPUTERROOM',
	OFFICE = 'OFFICE',
	COMMROOM = 'COMMROOM',
	DUNGEON = 'DUNGEON',
	CLASSROOM = 'CLASSROOM',
}

export enum DoorTypes {
	WOODEN = 'WOODEN',
	STEEL = 'STEEL',
	PLASTER = 'PLASTER',
}

export enum LockTypes {
	NONE = 'NONE',
	BRASS = 'BRASS',
	STEEL = 'STEEL',
	KEYPAD = 'KEYPAD',
	PADLOCK = 'PADLOCK',
}

// Types
export type ActionErrors = 'BAD_REQUEST' | 'FORBIDDEN';

export type ErrorsUNKNOWN = ActionErrors;
export type ErrorsSTART = ActionErrors;
export type ErrorsGO = ActionErrors | 'NO_SUBJECT' | 'INVALID_SUBJECT';
export type ErrorsINSPECT = ActionErrors | 'NO_SUBJECT' | 'INVALID_SUBJECT';

// Interfaces
export interface IInteractable {
	getInfo(): IDto;
}

export interface IHistoryItem {
	readonly actionType: keyof typeof CommandWord;
	readonly commandStr: string;
	readonly actionable: IDto | null;
	readonly error?: string;
}

export interface IHistoryItemUNKNOWN extends IHistoryItem {
	readonly error?: ErrorsUNKNOWN;
}

export interface IHistoryItemSTART extends IHistoryItem {
	readonly error?: ErrorsSTART;
}

export interface IHistoryItemGO extends IHistoryItem {
	readonly error?: ErrorsGO;
}

export interface IHistoryItemINSPECT extends IHistoryItem {
	readonly error?: ErrorsINSPECT;
}

export interface IDto {
	_type: string;
}

export interface IDtoStart extends IDto {
	room: IDtoRoom;
}

export interface IDtoHelp extends IDto {
	actions: string[];
}

export interface IDtoRoom extends IDto {
	type: keyof typeof RoomTypes;
	exits: (keyof typeof Direction)[];
}

export interface IBreakable {
	durability: number;
}
