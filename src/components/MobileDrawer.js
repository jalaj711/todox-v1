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
  MenuOutlined as MenuIcon,
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

import theme from "../theme"

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    "& a": {
      color: theme.palette.text.primary,
    },
  },
  appBar: {
    background: "transparent",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
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

export default function MobileMenu() {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            todox
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
      <nav aria-label="Todox Menu">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.drawer}>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <NavLink onClick={handleDrawerToggle} to="/lists/today" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <DayIcon />
                  </ListItemIcon>
                  <ListItemText primary={"My Day"} />
                </ListItem>
              </NavLink>
              <NavLink onClick={handleDrawerToggle} to="/lists/starred" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Starred Tasks"} />
                </ListItem>
              </NavLink>
              <NavLink onClick={handleDrawerToggle} to="/lists/bills" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <BillsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Bills"} />
                </ListItem>
              </NavLink>
              <NavLink onClick={handleDrawerToggle} to="/lists/shopping" activeClassName={classes.active}>
                <ListItem button>
                  <ListItemIcon>
                    <ShoppingIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Shopping List"} />
                </ListItem>
              </NavLink>
              <NavLink onClick={handleDrawerToggle} to="/lists/work" activeClassName={classes.active}>
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
