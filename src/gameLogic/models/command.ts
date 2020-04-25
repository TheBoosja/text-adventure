import { CommandWord } from '../types';

export default class Command {
	private commandWord: CommandWord;
	private subject: string | null;
	private raw: string;

	constructor(commandWord: CommandWord, subject: string | null, rawStr: string) {
		this.commandWord = commandWord;
		this.subject = subject;
		this.raw = rawStr;
	}

	getCommandWord() {
		return this.commandWord;
	}

	getSubject() {
		return this.subject;
	}

	getRaw() {
		return this.raw;
	}

	isUnknown() {
		return this.commandWord === CommandWord.UNKNOWN;
	}

	hasSubject() {
		return this.subject != null;
	}
}
