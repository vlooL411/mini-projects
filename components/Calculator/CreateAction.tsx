import { ReactElement } from 'react';

import Button from './Button';
import style from './styles/createAction.module.sass';

const { sign, num, compute, zero } = style;

export default class CreateAction {
	constructor(private onClick: (key: string) => void) {}

	private create = (
		key: string,
		className: string,
		onClick: (key: string) => void,
	): ReactElement => (
		<Button
			key={key}
			symbol={key}
			className={className}
			onClick={() => onClick(key)}
		/>
	);

	Sign = (key: string): ReactElement => this.create(key, sign, this.onClick);

	Num = (key: string): ReactElement => this.create(key, num, this.onClick);

	Com = (key: string): ReactElement => this.create(key, compute, this.onClick);

	Zero = (key: string): ReactElement =>
		this.create(key, `${num} ${zero}`, this.onClick);
}
