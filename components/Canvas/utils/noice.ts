const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

const perlin_octaves = 4; // default to medium smooth
const perlin_amp_falloff = 0.5; // 50% reduction/octave
const scaled_cosine = (i): number => 0.5 * (1 - Math.cos(i * Math.PI));

let perlin: number[];

export const noice = (x: number, y = 0, z = 0): number => {
	if (!perlin) {
		perlin = new Array(PERLIN_SIZE + 1);
		for (let i = 0; i < PERLIN_SIZE + 1; i++) perlin[i] = Math.random();
	}

	if (x < 0) x = -x;
	if (y < 0) y = -y;

	let [xi, yi, zi] = [Math.floor(x), Math.floor(y), Math.floor(z)];
	let xf: number = x - xi;
	let yf: number = y - yi;
	let zf: number = z - zi;
	let rxf: number, ryf: number;

	let r = 0;
	let ampl = 0.5;

	let n1: number, n2: number, n3: number;

	for (let o = 0; o < perlin_octaves; o++) {
		let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

		rxf = scaled_cosine(xf);
		ryf = scaled_cosine(yf);

		n1 = perlin[of & PERLIN_SIZE];
		n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1);
		n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
		n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
		n1 += ryf * (n2 - n1);

		of += PERLIN_ZWRAP;
		n2 = perlin[of & PERLIN_SIZE];
		n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2);
		n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE];
		n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3);
		n2 += ryf * (n3 - n2);

		n1 += scaled_cosine(zf) * (n2 - n1);

		r += n1 * ampl;
		ampl *= perlin_amp_falloff;
		xi <<= 1;
		xf *= 2;
		yi <<= 1;
		yf *= 2;
		zi <<= 1;
		zf *= 2;

		if (xf >= 1.0) {
			xi++;
			xf--;
		}
		if (yf >= 1.0) {
			yi++;
			yf--;
		}
		if (zf >= 1.0) {
			zi++;
			zf--;
		}
	}
	return r;
};
