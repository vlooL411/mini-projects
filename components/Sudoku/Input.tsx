import { ReactElement } from "react"
import style from './styles/input.module.sass'
import { TCell } from "./Cell"

type Props = {
    charCurrent: TCell
    possibleChar: TCell[]
    mode: boolean
    changeCell(cell: string): void
}

const Input = ({ charCurrent, possibleChar, mode, changeCell }: Props): ReactElement => {

    const { input, input_keys, input_keys_current, input_keys_key } = style
    const { input_keys_disabled, input_mode_match, input_mode_write } = style
    return (<div className={`${input} ${mode ? input_mode_write : input_mode_match}`}>
        <ul className={input_keys}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key, i) =>
                <li key={i} onClick={() => changeCell(key.toString())}
                    className={`${input_keys_key} ${charCurrent == key ? input_keys_current : ''} ${possibleChar.includes(key as TCell) ? input_keys_disabled : ''}`}>
                    {key}
                </li>)}
            <li className={input_keys_key} key={13}></li>
            <li className={input_keys_key} key={11} onClick={() => changeCell('w')}>W</li>
            <li key={12} onClick={() => changeCell('x')}
                className={`${input_keys_key} ${mode ? input_keys_disabled : ''}`}>
                X
            </li>
        </ul>
    </div>)
}

export default Input