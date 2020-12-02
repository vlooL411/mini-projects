import { useEffect, useLayoutEffect } from 'react';

import { extend, ZEROONE } from '../lib';

const useEffectResize = process.browser ? useLayoutEffect : useEffect;

export type HW = { h: number; w: number };

const useResize = (
	maxHW: HW,
	cellHW: HW,
	setHW: (hw: HW) => void,
	cells: ZEROONE[][],
	setCells: (cs: ZEROONE[][]) => void,
	whileSimulation: (run: () => void, stop: () => void) => void,
): void =>
	useEffectResize(() => {
		const onResize = () => {
			const { innerHeight, innerWidth } = window;

			const [h, w] = [
				(innerHeight * maxHW.h) / cellHW.h,
				(innerWidth * maxHW.w) / cellHW.w,
			].map(Math.floor);

			const runStop = () => {
				setCells([...extend(cells, h, w)]);
				setHW({ h, w });
			};

			whileSimulation(runStop, runStop);
		};

		window.onresize = onResize;
		onResize();
	}, []);

export default useResize;
