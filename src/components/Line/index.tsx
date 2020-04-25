import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './line.module.scss';
import { TranslationLineStyle } from '../../services/translationService';

type Props = {
	translationStr: string;
	type: TranslationLineStyle;
	spacing?: boolean;
};

const Line: React.FC<Props> = ({ translationStr, type, spacing, children }) => {
	const { t } = useTranslation();

	let classNames = styles.line;
	switch (type) {
		case 'normal':
		default:
			classNames += ` ${styles.normal}`;
			break;
		case 'typeface':
			classNames += ` ${styles.typeface}`;
			break;
		case 'title':
			classNames += ` ${styles.title}`;
			break;
		case 'error':
			classNames += ` ${styles.error}`;
			break;
	}

	let containerClassNames = '';
	if (spacing) {
		containerClassNames += ` ${styles.space}`;
	}

	const text = translationStr.replace(/\{(.*?)}/g, (a, b) => t(b));
	return (
		<div className={containerClassNames}>
			<div className={classNames}>{text}</div>
			{children}
		</div>
	);
};

Line.defaultProps = {
	type: 'normal',
};

export default Line;
