import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import theme from "./theme"
import * as serviceWorker from "./serviceWorker"
import { HashRouter as Router } from "react-router-dom"
import App from "./pages/app"

window.addEventListener("load", () => {
  if (navigator.onLine && window.location.hash !== "#/") {
    let img = new Image()
    img.src =
      "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN"
    img.onload = () => {
      document.body.style.backgroundImage = "url(" + img.src + ")"
    }
  }
})

/**
 * This creates a database if one does not exist and then adds it to 
 * the window for global access.
 */
if (!window.database) {
  import("./database").then(database => {
    console.log("[indexedDB] Creating database instance")
    let db = new database.default();
    db.onsuccess = evt => {
      window.database = db
    }
  })
}

//eslint-disable-next-line
String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
