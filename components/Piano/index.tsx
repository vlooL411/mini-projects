import { KeyboardEvent, ReactElement, useState } from 'react';

import Black from './Black';
import style from './styles/piano.module.sass';
import White from './White';
import Oscillator, { Note, NoteType } from './Oscillator';

type NotePress = {
	note: Note;
	press?: boolean;
};

const oscillator = new Oscillator();
const Piano = (): ReactElement => {
	const { piano, piano_line } = style;
	const { piano_keys, piano_blacks, piano_whites } = style;

	const [state] = useState<{ type?: NoteType }>({});
	const [keys, setKeys] = useState<NotePress[][]>(
		[
			['C', 'D', 'E'],
			['F', 'G', 'A', 'B'],
			['C', 'D', 'E'],
			['F', 'G', 'A', 'B'],
			['C', 'D', 'E'],
		].map(ks => ks.map(k => ({ note: k as Note }))),
	);

	const onUp = (): void => oscillator.pause();
	const onDown = (note: Note, type: NoteType = 'natural'): void =>
		oscillator.playNote(note, type);

	const Spawn = ({ notes }: { notes: NotePress[] }): ReactElement => {
		const isSharp = state.type == 'sharp';

		return (
			<div className={piano_whites}>
				<div className={piano_blacks}>
					{notes.slice(0, notes.length - 1).map(({ note, press }) => (
						<Black
							key={note}
							note={note}
							press={press && isSharp}
							onDown={note => onDown(note, 'sharp')}
							onUp={onUp}
						/>
					))}
				</div>
				{notes.map(({ note, press }) => (
					<White
						key={note}
						note={note}
						press={press && !isSharp}
						onDown={onDown}
						onUp={onUp}
					/>
				))}
			</div>
		);
	};

	const Spawns = (notes: NotePress[][]): ReactElement[] =>
		notes.map((spawn, key) => <Spawn notes={spawn} key={key} />);

	const onKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>): void => {
		let KEY: Note = key.toUpperCase() as Note;

		state.type = 'natural';
		if (KEY >= '1' && KEY <= '8') {
			const Notes: Note[] = ['C', 'D', 'F', 'G', 'A'];
			state.type = 'sharp';
			KEY = Notes[+KEY - 1];
		}

		const indexs: number[][] = keys
			.map((ks, i) => [i, ks.findIndex(({ note }) => note == KEY)])
			.filter(index => index[1] != -1);

		const { length } = indexs;
		if (length == 0) return;

		const i = Math.floor((Math.random() * 10 * length) % length);
		const index = indexs[i];
		keys[index[0]][index[1]].press = true;

		setKeys([...keys]);
		onDown(KEY, state.type);
	};

	const onKeyUp = (): void => {
		keys.forEach(ks => ks.forEach(key => (key.press = false)));
		setKeys([...keys]);
		onUp();
	};

	return (
		<div
			className={piano}
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
			tabIndex={-1}>
			<div className={piano_line} />
			<div className={piano_keys}>{Spawns(keys)}</div>
		</div>
	);
};

export default Piano;
