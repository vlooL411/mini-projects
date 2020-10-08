import { ReactElement, useState, useEffect } from "react"
import style from './secundomer.module.sass'

type Props = {
    timeUpdate?: number
}

function Secundomer({ timeUpdate = 1 }: Props): ReactElement {
    const { secundomer, secundomer_time, secundomer_turn } = style

    const [timer, setTime] = useState<{ time: number }>({ time: 0 })
    const [turn, setTurn] = useState<boolean>(false)
    const [intervalTime, setIntervalTime] = useState<NodeJS.Timeout>(null)

    useEffect(() => setTurn(!turn), [intervalTime])

    const run = () => {
        setIntervalTime(
            setInterval(() => {
                timer.time = Math.floor((timer.time + timeUpdate) * 100) / 100
                setTime({ ...timer })
            }, timeUpdate * 1000))
    }

    const stop = () => {
        clearInterval(intervalTime)
        setIntervalTime(null)
        setTime({ time: 0 })
    }

    console.log('render', timer)
    return <div className={secundomer}>
        <span className={secundomer_time}>Time: {timer.time}</span>
        <button className={secundomer_turn} onClick={turn ? run : stop}>
            {turn ? 'Run' : 'Stop'}
        </button>
    </div>
}

export default Secundomer