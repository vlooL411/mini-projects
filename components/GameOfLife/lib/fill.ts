const fill = <T>(
	h: number,
	w: number,
	Fill: (cs: T[], i: number, j: number) => void,
): T[][] => {
	const cells = [];
	for (let i = 0; i < h; i++) {
		cells[i] = [];
		for (let j = 0; j < w; j++) Fill(cells[i], i, j);
	}

	return cells;
};

export default fill;
