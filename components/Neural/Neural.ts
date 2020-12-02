import { Matrix } from './Matrix';

//source: https://nectarjs.com/compiling-a-javascript-neural-network-in-js-in-less-than-500kb/
const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));
const derivativeOfSigmoid = (y: number): number => y * (1 - y);

export class NeuralNetwork {
	weights_1: Matrix;
	weights_2: Matrix;
	bias_1: Matrix;
	bias_2: Matrix;
	constructor(
		input_length: number,
		output_length: number,
		public learning_rate = 0.9,
		public activation: (val: number) => number = sigmoid,
		public derivative: (val: number) => number = derivativeOfSigmoid,
	) {
		// for a better nn training
		const weights_length = (input_length + output_length) * 2;

		this.weights_1 = new Matrix(weights_length, input_length);
		this.weights_2 = new Matrix(output_length, weights_length);

		this.bias_1 = new Matrix(weights_length, 1);
		this.bias_2 = new Matrix(output_length, 1);
	}

	feed_forward(inputs: number[]): number[][] {
		const inputs_from = Matrix.fromArray(inputs);

		const hidden = Matrix.dotProduct(this.weights_1, inputs_from)
			.add(this.bias_1)
			.map(this.activation);

		const output = Matrix.dotProduct(this.weights_2, hidden)
			.add(this.bias_2)
			.map(this.activation);

		return output.toArray();
	}

	// feedforward with backpropagation
	train(inputs: number[], target_array: number[]): void {
		const inputs_from = Matrix.fromArray(inputs);

		const hidden = Matrix.dotProduct(this.weights_1, inputs_from)
			.add(this.bias_1)
			.map(this.activation);

		const outputs = Matrix.dotProduct(this.weights_2, hidden)
			.add(this.bias_2)
			.map(this.activation);

		const targets = Matrix.fromArray(target_array);
		const output_errors = Matrix.subtract(targets, outputs);

		const gradients = Matrix.map(outputs, this.derivative)
			.multiply(output_errors)
			.multiplyNum(this.learning_rate);

		const hidden_transposed = Matrix.transpose(hidden);

		const weights_2_deltas = Matrix.dotProduct(gradients, hidden_transposed);

		this.weights_2.add(weights_2_deltas);
		this.bias_2.add(gradients);
		const who_t = Matrix.transpose(this.weights_2);
		const hidden_errors = Matrix.dotProduct(who_t, output_errors);

		const hidden_gradient = Matrix.map(hidden, this.derivative)
			.multiply(hidden_errors)
			.multiplyNum(this.learning_rate);

		const inputs_transposed = Matrix.transpose(inputs_from);
		const weights_1_deltas = Matrix.dotProduct(
			hidden_gradient,
			inputs_transposed,
		);

		this.weights_1.add(weights_1_deltas);
		this.bias_1.add(hidden_gradient);
	}
}
