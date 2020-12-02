import { ZEROONE } from './generate';

const extend = (cells: ZEROONE[][], h: number, w: number): ZEROONE[][] => {
	const { length } = cells;

	if (length > h) cells.splice(h, length);
	else if (length < h) for (let i = length; i < h; i++) cells[i] = [];

	for (let i = 0; i < h; i++) {
		const { length } = cells[i];

		if (length > w) cells[i].splice(w, length);
		else if (length < w) for (let j = length; j < w; j++) cells[i].push(0);
	}

	return cells;
};

export default extend;
