import { ChangeEvent, ReactElement, useMemo, useRef, useState } from 'react';

import CreateAction from './CreateAction';
import computing from './lib/computing';
import Input from './lib/input';
import style from './styles/calculator.module.sass';

//Project creating on the prototype https://dev.to/theranbrig/build-a-react-calculator-with-hooks-and-context-api-on

const Calculator = (): ReactElement => {
	const { calculator, info, action } = style;

	const [result, setResult] = useState<string>(null!);
	const inputRef = useRef<HTMLInputElement>(null!);

	const onComputing = (value: string): void => {
		const answer = computing(value);
		setResult(answer);
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.currentTarget;
		if (value == '') {
			e.target.value = '0';
			return;
		}

		onComputing(value);
	};

	const InputValue = (Key: string): void => {
		const { current } = inputRef;
		current.value = Input(Key, current.value);

		current.scrollTo({ left: current.scrollWidth });
		onComputing(current.value);
	};

	const onClick = (key: string): void => InputValue(key);

	const Actions: ReactElement[] = useMemo(() => {
		const createAction = new CreateAction(onClick);
		const sign = createAction.Sign;
		const num = createAction.Num;
		const com = createAction.Com;
		const zero = createAction.Zero;

		return [
			sign('C'),
			sign('<-'),
			sign('('),
			sign(')'),
			num('7'),
			num('8'),
			num('9'),
			com('/'),
			num('4'),
			num('5'),
			num('6'),
			com('*'),
			num('1'),
			num('2'),
			num('3'),
			com('-'),
			zero('0'),
			num('.'),
			com('+'),
		];
	}, []);

	return (
		<div className={calculator}>
			<header>CALCULATOR</header>
			<div className={info}>
				<input ref={inputRef} onChange={onChange} defaultValue='0' />
				<p>{result ?? 'RESULT'}</p>
			</div>
			<div className={action}>{Actions}</div>
		</div>
	);
};

export default Calculator;
