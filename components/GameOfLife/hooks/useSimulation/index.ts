import simulation from './simulation';
import { ZEROONE } from '../../lib';

type State = { skip?: boolean; interval?: NodeJS.Timeout };
const state: State = {};

type Simulation = {
	state: State;
	isRunning: () => boolean;
	onRunning: () => void;
	whileSimulation: (run: () => void, stop: () => void) => void;
};

const useSimulation = (
	cells: ZEROONE[][],
	setCells: (cs: ZEROONE[][]) => void,
	frameTime: number,
): Simulation => {
	const runSimulation = (): void => {
		state.interval = setInterval(
			(): void => simulation(cells, setCells, state),
			frameTime,
		);
	};

	const stopSimulation = (): void => {
		clearInterval(state.interval);
		state.interval = null;
		state.skip = false;
		setCells([...cells]);
	};

	const isRunning = (): boolean => state.interval == null;

	const onRunning: () => void = () =>
		isRunning() ? runSimulation() : stopSimulation();

	const whileSimulation = (run: () => void, stop: () => void): void => {
		state.skip = true;

		if (isRunning()) stop();
		else {
			stopSimulation();
			run();
			runSimulation();
		}

		state.skip = false;
	};

	return { state, isRunning, onRunning, whileSimulation };
};

export default useSimulation;
