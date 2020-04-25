// Types
import {
	Direction,
	CommandWord,
	IDtoStart,
	IHistoryItemUNKNOWN,
	IHistoryItemSTART,
	IHistoryItemGO,
	IHistoryItemINSPECT,
} from '../types';
import { IHistoryItem } from '../types';

// Managers
import ParseManager from './parseManager';
import WorldManager from './worldManager';
import RoomManager from './roomManager';
import DoorManager from './doorManager';

// Models
import Character from '../models/character';
import Command from '../models/command';
import Door from '../models/door';
import Coord from '../models/location';
import Room from '../models/room';

export default class GameManager {
	private isInitialized: boolean = false;
	private history: IHistoryItem[] = [];

	private mngPARS: ParseManager;
	private mngWRLD: WorldManager;
	private mngROOM: RoomManager;
	private mngDOOR: DoorManager;

	constructor() {
		this.mngPARS = new ParseManager();
		this.mngWRLD = WorldManager.get();
		this.mngROOM = RoomManager.get();
		this.mngDOOR = DoorManager.get();
	}

	parseInput(inputStr: string): IHistoryItem[] {
		const command = this.mngPARS.getCommand(inputStr);
		const progression = this.processCommand(command);

		this.history.push(progression);

		return this.getHistory();
	}

	private initWorld(): void {
		const initialRoom = new Room(new Coord(0, 0, 0));

		const northernRoom = this.mngROOM.createRoomFrom(initialRoom, Direction.NORTH);
		const easternRoom = this.mngROOM.createRoomFrom(initialRoom, Direction.EAST);
		const southernRoom = this.mngROOM.createRoomFrom(initialRoom, Direction.SOUTH);
		const westernRoom = this.mngROOM.createRoomFrom(initialRoom, Direction.WEST);
		const upRoom = this.mngROOM.createRoomFrom(initialRoom, Direction.UP);
		const downRoom = this.mngROOM.createRoomFrom(initialRoom, Direction.DOWN);

		const northernDoor = new Door(initialRoom, northernRoom);
		const easternDoor = new Door(initialRoom, easternRoom);
		const southernDoor = new Door(initialRoom, southernRoom);
		const westernDoor = new Door(initialRoom, westernRoom);
		const upDoor = new Door(initialRoom, upRoom);
		const downDoor = new Door(initialRoom, downRoom);

		initialRoom.setDoor(Direction.NORTH, northernDoor);
		northernRoom.setDoor(Direction.SOUTH, northernDoor);

		initialRoom.setDoor(Direction.EAST, easternDoor);
		easternRoom.setDoor(Direction.WEST, easternDoor);

		initialRoom.setDoor(Direction.SOUTH, southernDoor);
		southernRoom.setDoor(Direction.NORTH, southernDoor);

		initialRoom.setDoor(Direction.WEST, westernDoor);
		westernRoom.setDoor(Direction.EAST, westernDoor);

		initialRoom.setDoor(Direction.UP, upDoor);
		upRoom.setDoor(Direction.DOWN, upDoor);

		initialRoom.setDoor(Direction.DOWN, downDoor);
		downRoom.setDoor(Direction.UP, downDoor);

		this.mngWRLD.addRooms(initialRoom, northernRoom, easternRoom, southernRoom, westernRoom, upRoom, downRoom);

		const player = new Character('The Davenator', initialRoom);
		Character.setCurrentRoom(initialRoom);
	}

	private processCommand(command: Command): IHistoryItem {
		let result: IHistoryItem;
		const cmdWord = command.getCommandWord();

		if (!this.isInitialized && cmdWord !== CommandWord.START) {
			return {
				actionType: CommandWord.UNKNOWN,
				commandStr: command.getRaw(),
				actionable: null,
				error: 'FORBIDDEN',
			} as IHistoryItemUNKNOWN;
		}

		switch (cmdWord) {
			default:
			case CommandWord.UNKNOWN:
				result = this.handleUnknown(command);
				break;
			// case CommandWord.HELP:
			// 	result = this.getHelp(command);
			// 	break;
			case CommandWord.START:
				result = this.initialize(command);
				break;
			case CommandWord.WALK:
			case CommandWord.GO:
				result = this.goRoom(command);
				break;
			case CommandWord.INSPECT:
			case CommandWord.LOOK:
				result = this.inspect(command);
				break;
		}

		return result;
	}

	private getHistory(limit = 20): IHistoryItem[] {
		let historyItems: IHistoryItem[] = [];

		if (this.history.length <= limit) {
			historyItems = this.history;
		} //
		else {
			historyItems = this.history.slice(this.history.length - limit, this.history.length);
		}

		return historyItems;
	}

	private handleUnknown(command: Command): IHistoryItem {
		if (command.hasSubject()) {
			const isDirection = Direction[command.getSubject()?.toUpperCase() as keyof typeof Direction] !== undefined;
			if (isDirection) {
				return this.goRoom(command);
			}
		}

		return {
			actionType: CommandWord.UNKNOWN,
			commandStr: command.getRaw(),
			actionable: null,
			error: 'BAD_REQUEST',
		} as IHistoryItemUNKNOWN;
	}

	private initialize(command: Command): IHistoryItemSTART {
		if (this.isInitialized) {
			return {
				actionType: CommandWord.START,
				commandStr: command.getRaw(),
				actionable: null,
				error: 'BAD_REQUEST',
			};
		}

		this.history = [];
		this.initWorld();
		this.isInitialized = true;

		const startInfo: IDtoStart = {
			_type: 'Start',
			room: Character.getCurrentRoom().getInfo(),
		};

		return { actionType: CommandWord.START, commandStr: command.getRaw(), actionable: startInfo };
	}

	// private getHelp(command: Command): IHistoryItem {
	// 	const helpInfo: IDtoHelp = {
	// 		_type: 'Help',
	// 		actions: getCommandWordKeys(),
	// 	};

	// 	return { actionType: CommandWord.HELP, commandStr: command.getRaw(), actionable: helpInfo };
	// }

	private goRoom(command: Command): IHistoryItemGO {
		const commandStr = command.getRaw();

		if (!command.hasSubject()) {
			return { actionType: CommandWord.GO, commandStr, actionable: null, error: 'NO_SUBJECT' };
		}

		// Get Direction from subject string
		const dirKey = command.getSubject()?.toUpperCase() as keyof typeof Direction;
		const direction = Direction[dirKey];
		const doorway = Character.getCurrentRoom().getDoor(direction);

		if (doorway === null) {
			return { actionType: CommandWord.GO, commandStr, actionable: null, error: 'INVALID_SUBJECT' };
		}

		Character.setCurrentRoom(this.mngDOOR.getOtherRoom(doorway, Character.getCurrentRoom()));
		this.mngROOM.createRandomizedRooms(Character.getCurrentRoom());

		return { actionType: CommandWord.GO, commandStr, actionable: Character.getCurrentRoom().getInfo() };
	}

	private inspect(command: Command): IHistoryItemINSPECT {
		const commandStr = command.getRaw();

		if (!command.hasSubject()) {
			return { actionType: CommandWord.INSPECT, commandStr, actionable: null, error: 'NO_SUBJECT' };
		}

		switch (command.getSubject()?.toLowerCase()) {
			case 'room':
				break;

			default:
				break;
		}

		return { actionType: CommandWord.INSPECT, commandStr, actionable: null, error: 'NO_SUBJECT' };
	}
}
