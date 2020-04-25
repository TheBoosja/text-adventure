import {
	IHistoryItem,
	IHistoryItemUNKNOWN,
	IHistoryItemSTART,
	IHistoryItemGO,
	IDtoStart,
	IDtoRoom,
} from '../gameLogic';

export type TranslationLineStyle = 'normal' | 'typeface' | 'title' | 'error';
export interface ITranslationLine {
	dictionaryStr: string;
	style: TranslationLineStyle;
	lines?: ITranslationLine[];
}

export default class TranslationService {
	static toTranslationLine(history: IHistoryItem): ITranslationLine {
		switch (history.actionType) {
			default:
			case 'UNKNOWN':
				return this.toUnknownLine(history as IHistoryItemUNKNOWN);
			// case 'HELP':
			// 	return toHelpLine(history);
			case 'START':
				return this.toStartLine(history as IHistoryItemSTART);
			case 'GO':
				return this.toRoomLine(history as IHistoryItemGO);
		}
	}

	private static toUnknownLine(history: IHistoryItemUNKNOWN): ITranslationLine {
		const result: ITranslationLine = this.genActionStr(history.commandStr);
		if (!result.lines) {
			result.lines = [];
		}

		if (history.error) {
			result.lines.push(...this.getDefaultErrors(history.error));
		}

		return result;
	}

	private static toStartLine(history: IHistoryItemSTART): ITranslationLine {
		let result: ITranslationLine;

		if (history.error) {
			result = this.genActionStr(history.commandStr);
			if (!result.lines) {
				result.lines = [];
			}

			result.lines.push(...this.getDefaultErrors(history.error));
			return result;
		}

		result = this.trannyLine('{INTRO-1}', 'title');
		if (!result.lines) {
			result.lines = [];
		}

		result.lines.push(this.trannyLine('{INTRO-2}', 'normal'));
		result.lines.push(...this.getRoomInfo((history.actionable as IDtoStart).room));

		return result;
	}

	// private static toHelpLine(history: IHistoryItem): ITranslationLine[] {
	// 	const result: ITranslationLine[] = [this.genActionStr(history.commandStr)];

	// 	if (history.error) {
	// 		result.push({ dictionaryStr: history.error, style: 'error' });
	// 		return result;
	// 	}

	// 	const helpInfo = history.actionable as IDtoHelp;
	// 	const actionStr = '{ACTION-3}: ' + helpInfo.actions.map((a) => `{ACTION-${a}}`).join(', ');

	// 	result.push({ dictionaryStr: actionStr, style: 'normal' });

	// 	return result;
	// }

	private static toRoomLine(history: IHistoryItemGO): ITranslationLine {
		const result: ITranslationLine = this.genActionStr(history.commandStr);
		if (!result.lines) {
			result.lines = [];
		}

		if (history.error) {
			switch (history.error) {
				case 'NO_SUBJECT':
				default:
					result.lines.push(this.trannyLine('{ACTION-ERR-3}', 'error'));
					break;
				case 'INVALID_SUBJECT':
					result.lines.push(this.trannyLine('{ACTION-ERR-4}', 'error'));
					break;
			}

			return result;
		}

		result.lines.push(...this.getRoomInfo(history.actionable as IDtoRoom));

		return result;
	}

	private static trannyLine(dictionaryStr: string, style: TranslationLineStyle): ITranslationLine {
		return { dictionaryStr, style };
	}

	private static genActionStr(commandStr: string): ITranslationLine {
		return { dictionaryStr: `>  ${commandStr}`, style: 'typeface', lines: [] };
	}

	private static getDefaultErrors(error: string): ITranslationLine[] {
		const result: ITranslationLine[] = [];

		switch (error) {
			default:
			case 'BAD_REQUEST':
				result.push(this.trannyLine('{ACTION-ERR-1}', 'error'));
				break;
			case 'FORBIDDEN':
				result.push(this.trannyLine('{ACTION-ERR-2}', 'error'));
				break;
		}

		return result;
	}

	private static getRoomInfo(roomInfo: IDtoRoom): ITranslationLine[] {
		const result: ITranslationLine[] = [this.trannyLine(`{ROOM-1} {ROOM-${roomInfo.type}-1}`, 'normal')];

		const directions = roomInfo.exits.map((e) => `{${this.getDictionaryKeyFromDirection(e)}}`).join(', ');
		const exitStr = '{ROOM-2}: ' + directions;
		result.push(this.trannyLine(exitStr, 'normal'));

		return result;
	}

	private static getDictionaryKeyFromDirection(direction: string) {
		switch (direction) {
			case 'NORTH':
				return 'DIRECTION-1';
			case 'EAST':
				return 'DIRECTION-2';
			case 'SOUTH':
				return 'DIRECTION-3';
			case 'WEST':
				return 'DIRECTION-4';
			case 'UP':
				return 'DIRECTION-5';
			case 'DOWN':
				return 'DIRECTION-6';
		}
	}
}
