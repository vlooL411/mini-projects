import { ReactElement, useState, useEffect } from "react"
import style from "./styles/sudoku.module.sass"
import Cell, { TCell } from "./Cell";
import { GenerateSudoku } from "./GenerateSudoku";

interface Point {
    v: number
    h: number
}

const Sudoku = (): ReactElement => {
    const { sudoku, sudoku_finish, sudoku_cells } = style

    const [finish, setFinish] = useState<boolean>(false)
    const [currentCell, setCurrentCell] = useState<Point>({ v: 0, h: 0 })
    const [cells, setCells] = useState<TCell[][]>([])
    const [answerCells, _] = useState<TCell[][]>([])
    const [primaryAnswers, __] = useState<Point[]>([])

    useEffect(() => {
        GenerateSudoku().forEach(s => answerCells.push(s))
        const cellsInit: TCell[][] = Array.from({ length: 9 }, _ => Array(9).fill(null))

        const countElemntsForGet = (Math.random() * 100 % 81 + 5) / 3
        for (let i = 0; i < countElemntsForGet; i++) {
            const [v, h] = [Math.floor(Math.random() * 10 % 9), Math.floor(Math.random() * 10 % 9)]
            primaryAnswers.push({ v, h })
            cellsInit[v][h] = answerCells[v][h]
        }
        setCells(cellsInit)
    }, [])

    useEffect(() => {
        let checkFinish = true
        for (let i = 0; i < cells.length; i++)
            for (let j = 0; j < cells[i].length; j++)
                if (cells[i][j] == answerCells[i][j]) {
                    checkFinish = false
                    break
                }
        if (!checkFinish) setFinish(checkFinish);
    }, [cells])


    return <>
        {finish ? <h1>Finish</h1> : null}
        <button onClick={() => { }}>New game</button>
        <div className={`${sudoku} ${finish ? sudoku_finish : ''}`}>
            {cells.map((arrCells, i) =>
                <ul key={i} className={sudoku_cells}>
                    {arrCells.map((char, j) =>
                        <Cell key={j} char={char}
                            disabled={primaryAnswers.findIndex(p => p.v == i && p.h == j) != -1}
                            current={i == currentCell.v && j == currentCell.h}
                            changeCell={cellChar => {
                                cells[i][j] = cellChar
                                setCells([...cells])
                            }}
                            mouseEnter={() => setCurrentCell({ v: i, h: j })}

                            light={(() => {
                                //lighting vertical line
                                const vLine = i % 3 == currentCell.v % 3 && j % 3 == currentCell.h % 3
                                if (vLine) return true
                                //lighting horizontal line
                                const [ii, jj, vv, hh] = [i, j, currentCell.v, currentCell.h].map(el => Math.floor(el / 3))
                                const hLine = jj == hh && ii == vv
                                return hLine
                            }).call(null)}

                            danger={(() => {
                                if (cells[i][j] == null) return false
                                //check rules in the squad
                                let elemsInSquad = 0
                                for (let h = 0; h < cells.length; h++)
                                    if (cells[i][j] == cells[i][h])
                                        if (++elemsInSquad > 1) return true
                                //check rules on the vertical
                                let elemsInV = 0
                                for (let v = i % 3; v < cells.length; v += 3) {
                                    for (let h = j % 3; h < cells.length; h += 3)
                                        if (cells[i][j] == cells[v][h])
                                            if (++elemsInV > 1) return true
                                }
                                //check rules on the horizontal
                                let elemsInH = 0
                                const [ii, jj] = [Math.floor(i / 3) * 3, Math.floor(j / 3) * 3]
                                for (let v = ii; v < ii + 3; v++) {
                                    for (let h = jj; h < jj + 3; h++) {
                                        if (cells[i][j] == cells[v][h])
                                            if (++elemsInH > 1) return true
                                    }
                                }
                                //element set till without danger
                                return false
                            }).call(null)}
                        />)}
                </ul>)}
        </div>
    </>
}

export default Sudoku