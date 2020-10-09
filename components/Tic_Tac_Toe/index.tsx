import HistoryGame from "./HistoryGame";
import Toe, { TToe, TToeChar } from "./Toe";
import { ReactElement, useState, useEffect, useMemo } from "react";
import style from './styles/tic_tac_toe.module.sass'
import { checkWinChangeLight } from "./Rules";

const randomMove = (): boolean => Math.floor(Math.random() * 10) % 2 == 0
const toesInit = (): TToe[] => Array.from<any, TToe>({ length: 9 }, _ => ({ char: null }))

const Tic_Tac_Toe = (): ReactElement => {
    const { game } = style
    const { tictac, tictac_win, current_move, current_move_char } = style

    const [firstRunGame, setFirstRunGame] = useState<boolean>(true)
    const [toes, setToes] = useState<TToe[]>(toesInit())
    const [history] = useState<TToe[][]>([])
    const [win, setWin] = useState<boolean>(false)
    const [moves, setMoves] = useState<{ current?: boolean, firstMove: boolean }>({ firstMove: randomMove() })

    useEffect(() => { moves.current = moves.firstMove }, [moves.firstMove])

    const reset = () => {
        history.length = 0
        setWin(false)
        setMoves({ firstMove: randomMove() })
        setFirstRunGame(true)
        setToes(toesInit())
    }

    //check win
    useEffect(() => {
        if (win) return
        if (firstRunGame) { setFirstRunGame(!firstRunGame); return }

        const checWin = checkWinChangeLight(toes)

        setToes([...toes])
        history.push(toes.map(t => ({ ...t })))

        if (checWin) setWin(true)
    }, [moves])

    const historyGame = useMemo<ReactElement>(() =>
        <HistoryGame history={history}
            selectHistory={num => {
                if (history.length == num + 1) return

                history.length = num + 1
                setFirstRunGame(true)
                setToes(history[num].map(h => ({ ...h })))
                setWin(false)

                const current = (num % 2 + (moves.firstMove ? 0 : 1)) != 0
                setMoves({ ...moves, current })
            }} />,
        [history.length])

    const GetMove = (move: boolean = moves.current): TToeChar => move ? 'x' : 'o'
    const Win = useMemo(() =>
        win ? <>
            Win
            <span className={current_move_char}>
                {GetMove(!moves.current)}
            </span>
        </> : history.length == 9 ? <>End</> : null,
        [win, history.length])

    return <>
        <p className={current_move}>
            Current move:
            <span className={current_move_char}>
                {GetMove()}
            </span>
        </p>
        <div className={game}>
            <div className={tictac}>
                {toes.map((toe, i) =>
                    <Toe key={i} char={toe.char} light={toe.light}
                        onClick={() => {
                            if (toes[i].char || win) return
                            toes[i].char = GetMove()
                            setMoves({ ...moves, current: !moves.current })
                        }} />
                )}
            </div>
            {historyGame}
        </div>
        <button onClick={reset}>Reset</button>
        <div className={tictac_win}>
            {Win}
        </div>
    </>
}

export default Tic_Tac_Toe