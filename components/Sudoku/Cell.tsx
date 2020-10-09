import Input from "./Input"
import { ReactElement, useState, useRef } from "react"
import style from "./styles/cell.module.sass"

export type TCell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null
type Props = {
    char: TCell
    disabled: boolean
    current: boolean
    light: boolean
    danger: boolean
    changeCell(cellChar: TCell): void
    mouseEnter(): void
}

const Cell = ({ char, disabled, current, light, danger, changeCell, mouseEnter }: Props): ReactElement => {
    const { cell, cell_disabled, cell_current, cell_light, cell_danger } = style
    const { cell_mark, cell_possible, cell_char } = style
    const { cell_char_mark, cell_char_possible } = style

    const inputRef = useRef<HTMLButtonElement>(null)
    const [focus, setFocus] = useState<boolean>(false)
    const [possibleChar, setPossibleChar] = useState<TCell[]>([])
    const [modeWrite, setModeWrite] = useState<boolean>(false)

    const isPossibleCharLengthZero = () => possibleChar.length == 0

    const onChangeCellChar = (cellChar: string): void => {
        if (!cellChar || cellChar?.length == 0) return

        const key = cellChar.toLowerCase()[0]

        switch (key) {
            case 'x':
            case 'ч':
                if (modeWrite) possibleChar.length = 0
                changeCell(null)
                break;
            case 'w':
            case 'ц':
                if (!modeWrite) changeCell(null)
                setModeWrite(!modeWrite)
        }

        if (!(key >= '1' && key <= '9')) return

        if (modeWrite) {
            const index = possibleChar.findIndex(el => el == +key)
            if (index == -1) {
                possibleChar.push((+key) as TCell)
                possibleChar.sort()
            }
            else possibleChar.splice(index, 1)
            setPossibleChar([...possibleChar])
        } else changeCell((+key) as TCell)
    }

    const onClick = () => {
        if (!focus)
            inputRef?.current?.focus()
    }

    const onFocus = () => {
        if (!disabled)
            setFocus(true)
    }

    const onBlur = () => {
        if (!disabled)
            setFocus(false)
    }

    const onMouseLeave = () => inputRef.current?.blur()

    const classesName = (): string =>
        [
            cell,
            char && !disabled ? cell_mark : '',
            !isPossibleCharLengthZero() ? cell_possible : '',
            disabled ? cell_disabled : '',
            current ? cell_current : '',
            light && !current && !disabled ? cell_light : '',
            danger ? cell_danger : ''
        ].join(' ')

    return <button
        ref={inputRef}
        className={classesName()}
        onKeyDown={(e) => onChangeCellChar(e.key)}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={mouseEnter}
        onMouseLeave={onMouseLeave}>

        <div className={`${cell_char} ${isPossibleCharLengthZero() || !modeWrite ? cell_char_mark : cell_char_possible}`}>
            {modeWrite ? possibleChar : char}
        </div>

        {focus ?
            <Input charCurrent={char}
                mode={modeWrite}
                possibleChar={possibleChar}
                changeCell={onChangeCellChar} /> :
            null}
    </button>
}

export default Cell