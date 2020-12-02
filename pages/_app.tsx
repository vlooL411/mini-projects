import 'public/styles/global.sass';

import { ReactElement } from 'react';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps): ReactElement => (
	<Component {...pageProps} />
);

export default App;
