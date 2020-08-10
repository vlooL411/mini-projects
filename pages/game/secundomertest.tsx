import { ReactElement, useState } from "react"
import Secundomer from "../../components/Secundomer/Secundomer"

const SecundomerTest = (): ReactElement => {
    return <>
        <Secundomer timeUpdate={0.3} />
    </>
}

export default SecundomerTest