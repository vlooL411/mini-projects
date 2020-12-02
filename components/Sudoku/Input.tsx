import { ReactElement, useMemo } from 'react';

import style from './styles/input.module.sass';
import { TCell } from './Cell';

type Props = {
	charCurrent: TCell;
	possibleChar: TCell[];
	mode: boolean;
	changeCell(cell: string): void;
};

const Input = ({
	charCurrent,
	possibleChar,
	mode,
	changeCell,
}: Props): ReactElement => {
	const { input, input_keys, input_keys_current, input_keys_key } = style;
	const { input_keys_disabled, input_mode_match, input_mode_write } = style;

	const block = (key: TCell | 'W' | 'X', className: string) => (
		<li
			key={key}
			className={className}
			onClick={() => changeCell(key.toString())}>
			{key}
		</li>
	);

	const numbers = useMemo(() => {
		const numberClass = (key: TCell): string =>
			`${input_keys_key} ${charCurrent == key ? input_keys_current : ''} ` +
			`${possibleChar.includes(key) ? input_keys_disabled : ''}`;

		return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(key =>
			block(key as TCell, numberClass(key as TCell)),
		);
	}, [charCurrent, possibleChar]);

	const tools = useMemo(
		() => (
			<>
				<li key={13}></li>
				{block('W', input_keys_key)}
				{block('X', input_keys_key)}
			</>
		),
		[],
	);

	return (
		<div className={`${input} ${mode ? input_mode_write : input_mode_match}`}>
			<ul className={input_keys}>
				{numbers}
				{tools}
			</ul>
		</div>
	);
};

export default Input;
