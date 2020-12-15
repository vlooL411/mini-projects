import { ReactElement } from 'react';

import Key from './Key';
import style from './styles/white.module.sass';
import { Note } from './Oscillator';

type Props = {
	note: Note;
	press: boolean;
	onUp: () => void;
	onDown: (note: Note) => void;
};

const White = ({ note, press, onUp, onDown }: Props): ReactElement => {
	const { white, white_press, white_note } = style;

	return (
		<Key
			note={note}
			press={press}
			className={white}
			classNamePress={white_press}
			classNameNote={white_note}
			onUp={onUp}
			onDown={onDown}
		/>
	);
};

export default White;
