import { Rules } from "./Rules";
import Cell, { TCell } from "./Cell";
import { Generate } from "./GenerateSudoku";
import { ReactElement, useState, useEffect, useMemo } from "react"
import style from "./styles/sudoku.module.sass"

export type Point = {
    v: number
    h: number
}

const Sudoku = (): ReactElement => {
    const { sudoku, sudoku_finish, sudoku_cells } = style

    const [win, setFinish] = useState<boolean>(false)
    const [currentCell, setCurrentCell] = useState<Point>({ v: 0, h: 0 })
    const [cells, setCells] = useState<TCell[][]>([])
    const [startGame, setStartGame] = useState<boolean>(true)

    //new game or first play
    const [answerCells, primaryAnswers] = useMemo<[TCell[][], Point[]]>(() => {
        const { cells, answers, primaryAnswers } = Generate()
        setCells(cells)
        return [answers, primaryAnswers]
    }, [startGame])

    useEffect(() => {
        if (Rules.Win(cells, answerCells))
            setFinish(false);
    }, [cells])

    const isLight = (i: number, j: number): boolean =>
        Rules.isLightV(i, j, currentCell) || Rules.isLightH(i, j, currentCell)

    const isDanger = (i, j): boolean => {
        if (!cells[i][j]) return false
        //check rules
        return Rules.Square(i, j, cells) ||
            Rules.Vertical(i, j, cells) ||
            Rules.Horizontal(i, j, cells)
        //false => element set till without danger
    }

    const NewGame = () => setStartGame(!startGame)

    const isDisabled = (i, j) => primaryAnswers.findIndex(p => p.v == i && p.h == j) != -1

    return <>
        {win ? <h1>Win</h1> : null}
        <button onClick={NewGame}> New game</button>
        <div className={`${sudoku} ${win ? sudoku_finish : ''}`}>
            {cells.map((arrCells, i) =>
                <ul key={i} className={sudoku_cells}>
                    {arrCells.map((char, j) =>
                        <Cell key={j} char={char}
                            current={i == currentCell.v && j == currentCell.h}
                            disabled={isDisabled(i, j)}
                            light={isLight(i, j)}
                            danger={isDanger(i, j)}
                            changeCell={cellChar => {
                                cells[i][j] = cellChar
                                setCells([...cells])
                            }}
                            mouseEnter={() => setCurrentCell({ v: i, h: j })}
                        />)}
                </ul>)}
        </div>
    </>
}

export default Sudoku