import { ReactElement } from 'react'
import style from './styles/toe.module.sass'

export type TToeChar = 'x' | 'o' | null

export type TToe = {
    char: TToeChar
    light?: boolean
    onClick?(): void
}

const Toe = ({ char, light, onClick }: TToe): ReactElement => {
    const { toe, toe_char, toe_off, toe_light } = style

    return <div className={`${toe} ${light ? toe_light : toe_off}`} onClick={onClick}>
        <p className={toe_char}>{char}</p>
    </div>
}

export default Toe