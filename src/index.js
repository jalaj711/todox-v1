import React from "react"
import {createRoot} from "react-dom/client"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import theme from "./theme"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./pages/app"

window.addEventListener("load", () => {
  if (navigator.onLine && window.location.pathname !== "/") {
    let img = new Image()
    img.src =
      "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN"
    img.onload = () => {
      document.body.style.backgroundImage = "url(" + img.src + ")"
    }
  }
})

//eslint-disable-next-line
String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const root = createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
