import Link from "next/link";
import { ReactElement, useMemo } from "react";

const Index = (): ReactElement => {
  const block = ([href, title]: [string, string], key): ReactElement => (
    <li key={key}>
      <Link href={href}>
        <a>{title}</a>
      </Link>
    </li>
  );

  const games = useMemo<ReactElement[]>(
    () =>
      [
        ["game/calculator", "Calculator"],
        ["game/secundomer", "Secundomer"],
        ["game/sudoku", "Sudoku"],
        ["game/tictactoe", "Tic Tac Toe"],
        ["game/gameoflife", "Game Of Life"],
      ].map(block),
    []
  );

  const canvases = useMemo<ReactElement[]>(
    () =>
      [
        ["game/canvas/raycasting", "Ray casting 2D"],
        ["game/canvas/raycasting3d", "Ray casting 3D"],
      ].map(block),
    []
  );

  return (
    <div className="index">
      <h2 style={{ marginLeft: ".5em", marginTop: 0 }}>Mini projects</h2>
      <ul>
        {games}
        <ol>
          Canvas
          {canvases}
        </ol>
      </ul>
    </div>
  );
};

export default Index;
