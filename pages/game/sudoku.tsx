import { ReactElement } from 'react';
import Sudoku from 'components/Sudoku';

const sudoku = (): ReactElement => {
	return (
		<div style={{ padding: 20, width: 500, height: 500, fontSize: 65 }}>
			<Sudoku />
		</div>
	);
};

export default sudoku;
