import { Direction } from '../../types';
import { getDirectionValues } from '../../utils';

export default class DirectionArray extends Array<Direction> {
	private indecies = getDirectionValues().reduce((sortKeys, dir, index) => {
		return {
			...sortKeys,
			[dir]: index + 1,
		};
	}, {} as { [key in Direction]: number });

	static from(iterable: Iterable<Direction> | ArrayLike<Direction>) {
		return super.from(iterable) as DirectionArray;
	}

	sort() {
		return super.sort((a, b) => {
			return this.indecies[a] - this.indecies[b];
		});
	}
}
