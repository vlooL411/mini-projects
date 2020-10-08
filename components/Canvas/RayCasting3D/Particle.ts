import Wall from '../blocks/Wall'
import Picture from '../Picture'
import Ray from '../RayCasting2D/Ray'
import Vector from '../Vector'

export default class Particle {
  canvas: Picture;
  pos: Vector;
  fov: number;
  heading: number;
  private rays: Ray[];
  constructor(canvas: Picture, pos: Vector, fov: number = 50) {
    this.canvas = canvas;
    this.heading = 0;
    this.pos = pos;
    this.FOV = fov;
  }

  set FOV(angle: number) {
    if (angle <= 0 || angle > 360) return;
    const { canvas, pos, heading } = this;
    this.fov = angle;
    this.rays = Array.from(
      { length: angle },
      (_, i) => new Ray(canvas, pos, Vector.radians(i - angle / 2) + heading)
    );
  }

  rotate(angle: number) {
    const { heading, fov, rays } = this;
    this.heading += angle;
    rays.forEach(
      (r, i) => (r.Direction = Vector.radians(i - fov / 2) + heading)
    );
  }

  move(amt: number) {
    const vel = Vector.createAngle(this.heading, amt);
    this.pos.add(vel);
  }

  showOnly = () => this.rays.forEach((r) => r.show());

  show(pos: Vector) {
    this.pos = pos;

    this.rays.forEach((r) => {
      r.pos = pos;
      r.show();
    });
  }

  look = (walls: Wall[]): number[] =>
    this.rays.map((r) => {
      const { pos, heading } = this;
      let closest: Vector = null;
      let record: number = Infinity;

      walls.forEach((wall) => {
        const point = r.cast(wall);
        if (point) {
          const a = r.dir.heading() - heading;
          const dist = pos.dist(point) * Math.cos(a);
          if (dist < record) {
            record = dist;
            closest = point;
          }
        }
      });

      if (closest) {
        const { canvas } = this;
        canvas.ctx.strokeStyle = "rgb(255, 100, 255)";
        canvas.line(pos, closest);
        canvas.ctx.strokeStyle = "rgb(10, 100, 255)";
        canvas.ellipse(closest, 2, 2);
      }

      return record;
    });
}
