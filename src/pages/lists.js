import React from "react"
import { makeStyles } from "@material-ui/core/styles"
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

import database from  "../database";

const useStyles = makeStyles(theme => ({
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
  starred: {
    fill: "#f7c331",
    stroke: "#f7c331",
  },
}))

function TodoItem(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [starred, setStarred] = React.useState(props.task.starred)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleStar = () => {
    setStarred(!starred);
  }

  return (
    <Paper className={classes.paper}>
      <Checkbox color="primary" aria-label="Mark as done" checked={props.tasks.done}/>
      <div className={classes.grow}>
        <Typography>{props.task.text}</Typography>
      </div>
      <IconButton aria-label="Star this task" onClick={toggleStar}>
        {starred ? (
          <Star className={classes.starred} />
        ) : (
          <StarBorderOutlined />
        )}
      </IconButton>
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="Show more options"
      >
        <MoreVertOutlined />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} aria-label="View Details">
          <ListItemIcon>
            <ViewDayOutlined />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </MenuItem>
        <MenuItem onClick={handleClose} aria-label="Edit">
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleClose} aria-label="Reminders">
          <ListItemIcon>
            <AccessAlarmOutlined />
          </ListItemIcon>
          <ListItemText primary="Add/Remove a reminder" />
        </MenuItem>
        <MenuItem onClick={handleClose} aria-label="Delete this task">
          <ListItemIcon>
            <DeleteOutlineOutlined />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </Paper>
  )
}

export default function Home() {
  const classes = useStyles()
  let listname = window.location.hash.split('/');
  listname = listname[listname.length - 1];

  let db = new database();
  let tasks = db.getMultipleByKey('tasks', 'parent', listname);

  return (
    <div className={classes.root}>
      {
        tasks === [] ?
          <Typography>
            You do not have any tasks in this lists yet
          </Typography>
          :
          tasks.forEach((task) => <TodoItem task={task} />)
      }
    </div>
  )
}
