import { ReactElement, useMemo } from 'react';

import Cell from '../Cell';
import { fill, ZEROONE } from '../lib';

const useCells = (
	cells: ZEROONE[][],
	setCells: (cellsModify: ZEROONE[][]) => void,
): ReactElement[][] => {
	return useMemo<ReactElement[][]>(() => {
		const wLength = cells.length > 0 ? cells[0].length : 0;

		return fill<ReactElement>(cells.length, wLength, (rms, i, j) =>
			rms.push(
				<Cell
					key={`${i}-${j}`}
					hightLight={cells[i][j]}
					onChange={high => {
						cells[i][j] = high;
						setCells([...cells]);
					}}
				/>,
			),
		);
	}, [cells]);
};

export default useCells;
