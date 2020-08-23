import React from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  Collapse,
  Typography,
  Switch,
  Fab,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core"
import { AddOutlined, CloseOutlined } from "@material-ui/icons"
//import { Link } from "react-router-dom"

class CreateNew extends React.Component {
  /**
   * This component is the page where all the individual
   * todos are created
   *
   * @param {*} props
   */

  state = {
    lists: [],
    listname: "",
    importance: 0,
    setReminder: false,
  }
  constructor(props) {
    super(props)
    this.classes = this.props.classes
    this.state.listname = props.match.params.id
    this.updateImportance = this.updateImportance.bind(this)
    this.updateListname = this.updateListname.bind(this)
    this.updateReminder = this.updateReminder.bind(this)
  }

  componentDidMount() {
    if (window.setTitle) window.setTitle("Create New Task")
    document.title = "Create new task"
    if (!window.database) {
      import("../database").then(database => {
        console.log("[indexedDB] Creating database instance")
        new database.default().onsuccess = evt => {
          window.database = evt.target.result
        }
      })
    }
    window.database.getMultipleByFilters(
      "lists",
      "name",
      {
        filter: "__ne",
        val: "",
      },
      lists => {
        this.setState({
          lists: lists,
        })
      }
    )
  }

  updateListname(evt) {
    this.setState({
      ...this.state,
      listname: evt.target.value,
    })
  }

  updateImportance(evt) {
    this.setState({
      ...this.state,
      importance: evt.target.value,
    })
  }

  updateReminder(evt) {
    this.setState({
      ...this.state,
      setReminder: evt.target.checked,
    })
  }

  render() {
    return (
      <div>
        <form autoComplete="false">
          <TextField
            className={this.classes.input}
            variant="outlined"
            label="Enter task name"
          />
          <TextField
            className={this.classes.input}
            variant="outlined"
            label="Enter task details (Optional)"
            multiline
          />
          <FormControl variant="outlined" className={this.classes.formControl}>
            <InputLabel id="list-choosing-label">
              Choose where to add
            </InputLabel>
            <Select
              labelId="list-choosing-label"
              id="list-chooser"
              value={this.state.listname}
              onChange={this.updateListname}
              label="Choose where to add"
            >
              {this.state.lists.map(list => (
                <MenuItem value={list} key={list}>
                  {list.capitalize()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={this.classes.formControl}>
            <InputLabel id="importance-choosing-label">Important?</InputLabel>
            <Select
              labelId="importance-choosing-label"
              id="importance-chooser"
              value={this.state.importance}
              onChange={this.updateImportance}
              label="Choose where to add"
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </Select>
          </FormControl>
          <div className={this.classes.reminders}>
            <div className={this.classes.reminderControl}>
              <Typography component="span">Reminders</Typography>
              <div className={this.classes.grow} />
              <Switch
                checked={this.state.setReminder}
                onChange={this.updateReminder}
              />
            </div>
            <Collapse in={this.state.setReminder}>
              <Typography>Test content</Typography>
            </Collapse>
          </div>
        </form>
        <Fab
          className={this.classes.fabRight}
          variant="extended"
          color="primary"
        >
          <AddOutlined className={this.classes.fabIcon} />
          Add
        </Fab>
        <Fab
          className={this.classes.fabLeft}
          variant="extended"
          color="secondary"
        >
          <CloseOutlined className={this.classes.fabIcon} />
          Cancel
        </Fab>
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
  formControl: {
    margin: theme.spacing(1),
    width: "45%",
  },
  grow: {
    flexGrow: 1,
  },
  fabRight: {
    position: "fixed",
    bottom: 25,
    right: 25,
  },
  fabLeft: () => {
    let preset = {
      position: "fixed",
      bottom: 25,
      left: 25,
    }

    if (window.innerWidth > theme.breakpoints.values.sm) {
      preset.left = 265
    }

    return preset
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
  input: {
    margin: 8,
    width: "45%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  reminders: {
    margin: theme.spacing(1),
    borderRadius: 4,
    border: "1px solid rgba(150, 150, 150, 0.4)",
    "& .MuiTypography-root": {
      padding: 8,
    },
    "& .MuiSwitch-root": {
      float: "right",
    },
  },
  reminderControl: {
    width: "100%",
    display: "flex"
  }
}))(CreateNew)
