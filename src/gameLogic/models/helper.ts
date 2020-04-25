import Command from './command';
import { toTitleCase } from '../utils';

export default class Helper {
	static genCommandStr(cmd: Command): string {
		let str = '';

		const command = toTitleCase(cmd.getCommandWord());

		str = command;
		if (cmd.hasSubject()) {
			const subject = cmd.getSubject() || '';
			str += ` ${subject}`;
		}

		return str;
	}
}
