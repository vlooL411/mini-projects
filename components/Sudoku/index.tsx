import { ReactElement, useEffect, useState } from 'react';

import Rules from './Rules';
import style from './styles/sudoku.module.sass';
import Cell, { TCell } from './Cell';
import { Generate } from './GenerateSudoku';

export type Point = {
	v: number;
	h: number;
};

const Sudoku = (): ReactElement => {
	const { sudoku, sudoku_finish, sudoku_cells } = style;

	const [win, setWin] = useState<boolean>(false);
	const [currentCell, setCurrentCell] = useState<Point>({ v: 0, h: 0 });
	const [cells, setCells] = useState<TCell[][]>([]);
	const [startGame, setStartGame] = useState<boolean>(true);
	const [answers] = useState<{ cells?: TCell[][]; primary?: Point[] }>({});

	//new game or first play
	useEffect(() => {
		const { cells, answers: ans } = Generate();
		answers.cells = ans.cells;
		answers.primary = ans.primary;
		setCells(cells);
	}, [startGame]);

	useEffect(() => {
		if (Rules.Win(cells, answers.cells)) setWin(false);
	}, [cells]);

	const NewGame = () => setStartGame(!startGame);

	const isDisabledAnswer = (i: number, j: number) =>
		answers.primary?.findIndex(p => p.v == i && p.h == j) != -1;

	return (
		<>
			{win ? <h1>Win</h1> : null}
			<button onClick={NewGame}> New game</button>
			<div className={`${sudoku} ${win ? sudoku_finish : ''}`}>
				{cells.map((arrCells, i) => (
					<ul key={i} className={sudoku_cells}>
						{arrCells.map((char, j) => (
							<Cell
								key={j}
								char={char}
								current={i == currentCell.v && j == currentCell.h}
								disabled={isDisabledAnswer(i, j)}
								light={Rules.isLight(i, j, currentCell)}
								danger={Rules.isDanger(i, j, cells)}
								changeCell={cellChar => {
									cells[i][j] = cellChar;
									setCells([...cells]);
								}}
								onMouseEnter={() => setCurrentCell({ v: i, h: j })}
							/>
						))}
					</ul>
				))}
			</div>
		</>
	);
};

export default Sudoku;
