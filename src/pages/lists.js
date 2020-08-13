import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Grid, Checkbox, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { StarBorderOutlined, DeleteOutlineOutlined, MoreHorizOutlined } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
      width: '-webkit-fill-available',
      display: 'flex',
      alignItems: 'center',
      paddingRight: 8
  }
}))

export default function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Checkbox color="primary" />
        <div className={classes.grow}>
          <Typography>This is a todo</Typography>
        </div>
        <DeleteOutlineOutlined />
        <StarBorderOutlined />
        <MoreHorizOutlined />
      </Paper>
    </div>
  )
}
