import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Checkbox, Typography, IconButton, Menu, ListItemIcon, ListItemText, MenuItem } from "@material-ui/core"
//import { Link } from "react-router-dom"
import {
  StarBorderOutlined,
  DeleteOutlineOutlined,
  MoreHorizOutlined,
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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Paper className={classes.paper}>
      <Checkbox color="secondary" />
      <div className={classes.grow}>
        <Typography>This is a todo</Typography>
      </div>
      <IconButton>
        <StarBorderOutlined />
      </IconButton>
      <IconButton aria-haspopup="true" onClick={handleClick}>
        <MoreHorizOutlined />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteOutlineOutlined />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteOutlineOutlined />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
