import { ReactElement, useState } from 'react';

import { Note } from './Oscillator';

export type KeyProps = {
	className: string;
	classNamePress: string;
	classNameNote: string;
	note: Note;
	press: boolean;
	convertNote?: (note: Note) => string;
	onUp: () => void;
	onDown: (note: Note) => void;
};

const Key = ({
	className,
	classNamePress,
	classNameNote,
	note,
	press,
	convertNote = note => note,
	onUp,
	onDown,
}: KeyProps): ReactElement => {
	const [pressMouse, setPress] = useState<boolean>(false);

	const onKeyUp = (): void => {
		setPress(false);
		onUp();
	};

	const onKeyDown = (): void => {
		setPress(true);
		onDown(note);
	};

	return (
		<div
			className={`${className} ${pressMouse || press ? classNamePress : ''}`}
			onMouseUp={onKeyUp}
			onMouseLeave={onKeyUp}
			onMouseDown={onKeyDown}>
			<div className={classNameNote}>{convertNote(note)}</div>
		</div>
	);
};

export default Key;
