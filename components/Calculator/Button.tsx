import { ReactElement } from 'react';

import style from './styles/button.module.sass';

type Action = {
	symbol: string;
	className: string;
	onClick: () => void;
};

const Button = ({ symbol, className, onClick }: Action): ReactElement => {
	const { btn } = style;

	return (
		<button className={`${btn} ${className}`} onClick={onClick}>
			{symbol}
		</button>
	);
};

export default Button;
