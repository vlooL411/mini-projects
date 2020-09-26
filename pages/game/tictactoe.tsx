import { ReactElement } from "react";
import Tic_Tac_Toe from "../../components/Tic_Tac_Toe";

const Tictactoe = (): ReactElement => {
    return <div style={{ padding: 20, width: 600, height: 290, fontSize: 80 }}>
        <Tic_Tac_Toe />
    </div>
}

export default Tictactoe