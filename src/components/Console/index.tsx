import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import styles from './console.module.scss';

import Game from '../../gameLogic';
import Line from '../Line';
import ScrollContainer from '../ScrollContainer';
import TranslationService, { ITranslationLine } from '../../services/translationService';

function Console() {
	// const history = useSelector(progressionHistory);
	// const dispatch = useDispatch();
	const [lines, setLines] = useState<ITranslationLine[]>([]);
	const [input, setInput] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const historyLines = Game.parseInput(input).map((h) => TranslationService.toTranslationLine(h));
		setLines(historyLines);
		setInput('');
	};

	const renderLine = (line: ITranslationLine, key: number): JSX.Element | JSX.Element[] => {
		if (line.lines && line.lines.length > 0) {
			return (
				<Line translationStr={line.dictionaryStr} type={line.style} spacing key={key}>
					{line.lines.map(renderLine)}
				</Line>
			);
		}

		return <Line translationStr={line.dictionaryStr} type={line.style} key={key} />;
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.console}>
				<ScrollContainer className={styles.container}>
					{lines.length === 0 && (
						<div className={styles.intro}>
							<Line translationStr='{INTRO-3}' type='normal' />
						</div>
					)}

					{lines.length > 0 && lines.map(renderLine)}
				</ScrollContainer>

				<form className={styles.form} onSubmit={onSubmit}>
					<span className={styles.starter}>&rsaquo;</span>
					<input className={styles.input} value={input} onChange={onChange} autoFocus />
				</form>
			</div>
		</div>
	);
}

export default Console;
