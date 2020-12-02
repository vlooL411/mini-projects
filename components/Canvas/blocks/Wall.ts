import Picture from '../Picture';
import Vector from '../Vector';

export default class Wall {
	start: Vector;
	end: Vector;
	canvas: Picture;
	constructor(picture: Picture, start: Vector, end: Vector) {
		this.start = start;
		this.end = end;
		this.canvas = picture;
	}

	show = (): void => this.canvas.line(this.start, this.end);
}
