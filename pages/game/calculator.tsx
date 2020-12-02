import { ReactElement } from 'react';
import Calculator from 'components/Calculator';

const sudoku = (): ReactElement => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				fontSize: 65,
			}}>
			<Calculator />
		</div>
	);
};

export default sudoku;
