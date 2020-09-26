import { ReactElement } from "react";
import 'public/global.sass'

const App = ({ Component, pageProps }): ReactElement =>
    <Component {...pageProps} />

export default App