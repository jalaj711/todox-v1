import React, { Suspense } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Paper, Typography, Fab } from "@material-ui/core"
import { ErrorOutlineOutlined, AddOutlined } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { Skeleton } from "@material-ui/lab"

/**
 * Lazy load the TodoItem component becaus the list may be empty
 * or it may even not exist
 */
let TodoItem = React.lazy(() => import("../components/TodoItem"))

/**
 * This component provides a skeleton animation until
 * the actual todos are being loaded
 */
let Loader = () => {
  let classes = makeStyles(theme => ({
    paper: {
      width: "-webkit-fill-available",
      alignItems: "center",
      padding: 8,
      marginTop: 8,
      display: "block",
    },
  }))()
  return (
    <Paper className={classes.paper}>
      <Skeleton width={0.5 * window.innerWidth} animation="wave" />
      <Skeleton width={0.15 * window.innerWidth} animation="wave" />
    </Paper>
  )
}

/**
 * This component renders the whole actual lis of todos
 * for the given list. It i separate because it uses Suspense
 * as the TodoItem component  may not be loaded yet (Its being
 * lazy loaded)
 *
 * @param {*} props
 */
let TodoList = props => {
  return <Suspense fallback={<Loader />}>
    {props.tasks.map(task => (
      <TodoItem task={task} key={task.id} />
    ))}
  </Suspense>
}

class List extends React.Component {
  /**
   * This component is the actual 'list' where all the individual
   * components are rendered.
   *
   * @param {*} props
   */
  constructor(props) {
    super(props)
    this.classes = this.props.classes
    this.state = {
      error: false,
      loaded: false,
      tasks: [],
      listname: props.match.params.id,
    }
    this.updateListData = this.updateListData.bind(this)
  }

  updateListData() {
    let listname = this.props.match.params.id

    //Check whether this list exists or not
    window.database.get("lists", listname).onsuccess = evt => {
      if (evt.target.result) {
        if (window.setTitle)
          window.setTitle(evt.target.result.name.capitalize())
        document.title = evt.target.result.name.capitalize()
        //Get the tasks
        window.database.getMultipleByKey("tasks", "parent", listname, tasks => {
          console.log(tasks)
          //Change the state
          this.setState({
            //Create an error if there are no tasks in the list
            error:
              tasks.length === 0 ? "You have no tasks in this list yet" : null,
            loaded: true,
            tasks: tasks,
            listname: listname,
          })
        })
      } else {
        if (window.setTitle) window.setTitle("List not found")
        document.title = "List not found"
        // The requested list could not be found. Show an error
        this.setState({
          tasks: [],
          loaded: true,
          error: "This list was not found, please create it first",
          listname: listname,
        })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true
    } else {
      if (nextProps.match.params.id !== this.state.listname) {
        this.updateListData(nextProps)
      }
      return false
    }
  }

  /**
   * This function executes the tasks that we should do only
   * once the component has been mounted, otherwise we won't
   * be able to update the state.
   *
   * It accesses the database and searches for the tasks in this list
   */
  componentDidMount() {
    if (!window.database) {
      import("../database").then(database => {
        console.log("[indexedDB] Creating database instance")
        new database.default().onsuccess = evt => {
          window.database = evt.target.result
          this.updateListData()
        }
      })
    } else {
      this.updateListData()
    }
  }

  render() {
    return (
      <div className={this.classes.root}>
        {
          //Check whether data is available or not and show content likewise
          this.state.loaded ? (
            //Look for errors
            this.state.error ? (
              <div className={this.classes.error}>
                <ErrorOutlineOutlined className={this.classes.icon} />
                <Typography>{this.state.error}</Typography>
              </div>
            ) : (
              //Load the todos
              <TodoList tasks={this.state.tasks} />
            )
          ) : (
            //Show the loader
            <Loader />
          )
        }

        {
          /**
           * This is a fab to add more tasks to this list.
           * It shouldn't show up if the list is non-existent
           */
          this.state.error ===
          "This list was not found, please create it first" ? (
            ""
          ) : (
            <Link
              to={`/todox/new/${this.state.listname}`}
              className={this.classes.fab}
            >
              <Fab color="primary" aria-label="Add a todo to this list">
                <AddOutlined />
              </Fab>
            </Link>
          )
        }
      </div>
    )
  }
}

/**
 * Get the list styled and export it.
 */
export default withStyles(theme => ({
  root: {
    display: "block",
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    width: "-webkit-fill-available",
    display: "flex",
    alignItems: "center",
    padding: 8,
    marginTop: 8,
  },
  icon: {
    width: "60%",
    height: "60%",
  },
  error: {
    width: "-webkit-fill-available",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    background: "transparent",
    opacity: 0.7,
    textAlign: "center",
  },
  fab: {
    position: "fixed",
    bottom: 25,
    right: 25,
  },
}))(List)
