import { ReactElement } from "react";
import tic_tac_toe_style from './styles/tic_tac_toe.module.sass'
import style from './styles/historygame.module.sass'
import Toe, { TToe } from "./Toe";

type Props = {
    history: TToe[][]
    selectHistory(numHistory: number): void
}

const HistoryGame = ({ history, selectHistory }: Props): ReactElement => {
    const { tictac } = tic_tac_toe_style
    const { history_game, history_game_tictac, history_game_tictac_container } = style
    return <>
        <div className={history_game}>
            {history.map((toesHis, i) =>
                <div key={i} className={`${tictac} ${history_game_tictac}`}
                    onClick={() => selectHistory(i)}>
                    {toesHis.map((toe, j) =>
                        <Toe key={j} char={toe.char} light={toe.light} />)}
                </div>
            )}
        </div>
    </>
}

export default HistoryGame