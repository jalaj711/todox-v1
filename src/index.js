import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import {
  ThemeProvider,
  CssBaseline,
  Backdrop,
  CircularProgress,
} from "@material-ui/core"
import theme from "./theme"
import * as serviceWorker from "./serviceWorker"
import { HashRouter as Router } from "react-router-dom"
import Home from './pages/home';

window.addEventListener("load", () => {
  if (navigator.onLine && window.location.pathname !== '/') {
    let img = new Image()
    img.src =
      "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN"
    img.onload = () => {
      document.body.style.backgroundImage = "url(" + img.src + ")"
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense
          fallback={
            <Backdrop open={true}>
              <CircularProgress />
            </Backdrop>
          }
        >
          <Home />
        </Suspense>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
