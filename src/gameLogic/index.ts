import GameManager from './managers/gameManager';

const gameManager = new GameManager();
export default {
	parseInput: (inputStr: string) => gameManager.parseInput(inputStr),
};
export * from './types';
