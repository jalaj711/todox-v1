import React, { Suspense } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Backdrop, CircularProgress } from "@material-ui/core"
import { Switch, Route } from "react-router-dom"
import theme from "../theme"

//Lazy load components
let MobileDrawer = React.lazy(() => import("../components/MobileDrawer"))
let DesktopDrawer = React.lazy(() => import("../components/DesktopDrawer"))

//Lazy load pages
let Index = React.lazy(() => import("./index"))
let Lists = React.lazy(() => import("./lists"))

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export default function Home() {
  const classes = useStyles()
  const [isMobile, setMobileDrawer] = React.useState(
    window.innerWidth < theme.breakpoints.values.sm
  )
  let prevVal = 0

  window.addEventListener("resize", function () {
    let breakpoint = theme.breakpoints.values.sm
    if ((breakpoint - prevVal) / (breakpoint - window.innerWidth) < 0) {
      setMobileDrawer(window.innerWidth < breakpoint)
    }
    prevVal = window.innerWidth
  })

  return (
    <div className={classes.root}>
      <Suspense
        fallback={
          <Backdrop open={true}>
            <CircularProgress />
          </Backdrop>
        }
      >
        {isMobile ? <MobileDrawer /> : <DesktopDrawer />}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/lists/:id" component={Lists} />
          </Switch>
        </main>
      </Suspense>
    </div>
  )
}
