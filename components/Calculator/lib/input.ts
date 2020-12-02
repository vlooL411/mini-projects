const isDigit = (key: string) => key >= '0' && key <= '9';

const Input = (Key: string, value: string): string | null => {
	const key = Key.slice(0, 1).toLowerCase();

	const lastValueChar = value.slice(-1);

	//TODO '(', ')' to bad work
	switch (key) {
		case 'c':
			return '0';
		case '<':
			value = value.slice(0, value.length - 1);
			return value == '' ? '0' : value;
		case '(':
			if (isDigit(lastValueChar)) return value;
		case ')':
			if (lastValueChar == '(') return value;
		default:
			if (value == '0' && key != '.') return key;
			if (
				!isDigit(key) &&
				!isDigit(lastValueChar) &&
				key != '(' &&
				key != ')' &&
				lastValueChar != '(' &&
				lastValueChar != ')'
			)
				return value.slice(0, value.length - 1) + key;
	}
	return value + key;
};

export default Input;
