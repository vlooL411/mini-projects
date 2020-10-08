import { ReactElement, useRef, useState } from 'react'

import Canvas from '..'
import Wall from '../blocks/Wall'
import Picture from '../Picture'
import Vector from '../Vector'
import Particle from './Particle'

type Setup = {
  picture: Picture
  walls: Wall[]
  particle: Particle
}

type Props = {
  frameUpdate?: number
}

const RayCasting2D = ({ frameUpdate = 1000 / 60 }: Props): ReactElement => {
  const pictureRef = useRef<HTMLCanvasElement>(null!)
  const [moveRays, __] = useState<Vector>(new Vector(0, 10000))

  const setup = (canvas: HTMLCanvasElement): Setup => {
    const picture = new Picture(canvas.getContext('2d'))
    const { width, height } = canvas

    const crtWall = (x1: number, y1: number, x2: number, y2: number) =>
      new Wall(picture, new Vector(x1, y1), new Vector(x2, y2))

    const walls: Wall[] = Array.from({ length: 10 }, () => {
      const random = (max: number) => Math.random() * max * 10 % max

      const [x1, y1] = [random(width), random(height)]
      const [x2, y2] = [random(width), random(height)]

      return crtWall(x1, y1, x2, y2)
    })

    walls.push(crtWall(0, 0, width, 0)) // top
    walls.push(crtWall(width, 0, width, height)) // right
    walls.push(crtWall(width, height, 0, height)) // bottom
    walls.push(crtWall(0, height, 0, 0)) //left

    const particle = new Particle(picture, 40);

    return { picture, walls, particle }
  }

  const draw = ({ picture, walls, particle }: Setup) => {
    const { width, height } = pictureRef?.current

    picture.ctx.fillStyle = '#000'
    picture.clearRect(0, 0, width, height)
    picture.rect(0, 0, width, height)

    picture.ctx.strokeStyle = "#fff";
    walls.forEach(wall => wall.show())

    const { x, y } = moveRays
    particle.Rays = new Vector(Vector.noice(x) * width, Vector.noice(y) * height)
    particle.look(walls)

    moveRays.x += 0.01
    moveRays.y += 0.01
  }

  return <Canvas ref={pictureRef}
    setup={setup}
    draw={draw}
    width={700} height={600}
    frameUpdate={frameUpdate} />
};

export default RayCasting2D;
