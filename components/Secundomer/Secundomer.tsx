import { ReactElement, useState, useEffect, useReducer } from "react"
import style from './secundomer.module.sass'

const initialState: State = { time: 0 }

type State = {
    time: number
}

enum TAction {
    AddTime
}

type Action = {
    type: TAction
    addTime?: number
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case TAction.AddTime:
            state.time = Math.floor((state.time + action.addTime) * 100) / 100
            return { ...state }
    }
}

type Props = {
    timeUpdate?: number
}

const Secundomer = ({ timeUpdate = 1 }: Props): ReactElement => {
    const { secundomer, secundomer_time, secundomer_turn } = style

    const [state, dispatch] = useReducer(reducer, initialState, undefined)
    const [time, setTime] = useState<number>(0)
    const [turn, setTurn] = useState<boolean>(false)
    const [intervalTime, setIntervalTime] = useState<NodeJS.Timeout>(null)

    useEffect(() => setTurn(!turn), [intervalTime])

    const run = () => {
        setIntervalTime(
            setInterval(() =>
                dispatch({ type: TAction.AddTime, addTime: timeUpdate }),
                timeUpdate * 1000))
    }

    const stop = () => {
        clearInterval(intervalTime)
        setIntervalTime(null)
        setTime(0)
    }

    return <div className={secundomer}>
        <span className={secundomer_time}>Time: {state.time}</span>
        {turn ?
            <button className={secundomer_turn} onClick={run}>Run</button>
            :
            <button className={secundomer_turn} onClick={stop}>Stop</button>
        }
    </div>
}

export default Secundomer