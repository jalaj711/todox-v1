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
  DeleteOutlineOutlined,
  MoreVertOutlined,
  AccessAlarmOutlined,
  EditOutlined,
  ViewDayOutlined,
} from "@material-ui/icons"

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
}))

function TodoItem(props) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Paper className={classes.paper}>
      <Checkbox color="secondary" aria-label="Mark as done" />
      <div className={classes.grow}>
        <Typography>This is a todo</Typography>
      </div>
      <IconButton aria-label="Star this task">
        <StarBorderOutlined />
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

  return (
    <div className={classes.root}>
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  )
}
