import { MouseEvent, ReactElement } from "react";

import style from "./styles/cell.module.sass";
import { ZEROONE } from "./lib";

type Props = {
  hightLight: ZEROONE;
  onChange?: (high?: ZEROONE) => void;
};

const Cell = ({ hightLight, onChange }: Props): ReactElement => {
  const { cell, cell_highlight } = style;

  const onMouseOver = ({ shiftKey, ctrlKey }: MouseEvent) => {
    if (shiftKey && ctrlKey) onChange(0);
    else if (shiftKey) onChange(1);
  };

  return (
    <div
      className={`${cell} ${hightLight ? cell_highlight : ""}`}
      onClick={() => onChange(hightLight == 0 ? 1 : 0)}
      onMouseOver={onMouseOver}
    />
  );
};

export default Cell;
