import { fillArr } from './utils';

const ToNumber = (val: number) => Number(val.toFixed(2));
const DataFill = (rows: number, cols: number): number[][] =>
	fillArr(rows, cols, () => ToNumber(Math.random() * 2 - 1));

export class Matrix {
	data: number[][];
	constructor(
		public rows: number,
		public cols: number,
		dataFill: (r: number, c: number) => number[][] = DataFill,
	) {
		this.data = dataFill(rows, cols);
	}

	static create = (
		rows: number,
		cols: number,
		fill: (i: number, j: number) => number,
	): Matrix => new Matrix(rows, cols, () => fillArr(rows, cols, fill));

	static transpose = ({ data, rows, cols }: Matrix): Matrix =>
		Matrix.create(cols, rows, (i, j) => data[j][i]);

	static dotProduct = (m1: Matrix, m2: Matrix): Matrix =>
		m1.cols == m2.rows
			? Matrix.create(m1.rows, m2.cols, (i, j) =>
					ToNumber(
						m1.data[i].reduce(
							(sum, val, k) => sum + val * m2.data[k][j],
							m1.data[i][0] * m2.data[0][j],
						),
					),
			  )
			: null;

	static fromArray = (arr: number[]): Matrix =>
		Matrix.create(arr.length, 1, i => ToNumber(arr[i]));

	static subtract = (a: Matrix, b: Matrix): Matrix =>
		Matrix.create(a.rows, a.cols, (i, j) =>
			ToNumber(a.data[i][j] - b.data[i][j]),
		);

	static map = (
		{ data, rows, cols }: Matrix,
		activation: (val: number) => number,
	): Matrix =>
		Matrix.create(rows, cols, (i, j) => ToNumber(activation(data[i][j])));

	toArray = (): number[][] => this.data.map(d => d.map(dd => dd));

	add = ({ data: inData }: Matrix): Matrix =>
		this.map((val, i, j) => val + inData[i][j]);

	addNum = (n: number): Matrix => this.map(val => val + n);

	multiply = ({ data: inData }: Matrix): Matrix =>
		this.map((val, i, j) => val * inData[i][j]);

	multiplyNum = (n: number): Matrix => this.map(val => val * n);

	cpy = (): Matrix =>
		Matrix.create(this.rows, this.cols, (i, j) => this.data[i][j]);

	map = (
		otherFunction: (val: number, i: number, j: number) => number,
	): Matrix => {
		this.data.forEach((d, i) =>
			d.forEach(
				(dd, j, array) => (array[j] = ToNumber(otherFunction(dd, i, j))),
			),
		);
		return this;
	};
}
