import Wall from '../blocks/Wall';
import Picture from '../Picture';
import Vector from '../Vector';

export default class Ray {
	pos: Vector;
	dir: Vector;
	picture: Picture;
	constructor(picture: Picture, pos: Vector, radian = 0) {
		this.pos = pos;
		this.dir = Vector.createAngle(radian);
		this.picture = picture;
	}

	set Direction(radian: number) {
		this.dir = Vector.createAngle(radian);
	}

	lookAt({ x, y }: Vector): void {
		const { pos, dir } = this;
		dir.x = x - pos.x;
		dir.y = y - pos.y;

		dir.normalize();
	}

	show(): void {
		const { pos, dir, picture } = this;
		picture.save();

		picture.translate(pos.x, pos.y);
		picture.line(new Vector(), new Vector(dir.x * 10, dir.y * 10));

		picture.restore();
	}

	cast({ start, end }: Wall): Vector {
		const { x: x1, y: y1 } = start;
		const { x: x2, y: y2 } = end;

		const { pos, dir } = this;

		const { x: x3, y: y3 } = pos;
		const x4 = x3 + dir.x;
		const y4 = y3 + dir.y;

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (den == 0) return;

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

		if (t > 0 && t < 1 && u > 0) {
			const x = x1 + t * (x2 - x1);
			const y = y1 + t * (y2 - y1);
			return new Vector(x, y);
		}
		return null;
	}
}
