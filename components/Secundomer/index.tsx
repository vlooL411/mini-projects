import { ReactElement, useEffect, useState } from 'react';

import style from './secundomer.module.sass';

type Props = { timeUpdate?: number };

function Secundomer({ timeUpdate = 0.1 }: Props): ReactElement {
	const { secundomer, secundomer_time, secundomer_turn } = style;

	const [state, setState] = useState<{ time: number }>({ time: 0 });
	const [turn, setTurn] = useState<boolean>(false);
	const [intervalTime, setIntervalTime] = useState<NodeJS.Timeout>(null);

	useEffect(() => setTurn(!turn), [intervalTime]);

	const run = (): void => {
		const interval = setInterval((): void => {
			state.time = Number((state.time + timeUpdate).toFixed(2));
			setState({ ...state });
		}, timeUpdate * 1000);

		setIntervalTime(interval);
	};

	const stop = (): void => {
		clearInterval(intervalTime);
		state.time = 0;
		setIntervalTime(null);
	};

	return (
		<div className={secundomer}>
			<span className={secundomer_time}>Time: {state.time.toFixed(2)}</span>
			<button className={secundomer_turn} onClick={turn ? run : stop}>
				{turn ? 'Run' : 'Stop'}
			</button>
		</div>
	);
}

export default Secundomer;
