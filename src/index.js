import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import './index.css';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import App from './App'

window.addEventListener('load', () => {
	if (navigator.onLine){
		let img = new Image();
		console.log("Loading")
		img.src = "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN";
		img.onload = () => {
			console.log("Loaded");
			document.body.style.backgroundImage = "url(" + img.src + ")";
		};
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
