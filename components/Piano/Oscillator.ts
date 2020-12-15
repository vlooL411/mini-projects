export type NoteType = 'natural' | 'sharp';
export type Note = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export default class Oscillator {
	private ctx: AudioContext;
	private audio: OscillatorNode;
	private isStart = false;

	play(frequency: number): void {
		if (this.isStart) return;

		this.ctx?.close();
		this.ctx = new AudioContext();
		this.audio = this.ctx.createOscillator();
		this.audio.frequency.value = frequency;

		this.audio.connect(this.ctx.destination);

		this.audio.start();
		this.isStart = true;
	}

	playNote(note: Note, type: NoteType = 'natural'): void {
		if (this.isStart) return;
		const frequency = this.noteToFrequency(note, type);
		if (frequency == null) return;

		this.play(frequency);
	}

	pause(when = 0.2): void {
		if (!this.isStart) return;
		this.audio.stop(when);
		this.isStart = false;
	}

	noteToFrequency = (note: Note, type: NoteType = 'natural'): number => {
		const isSharp = type == 'sharp';

		const whatNote = (natural: number, sharp: number): number | null =>
			isSharp ? sharp : natural;

		switch (note) {
			case 'A':
				return whatNote(220, 233.08);
			case 'B':
				return 246.96;
			case 'C':
				return whatNote(261.63, 277.18);
			case 'D':
				return whatNote(293.66, 311.13);
			case 'E':
				return 329.63;
			case 'F':
				return whatNote(349.23, 369.99);
			case 'G':
				return whatNote(392, 415.3);
			default:
				return null;
		}
	};
}
