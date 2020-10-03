import Link from 'next/link'
import { ReactElement, useMemo } from 'react'

const Index = (): ReactElement => {
  const block = ([href, title]: [string, string], key): ReactElement =>
    <li key={key}><Link href={href}><a>{title}</a></Link></li>

  const games = useMemo<ReactElement[]>(() =>
    [["game/calculator", "Calculator"],
    ["game/secundomer", "Secundomer"],
    ["game/sudoku", "Sudoku"],
    ["game/tictactoe", "Tic Tac Toe"]].map(block), [])

  const canvases = useMemo<ReactElement[]>(() =>
    [["game/canvas/raycasting", "Ray casting 2D"],
    ["game/canvas/raycasting3d", "Ray casting 3D"]].map(block), [])

  return <>
    <h2 style={{ marginLeft: '.5em' }}>Mini projects</h2>
    <ul /* style={{ display: "flex", width: '100%', height: '100%', fontSize: 25 }} */>
      {games}
      <ol>
        Canvas
      {canvases}
      </ol>
    </ul>
  </>
};

export default Index;
