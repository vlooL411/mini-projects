import { Point } from ".";
import { TCell } from "./Cell";

export namespace Rules {
  //rule light vertical
  export const isLightV = (i: number, j: number, point: Point) =>
    i % 3 == point.v % 3 && j % 3 == point.h % 3;

  //rule light Horizontal
  export const isLightH = (i: number, j: number, point: Point) => {
    const [ii, jj, vv, hh] = [i, j, point.v, point.h].map((el) =>
      Math.floor(el / 3)
    );
    return jj == hh && ii == vv;
  };

  //check final game
  export const Win = (cells: TCell[][], answerCells: TCell[][]) => {
    for (let i = 0; i < cells.length; i++)
      for (let j = 0; j < cells[i].length; j++)
        if (cells[i][j] == answerCells[i][j]) return false;
    return true;
  };

  //rule in the square
  export const Square = (i: number, j: number, cells: TCell[][]): boolean => {
    let elemsInSquad = 0;
    for (let h = 0; h < cells.length; h++)
      if (cells[i][j] == cells[i][h] && ++elemsInSquad > 1) return true;
    return false;
  };

  //rule on the vertical
  export const Vertical = (i: number, j: number, cells: TCell[][]): boolean => {
    let elemsInV = 0;
    for (let v = i % 3; v < cells.length; v += 3) {
      for (let h = j % 3; h < cells.length; h += 3)
        if (cells[i][j] == cells[v][h] && ++elemsInV > 1) return true;
    }
    return false;
  };

  //rule on the horizontal
  export const Horizontal = (
    i: number,
    j: number,
    cells: TCell[][]
  ): boolean => {
    let elemsInH = 0;
    const [ii, jj] = [Math.floor(i / 3) * 3, Math.floor(j / 3) * 3];
    for (let v = ii; v < ii + 3; v++)
      for (let h = jj; h < jj + 3; h++)
        if (cells[i][j] == cells[v][h] && ++elemsInH > 1) return true;
    return false;
  };
}
