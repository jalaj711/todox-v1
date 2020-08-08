import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CssBaseline, Backdrop, CircularProgress } from '@material-ui/core';
import './index.css';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

let App = React.lazy(() => import('./App'))

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Suspense
				fallback={
					<Backdrop open={true}>
						<CircularProgress />
					</Backdrop>
				}>
				<App />
			</Suspense>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
