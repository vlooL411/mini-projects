import { ReactElement, useState, useEffect } from "react";
import Sudoku from "../components/Sudoku/Sudoku";

const Index = (): ReactElement => {

  return (<>
    <div style={{ padding: 20, width: 500, height: 500, fontSize: 65 }}>
      <Sudoku />
    </div>
  </>)
};

export default Index;
