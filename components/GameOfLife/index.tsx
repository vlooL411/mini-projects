import {
  KeyboardEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Cell from "./Cell";
import style from "./styles/gameoflife.module.sass";
import {
  cellsToEmpty,
  cellsToRandom,
  extend,
  fill,
  generate,
  random,
  ZEROONE,
} from "./lib";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

type State = {
  skip?: boolean;
  interval?: NodeJS.Timeout;
};

type HW = { h: number; w: number };

const frameTime = 1000 / 30;
const hwDefault: HW = { h: 30, w: 50 };
const cellHW: HW = { h: 20, w: 20 };

type Props = {
  maxHeight?: number;
  maxWidth?: number;
};

const GameOfLife = ({ maxHeight = 0.9, maxWidth = 1 }: Props): ReactElement => {
  const { gameoflife } = style;

  useEffect(() => {
    const onResize = () => {
      const { innerHeight, innerWidth } = window;
      const { h: cellH, w: cellW } = cellHW;
      const [h, w] = [
        (innerHeight * maxHeight) / cellH,
        (innerWidth * maxWidth) / cellW,
      ].map(Math.floor);

      const runStop = () => {
        setCells([...extend(cells, h, w)]);
        setHW({ h, w });
      };

      whileSimulation(runStop, runStop);
    };

    window.onresize = onResize;
    onResize();
  }, []);

  const [hw, setHW] = useState<{ h: number; w: number }>(hwDefault);

  const { h, w } = hw;
  const [state] = useState<State>({ interval: null });
  const [cells, setCells] = useState<ZEROONE[][]>(generate(h, w));

  const simulation = useCallback((cells: ZEROONE[][]) => {
    if (state.skip) return;

    const cs = [...cells];
    for (let i = 0; i < cells.length; i++)
      for (let j = 0; j < cells[i].length; j++) {
        let neighbors = 0;
        operations.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (
            newI >= 0 &&
            newI < cells.length &&
            newJ >= 0 &&
            newJ < cells[i].length
          )
            neighbors += cs[newI][newJ];
        });

        if (neighbors < 2 || neighbors > 3) cs[i][j] = 0;
        else if (cs[i][j] == 0 && neighbors === 3) cs[i][j] = 1;
      }
    setCells(cs);
  }, []);

  const isRunning = (): boolean => state.interval == null;

  const runSimulation = () =>
    (state.interval = setInterval(() => simulation(cells), frameTime));

  const stopSimulation = () => {
    clearInterval(state.interval);
    state.interval = null;
    state.skip = false;
    setCells([...cells]);
  };

  const onRunning = () => (isRunning() ? runSimulation() : stopSimulation());

  const whileSimulation = (run: () => void, stop: () => void) => {
    state.skip = true;

    if (isRunning()) stop();
    else {
      stopSimulation();
      run();
      runSimulation();
    }

    state.skip = false;
  };

  const onRandom = () =>
    whileSimulation(
      () => cellsToRandom(cells),
      () => setCells(random(h, w))
    );

  const onClear = () =>
    whileSimulation(
      () => cellsToEmpty(cells),
      () => setCells(generate(h, w))
    );

  const Cells = useMemo<ReactElement[]>(() => {
    const wLength = cells.length > 0 ? cells[0].length : 0;

    return fill<ReactElement>(cells.length, wLength, (rm, i, j) =>
      rm.push(
        <Cell
          key={`${i}-${j}`}
          hightLight={cells[i][j]}
          onChange={(high) => {
            cells[i][j] = high;
            whileSimulation(
              () => {},
              () => setCells([...cells])
            );
          }}
        />
      )
    );
  }, [cells]);

  const onKey = ({ altKey, ctrlKey }: KeyboardEvent) =>
    (state.skip = altKey || ctrlKey);

  return (
    <>
      <button onClick={onRunning}>{isRunning() ? "Run" : "Stop"}</button>
      <button onClick={onRandom}>Random</button>
      <button onClick={onClear}>Clear</button>
      <p>
        Draw press shift, clear cell press alt + shift, draw one cell alt +
        click
      </p>
      <div
        tabIndex={0}
        onKeyUp={onKey}
        onKeyDown={onKey}
        className={gameoflife}
        style={{
          gridTemplateColumns: `repeat(${w}, ${cellHW.w}px)`,
          gridTemplateRows: `repeat(${h}, ${cellHW.h}px)`,
        }}
      >
        {Cells}
      </div>
    </>
  );
};

export default GameOfLife;
