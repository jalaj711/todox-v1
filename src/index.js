import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import './index.css';
import './bg_offline.jpg';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import App from './App'

window.addEventListener('load', () => {
	if (!navigator.onLine){
		document.body.style.backgroundImage = "url(/static/media/bg_offline.jpg) !important"
	}
})

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
				<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
