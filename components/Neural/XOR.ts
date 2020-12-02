import { shuffle } from './utils';
import { NeuralNetwork } from './Neural';

// XOR example
// NeuralNetwork takes as params
// input and output length
// 2 inputs and 1 output

export const XOR = (): void => {
	const NN = new NeuralNetwork(2, 1);

	const defined_data: {
		input: number[];
		output: number[];
	}[] = [
		{
			input: [0, 0],
			output: [0],
		},
		{
			input: [0, 1],
			output: [1],
		},
		{
			input: [1, 0],
			output: [1],
		},
		{
			input: [1, 1],
			output: [0],
		},
	];

	for (let i = 0; i < 1000; i++) {
		const shuffled = shuffle(defined_data);
		shuffled.forEach(val => NN.train(val.input, val.output));
	}

	console.log('[0,1] =>', NN.feed_forward([0, 1]));
	console.log('[0,0] =>', NN.feed_forward([0, 0]));
	console.log('[1,0] =>', NN.feed_forward([1, 0]));
	console.log('[1,1] =>', NN.feed_forward([1, 1]));
};
