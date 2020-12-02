import { KeyboardEvent, ReactElement, useState } from 'react';

import useCells from './hooks/useCells';
import style from './styles/gameoflife.module.sass';
import { Generate, ZEROONE } from './lib';
import { HW, useResize, useSimulation } from './hooks';

type Props = {
	maxHW?: HW;
	cellHW?: HW;
	frameTime?: number;
};

const GameOfLife = ({
	maxHW = { h: 0.9, w: 0.9 },
	cellHW = { h: 50, w: 50 },
	frameTime = 1000 / 30,
}: Props): ReactElement => {
	const { gameoflife } = style;

	const [{ h, w }, setHW] = useState<HW>({ h: 0, w: 0 });
	const [cells, setCells] = useState<ZEROONE[][]>(Generate.zero(h, w));

	const { state, isRunning, onRunning, whileSimulation } = useSimulation(
		cells,
		setCells,
		frameTime,
	);

	useResize(maxHW, cellHW, setHW, cells, setCells, whileSimulation);

	const onRandom = (): void =>
		whileSimulation(
			() => Generate.toRandom(cells),
			() => setCells(Generate.random(h, w)),
		);

	const onClear = (): void =>
		whileSimulation(
			() => Generate.toZero(cells),
			() => setCells(Generate.zero(h, w)),
		);

	const Cells: ReactElement[][] = useCells(cells, cellsModify =>
		whileSimulation(
			() => null,
			() => setCells(cellsModify),
		),
	);

	const onKey = ({ altKey, ctrlKey }: KeyboardEvent): void => {
		state.skip = altKey || ctrlKey;
	};

	return (
		<>
			<button onClick={onRunning}>{isRunning() ? 'Run' : 'Stop'}</button>
			<button onClick={onRandom}>Random</button>
			<button onClick={onClear}>Clear</button>
			<span style={{ paddingLeft: '.5em' }}>
				Draw press shift, clear cell press alt + shift, draw one cell alt +
				click
			</span>
			<div
				tabIndex={0}
				onKeyUp={onKey}
				onKeyDown={onKey}
				className={gameoflife}
				style={{
					gridTemplateColumns: `repeat(${w}, ${cellHW.w}px)`,
					gridTemplateRows: `repeat(${h}, ${cellHW.h}px)`,
				}}>
				{Cells}
			</div>
		</>
	);
};

export default GameOfLife;
