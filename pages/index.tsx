import { ReactElement, useState, useEffect } from "react";
import Sudoku from "../components/Sudoku/Sudoku";

const Index = (): ReactElement => {

  return (<>
    <div style={{ width: '500px', height: '500px', fontSize: '65px' }}>
      <Sudoku />
    </div>
  </>)
};

export default Index;
