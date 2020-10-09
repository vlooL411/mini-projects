import { TToe } from "./Toe";

export const checkWinChangeLight = (toes: TToe[]): boolean => {
  const cmpThreeToes = (x: number, y: number, z: number): boolean => {
    const toe = toes[x].char;
    const toeSame = toe && toe == toes[y].char && toe == toes[z].char;
    if (toeSame) toes[x].light = toes[y].light = toes[z].light = toeSame;
    return toeSame;
  };

  let win = false;
  //horizontal check
  for (let i = 0; i < 9; i += 3)
    if (cmpThreeToes(i, i + 1, i + 2)) {
      win = true;
      break;
    }
  //vertical check
  for (let i = 0; i < 3; i++)
    if (cmpThreeToes(i, i + 3, i + 6)) {
      win = true;
      break;
    }
  //diagonal check
  return cmpThreeToes(0, 4, 8) || cmpThreeToes(2, 4, 6) || win;
};
