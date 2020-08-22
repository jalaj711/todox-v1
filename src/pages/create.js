import React from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  Fab,
  TextField,
  Container,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core"
import { AddOutlined, CloseOutlined } from "@material-ui/icons"
//import { Link } from "react-router-dom"

class CreateNew extends React.Component {
  /**
   * This component is the actual 'list' where all the individual
   * components are rendered.
   *
   * @param {*} props
   */

  state = {
    lists: [],
  }
  constructor(props) {
    super(props)
    this.classes = this.props.classes
    this.listname = props.match.params.id
  }

  componentDidMount() {
    console.log("Updaing state")
    window.setTitle("Create New Task")
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

  render() {
    return (
      <Container>
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
            <InputLabel id="ist-choosing-label">Choose where to add</InputLabel>
            <Select
              labelId="list-choosing-label"
              id="list-chooser"
              value={this.listname}
              label="Choose where to add"
            >
              {this.state.lists.map(list => (
                <MenuItem value={list} key={list}>{list.capitalize()}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
      </Container>
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
    minWidth: 150,
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
  },
}))(CreateNew)
