import React, { Suspense } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Backdrop, CircularProgress } from "@material-ui/core"
import { Switch, Route } from "react-router-dom"
import Snackbar from "../components/Snackbar"
import Confirm from "../components/Confirm"
import theme from "../theme"

//Lazy load components
let MobileDrawer = React.lazy(() => import("../components/MobileDrawer"))
let DesktopDrawer = React.lazy(() => import("../components/DesktopDrawer"))

//Lazy load pages
let Index = React.lazy(() => import("./index"))
let Lists = React.lazy(() => import("./lists"))
let Create = React.lazy(() => import("./create"))
let Starred = React.lazy(() => import("./starred"))
let Edit = React.lazy(() => import("./edit"))
let ViewBy = React.lazy(() => import("./viewby"))

const drawerWidth = 240

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: window.innerWidth < theme.breakpoints.values.sm,
    }
  }

  componentDidMount() {
    let prevVal = 0

    window.addEventListener("resize", () => {
      let breakpoint = theme.breakpoints.values.sm
      if ((breakpoint - prevVal) / (breakpoint - window.innerWidth) < 0) {
        this.setState({ isMobile: window.innerWidth < breakpoint })
      }
      prevVal = window.innerWidth
    })
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Snackbar />
        <Confirm />
        <Suspense
          fallback={
            <Backdrop open={true}>
              <CircularProgress />
            </Backdrop>
          }
        >
          {this.state.isMobile ? <MobileDrawer /> : <DesktopDrawer />}

          <main className={this.props.classes.content}>
            <div className={this.props.classes.toolbar} />
            <Switch>
              <Route path="/todox" exact component={Index} />
              <Route path="/todox/lists/:id" component={Lists} />
              <Route path="/todox/new/:id" component={Create} />
              <Route path="/todox/starred" component={Starred} />
              <Route path="/todox/edit/:id" component={Edit} />
              <Route path="/todox/viewby/:id" component={ViewBy} />
            </Switch>
          </main>
        </Suspense>
      </div>
    )
  }
}

export default withStyles(theme => ({
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
}))(Home)
