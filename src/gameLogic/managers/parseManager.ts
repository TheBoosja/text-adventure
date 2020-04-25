import CommandWords from '../models/commandWords';
import Command from '../models/command';
import { CommandWord } from '../types';

export default class Parser {
	private commands: CommandWords;

	constructor() {
		this.commands = new CommandWords();
	}

	getCommand(inputString: string) {
		const words = inputString.split(' ', 2);

		const cmdWord = this.commands.getCommandWord(words[0]);

		let subject = words[1] || null;
		if (cmdWord === CommandWord.UNKNOWN) {
			subject = words[0];
		}

		return new Command(cmdWord, subject, inputString);
	}
}
