import { ReactElement } from "react";
import '../public/styles/styles.sass'

const App = ({ Component, pageProps }): ReactElement => {
    return (<>
        <Component {...pageProps} />
    </>)
}

export default App