import Toe, { TToe } from "./Toe";
import { ReactElement } from "react";
import style from './styles/historygame.module.sass'

type Props = {
    history: TToe[][]
    selectHistory(numHistory: number): void
}

const HistoryGame = ({ history, selectHistory }: Props): ReactElement => {
    const { history_game, history_game_tictac } = style
    return <div className={history_game}>
        {history.map((toesHis, i) =>
            <div key={i} className={history_game_tictac}
                onClick={() => selectHistory(i)}>
                {toesHis.map((toe, j) =>
                    <Toe key={j} char={toe.char} light={toe.light} />)}
            </div>
        )}
    </div>
}

export default HistoryGame