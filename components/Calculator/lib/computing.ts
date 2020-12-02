import { evaluate } from 'mathjs';

const computing = (value: string): string => {
	try {
		const expressions = evaluate(value);
		return typeof expressions === 'number' ? expressions.toString() : 'Error';
	} catch (error) {
		const char: number = error.char;
		return `Error: char ${char}`;
	}
};

export default computing;
