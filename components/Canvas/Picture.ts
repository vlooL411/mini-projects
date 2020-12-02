import Vector from './Vector';

export default class Picture {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	constructor(ctx: CanvasRenderingContext2D, width?: number, height?: number) {
		this.ctx = ctx;
		[this.width, this.height] = [width, height];
	}

	save = (): void => this.ctx.save();
	restore = (): void => this.ctx.restore();

	clearRect = (x: number, y: number, w: number, h: number): void =>
		this.ctx.clearRect(x, y, w, h);

	rect = (x: number, y: number, w: number, h: number): void =>
		this.ctx.fillRect(x, y, w, h);
	rectCenter = (x: number, y: number, w: number, h: number): void =>
		this.rect(x - w / 2, y - h / 2, w, h);

	translate = (x: number, y: number): void => this.ctx.translate(x, y);

	line(start: Vector, end: Vector): void {
		const { ctx } = this;
		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}

	polygon(points: Vector[]): void {
		const { ctx } = this;
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (let i = 0; i < points.length; i++)
			ctx.lineTo(points[i].x, points[i].y);
		ctx.fill();
	}

	ellipse(
		{ x, y }: Vector,
		radiusX: number,
		radiusY: number,
		rotation: number = Math.PI / 4,
		startAngle = 0,
		endAngle: number = 2 * Math.PI,
		anticlockwise?: boolean,
	): void {
		const { ctx } = this;
		ctx.beginPath();
		ctx.ellipse(
			x,
			y,
			radiusX,
			radiusY,
			rotation,
			startAngle,
			endAngle,
			anticlockwise,
		);
		ctx.stroke();
	}
}
