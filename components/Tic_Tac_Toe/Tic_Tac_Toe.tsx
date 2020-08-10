import { ReactElement, useState, useEffect } from "react";
import style from './styles/tic_tac_toe.module.sass'
import Toe, { TToe, TToeChar } from "./Toe";
import HistoryGame from "./HistoryGame";

const Tic_Tac_Toe = (): ReactElement => {
    const { tictac, tictac_win, current_move, current_move_char } = style
    const { game } = style

    const [firstRunGame, setFirstRunGame] = useState<boolean>(true)
    const [toes, setToes] = useState<TToe[]>(Array.from({ length: 9 }, _ => ({ char: null })))
    const [currentMove, setCurrentMove] = useState<boolean>(true)
    const [win, setWin] = useState<boolean>(false)
    const [history, _] = useState<TToe[][]>([])

    const reset = () => {
        history.length = 0
        setFirstRunGame(true)
        setToes(Array.from({ length: 9 }, _ => ({ char: null })))
        setCurrentMove(true)
        setWin(false)
    }

    //check win
    useEffect(() => {
        if (firstRunGame) { setFirstRunGame(!firstRunGame); return }

        const cmpThreeToes = (x: number, y: number, z: number): boolean => {
            const toe = toes[x].char
            return toes[x].light = toes[y].light = toes[z].light =
                (toe && (toe == toes[y].char && toe == toes[z].char))
        }

        const checkWin = () => {
            //horizontal check
            for (let i = 0; i < 9; i += 3)
                if (cmpThreeToes(i, i + 1, i + 2)) return true
            //vertical check
            for (let i = 0; i < 3; i++)
                if (cmpThreeToes(i, i + 3, i + 6)) return true
            //diagonal check
            return cmpThreeToes(0, 4, 8) || cmpThreeToes(2, 4, 6)
        }

        let checWin = checkWin()

        setToes([...toes])
        history.push(toes.map(t => Object.assign({}, t)))

        if (checWin)
            setWin(true)

    }, [currentMove])

    const GetMove = (move: boolean = currentMove): TToeChar => move ? 'x' : 'o'

    return <>
        <p className={current_move}> Current move:
            <span className={current_move_char}>
                {GetMove()}
            </span>
        </p>
        <div className={game}>
            <div className={tictac}>
                {toes.map((toe, i) =>
                    <Toe key={i} char={toe.char}
                        light={toe.light}
                        onClick={() => {
                            if (toes[i].char || win) return
                            toes[i].char = GetMove()
                            setCurrentMove(!currentMove)
                        }} />
                )}
            </div>
            <HistoryGame history={history}
                selectHistory={num => {
                    if (history.length == num + 1) return
                    history.length = num + 1
                    setFirstRunGame(true)
                    setToes(history[num].map(h => Object.assign({}, h)))
                    setCurrentMove(num % 2 != 0)
                    setWin(false)
                }} />
        </div>
        <button onClick={reset}>Reset</button>
        <div className={tictac_win}>
            {win ? <>
                Win
                <span className={current_move_char}>
                    {GetMove(!currentMove)}
                </span>
            </>
                : history.length == 9 ? <>End</> : null}
        </div>
    </>
}

export default Tic_Tac_Toe