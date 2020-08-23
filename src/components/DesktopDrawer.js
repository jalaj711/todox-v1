import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Toolbar,
  IconButton,
  Badge,
} from "@material-ui/core"

import {
  NotificationsNoneOutlined as BellIcon,
  StarBorderOutlined as StarIcon,
  CheckOutlined as CheckIcon,
  ClearOutlined as CrossIcon,
  QueryBuilderOutlined as PendingIcon,
  TodayOutlined as DayIcon,
  AttachMoneyOutlined as BillsIcon,
  ShoppingCartOutlined as ShoppingIcon,
  WorkOutline as WorkIcon,
  InfoOutlined as InfoIcon,
} from "@material-ui/icons"

import { NavLink } from "react-router-dom"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
	'& a': {
		color: theme.palette.text.primary,
	},
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: "transparent",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  grow: {
    flexGrow: 1,
  },
  active: {
    "& .MuiListItem-root": {
      background: `${theme.palette.primary.light}`,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
}))

export default function DesktopMenu() {
  const classes = useStyles()
  const [title, setTitle] = React.useState("todox")

  window.setTitle = setTitle;

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>

          <div className={classes.grow} />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Show Notifications"
          >
            <Badge badgeContent={6} color="secondary" max={9}>
              <BellIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <NavLink to="/todox/lists/today" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <DayIcon />
                  </ListItemIcon>
                  <ListItemText primary={"My Day"} />
                </ListItem>
              </NavLink>
              <NavLink to="/todox/lists/starred" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Starred Tasks"} />
                </ListItem>
              </NavLink>
              <NavLink to="/todox/lists/bills" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <BillsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Bills"} />
                </ListItem>
              </NavLink>
              <NavLink
                to="/todox/lists/shopping"
                activeClassName={classes.active}
              >
                <ListItem button>
                  <ListItemIcon>
                    <ShoppingIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Shopping List"} />
                </ListItem>
              </NavLink>
              <NavLink to="/todox/lists/work" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Work"} />
                </ListItem>
              </NavLink>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PendingIcon />
                </ListItemIcon>
                <ListItemText primary={"Pending"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary={"Done"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CrossIcon />
                </ListItemIcon>
                <ListItemText primary={"Missing"} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About us" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </nav>
    </div>
  )
}
