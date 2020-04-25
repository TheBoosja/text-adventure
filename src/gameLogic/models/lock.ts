import { LockTypes } from '../types';

export default class Lock {
	type: LockTypes = LockTypes.BRASS;
	isLocked: boolean = false;
	durability: number = 5;
}
