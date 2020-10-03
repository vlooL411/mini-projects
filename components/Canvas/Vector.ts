import { noice } from './utils/noice'

export default class Vector {
  x: number;
  y: number;
  constructor(x: number = 0, y: number = 0) {
    [this.x, this.y] = [x, y];
  }

  static radians = (angle: number) => (angle * Math.PI) / 180;
  static createAngle = (radian: number, length: number = 1): Vector =>
    new Vector(length * Math.cos(radian), length * Math.sin(radian));

  get Length(): number {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }

  cpy = (): Vector => new Vector(this.x, this.y);

  add(v: Vector): Vector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector): Vector {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  dist = (v: Vector): number => v.cpy().sub(this).Length;

  normalize() {
    const normal = this.Length;
    this.x /= normal;
    this.y /= normal;
  }

  heading = () => Math.atan2(this.y, this.x);

  static noice = (x: number, y: number = 0, z: number = 0): number =>
    noice(x, y, z);

  static map(
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
    withinBounds?
  ) {
    const constrain = (value: number, low: number, high: number) =>
      Math.max(Math.min(value, high), low);

    const newval =
      ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    if (!withinBounds) return newval;

    if (start2 < stop2) return constrain(newval, start2, stop2);
    return constrain(newval, stop2, start2);
  }
}
