import { ReactElement, useEffect, useRef, useState } from 'react'

import Canvas from '..'
import Picture from '../Picture'
import Wall from '../RayCasting2D/Wall'
import Vector from '../Vector'
import Particle from './Particle'

type Setup = {
    picture?: Picture
    walls?: Wall[]
    particle?: Particle
}

type Props = {
    frameUpdate?: number
}

const RayCasting3D = ({ frameUpdate = 1000 / 60 }: Props): ReactElement => {
    const pictureRef = useRef<HTMLCanvasElement>(null!)
    const [moveRays] = useState<Vector>(new Vector(0, 10000))
    const [sceneSettings] = useState<{ w: number, h: number }>({ w: 500, h: 400 })
    const [event] = useState<{ mouse?: Vector }>({})
    const [SetUp] = useState<Setup>({})

    useEffect(() => {
        const speed = 5
        pictureRef.current.onmousemove = (e) => event.mouse = new Vector(e.clientX, e.clientY)
        pictureRef.current.onkeydown = async (e) => {
            const { particle } = SetUp
            await (() => {
                switch (e.key.toLowerCase()) {
                    case 'd':
                    case 'arrowleft':
                        particle.rotate(.1)
                        break;
                    case 'a':
                    case 'arrowright':
                        particle.rotate(-.1)
                        break;
                    case 'w':
                    case 'arrowup':
                        particle.move(speed)
                        break;
                    case 's':
                    case 'arrowdown':
                        particle.move(-speed)
                        break;
                    case '+':
                        particle.FOV = particle.fov + 1
                        break
                    case '-':
                        particle.FOV = particle.fov - 1
                        break
                }
            }).call(null)
        }
    }, [])

    const setup = (canvas: HTMLCanvasElement): Setup => {
        const { width, height } = canvas
        const picture = new Picture(canvas.getContext('2d'), width, height)

        const crtWall = (x1: number, y1: number, x2: number, y2: number) =>
            new Wall(picture, new Vector(x1, y1), new Vector(x2, y2))

        const { w } = sceneSettings
        const walls: Wall[] = Array.from({ length: 3 }, () => {
            const random = (max: number) => Math.random() * max * 10 % max

            const [x1, y1] = [random(w), random(height)]
            const [x2, y2] = [random(w), random(height)]

            return crtWall(x1, y1, x2, y2)
        })

        walls.push(crtWall(0, 0, w, 0)) // top
        walls.push(crtWall(w, 0, w, height)) // right
        walls.push(crtWall(w, height, 0, height)) // bottom
        walls.push(crtWall(0, height, 0, 0)) //left

        const particle = new Particle(picture, new Vector(0, 0), 110);

        SetUp.particle = particle
        SetUp.picture = picture
        SetUp.walls = walls
        return SetUp
    }

    const draw = () => {
        const { width, height } = pictureRef?.current
        const { picture, walls, particle } = SetUp

        picture.ctx.fillStyle = '#000'
        picture.clearRect(0, 0, width, height)
        picture.rect(0, 0, width, height)

        picture.ctx.strokeStyle = "#fff";
        walls.forEach(wall => wall.show())

        // const { x, y } = moveRays
        // particle.Rays = new Vector(Vector.noice(x) * sceneSettings.w, Vector.noice(y) * height)
        const { mouse } = event
        if (!mouse) return
        particle.show(mouse)
        const scene = particle.look(walls)
        const { w: sceneW, h: sceneH } = sceneSettings
        const w = sceneW / scene.length

        picture.save();

        picture.translate(sceneW, 0);
        scene.forEach((val, i) => {
            const sq = scene[i] * scene[i]
            const wSq = sceneW * sceneW
            const b = Vector.map(sq, 0, wSq, 255, 0)
            const h = Vector.map(scene[i], 0, sceneW, sceneH, 0)
            picture.ctx.fillStyle = `rgb(${b}, ${b}, ${b}, ${val})`
            picture.rectCenter(i * w + w / 2, sceneH / 2, w, h)
        })

        picture.restore();

        moveRays.x += 0.01
        moveRays.y += 0.01
    }

    return <>
        <Canvas ref={pictureRef}
            setup={setup}
            draw={draw}
            width={sceneSettings.w * 2} height={500} frameUpdate={frameUpdate} />
        <pre>   Control:</pre>
        <pre> w, s, a, d - move or mouse</pre>
        <pre> -, + -  fov</pre>
    </>
};

export default RayCasting3D;
