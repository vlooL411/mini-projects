import { ReactElement } from 'react';

import Key from './Key';
import style from './styles/black.module.sass';
import { Note } from './Oscillator';

type Props = {
	note: Note;
	press: boolean;
	onUp: () => void;
	onDown: (note: Note) => void;
};

const Black = ({ note, press, onUp, onDown }: Props): ReactElement => {
	const { black, black_press, black_note } = style;

	return (
		<Key
			note={note}
			press={press}
			className={black}
			classNamePress={black_press}
			classNameNote={black_note}
			convertNote={note => `${note}#`}
			onUp={onUp}
			onDown={onDown}
		/>
	);
};

export default Black;
