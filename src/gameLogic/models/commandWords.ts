import { CommandWord } from '../types';

export default class CommandWords {
	private validCommands: Map<string, CommandWord>;

	constructor() {
		this.validCommands = new Map();
		Object.values(CommandWord)
			.filter((cw) => cw !== CommandWord.UNKNOWN)
			.forEach((cw) => this.validCommands.set(cw.toString(), cw));
	}

	/**
	 * Find the CommandWord associatioed with a command word.
	 * @param commandWord The word to look up
	 */
	getCommandWord(commandWord: string): CommandWord {
		const cmd = this.validCommands.get(commandWord.toUpperCase());
		return cmd || CommandWord.UNKNOWN;
	}

	/**
	 * Check whether a given string is a valid command word.
	 */
	isCommand(str: string) {
		return this.getCommandStrings().includes(str);
	}

	/**
	 * Get a string array with all valid commands.
	 */
	getCommandStrings() {
		return Object.keys(CommandWord);
	}
}
