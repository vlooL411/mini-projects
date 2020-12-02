export const shuffle = <T>(a: T[]): T[] => {
	a.forEach((_, i, arr) => {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	});
	return a;
};

export const fillArr = <T>(
	r: number,
	c: number,
	fill: (i: number, j: number) => T,
): number[][] => {
	const arr = [];
	for (let i = 0; i < r; i++) {
		arr[i] = [];
		for (let j = 0; j < c; j++) arr[i][j] = fill(i, j);
	}
	return arr;
};
