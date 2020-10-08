import Wall from '../blocks/Wall'
import Picture from '../Picture'
import Vector from '../Vector'
import Ray from './Ray'

export default class Particle {
  picture: Picture;
  pos: Vector;
  private rays: Ray[];
  frequency: number;
  constructor(picture: Picture, frequency: number = 36) {
    this.picture = picture;
    this.frequency = frequency;
  }

  set Rays(pos: Vector) {
    const { picture: canvas, frequency } = this;

    const frequency360 = 360 / frequency;
    this.pos = pos;
    this.rays = Array.from(
      { length: frequency },
      (_, i) => new Ray(canvas, pos, i * frequency360)
    );
  }

  showOnly = () => this.rays.forEach((r) => r.show());

  show = (pos: Vector) => {
    this.Rays = pos;
    this.showOnly();
  };

  look = (walls: Wall[]) =>
    this.rays.forEach((r) => {
      let closest: Vector = null;
      let record: number = Infinity;
      walls.forEach((wall) => {
        const point = r.cast(wall);
        if (point) {
          const dist = this.pos.dist(point);
          if (dist < record) {
            record = dist;
            closest = point;
          }
        }
      });
      if (closest) {
        this.picture.ctx.strokeStyle = "rgb(255, 100, 255)";
        this.picture.line(this.pos, closest);
        this.picture.ctx.strokeStyle = "rgb(10, 100, 255)";
        this.picture.ellipse(closest, 2, 2);
      }
    });
}
