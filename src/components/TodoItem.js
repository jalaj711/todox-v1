import React from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  Paper,
  Checkbox,
  Typography,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@material-ui/core"
//import { Link } from "react-router-dom"
import {
  StarBorderOutlined,
  Star,
  DeleteOutlineOutlined,
  MoreVertOutlined,
  AccessAlarmOutlined,
  EditOutlined,
  ViewDayOutlined,
} from "@material-ui/icons"



class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      starred: props.task.starred,
      done: props.task.done,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.toggleStar = this.toggleStar.bind(this)
  }

  handleClick(event) {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
    })
  }

  handleClose() {
    this.setState({
      ...this.state,
      anchorEl: null,
    })
  }

  toggleStar() {
    this.setState({
      ...this.state,
      starred: !this.state.starred,
    })
  }

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Checkbox
          color="primary"
          aria-label="Mark as done"
          checked={this.props.task.done}
        />
        <div className={this.props.classes.grow}>
          <Typography>{this.props.task.title}</Typography>
        </div>
        <IconButton aria-label="Star this task" onClick={this.toggleStar}>
          {this.state.starred ? (
            <Star className={this.props.classes.starred} />
          ) : (
            <StarBorderOutlined />
          )}
        </IconButton>
        <IconButton
          aria-haspopup="true"
          onClick={this.handleClick}
          aria-label="Show more options"
        >
          <MoreVertOutlined />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} aria-label="View Details">
            <ListItemIcon>
              <ViewDayOutlined />
            </ListItemIcon>
            <ListItemText primary="Details" />
          </MenuItem>
          <MenuItem onClick={this.handleClose} aria-label="Edit">
            <ListItemIcon>
              <EditOutlined />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem onClick={this.handleClose} aria-label="Reminders">
            <ListItemIcon>
              <AccessAlarmOutlined />
            </ListItemIcon>
            <ListItemText primary="Add/Remove a reminder" />
          </MenuItem>
          <MenuItem onClick={this.handleClose} aria-label="Delete this task">
            <ListItemIcon>
              <DeleteOutlineOutlined />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </Paper>
    )
  }
}

export default withStyles(theme => ({
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
  starred: {
    fill: "#f7c331",
    stroke: "#f7c331",
  },
}))(TodoItem)