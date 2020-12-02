import GameOfLife from 'components/GameOfLife';
import { ReactElement } from 'react';

const gameOfLife = (): ReactElement => (
	<div className='index' style={{ overflow: 'hidden' }}>
		<GameOfLife />
	</div>
);

export default gameOfLife;
