import { ReactElement } from "react";
import 'public/styles/global.sass'

const App = ({ Component, pageProps }): ReactElement =>
    <Component {...pageProps} />

export default App