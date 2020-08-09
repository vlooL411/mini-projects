import { ReactElement, useState, useEffect, memo } from "react";
import style from './styles/toe.module.sass'

export type TToe = {
    char: 'x' | 'o' | null
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