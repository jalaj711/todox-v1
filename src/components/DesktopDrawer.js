import React from "react"
import { withStyles } from "@material-ui/core/styles"
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
  Button
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
  AddOutlined as PlusIcon
} from "@material-ui/icons"

import { NavLink } from "react-router-dom"

const drawerWidth = 240

class Item extends React.Component {
  render() {
    return (
      <NavLink to={this.props.link} activeClassName={this.props.classes.root}>
        <ListItem button>
          <ListItemIcon>
            <this.props.Icon />
          </ListItemIcon>
          <ListItemText primary={this.props.text} />
        </ListItem>
      </NavLink>
    )
  }
}
let DrawerItem = withStyles(theme => ({
  active: {
    "& .MuiListItem-root": {
      background: `${theme.palette.primary.light}`,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
}))(Item)

class DesktopMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "todox",
    }
    window.setTitle = title => {
      this.setState({ title })
    }
  }

  render() {
    return (
      <div>
        <AppBar position="fixed" className={this.props.classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {this.state.title}
            </Typography>

            <div className={this.props.classes.grow} />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="Show Notifications"
            >
              <Badge badgeContent={6} color="primary" max={9}>
                <BellIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={this.props.classes.drawer}>
          <Drawer
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div>
              <div className={this.props.classes.toolbar} />
              <Divider />
              <List>
                <DrawerItem
                  link="/todox/lists/today"
                  text="My Day"
                  Icon={DayIcon}
                />
                <DrawerItem
                  link="/todox/lists/starred"
                  text="Starred Tasks"
                  Icon={StarIcon}
                />
                <DrawerItem
                  link="/todox/lists/bills"
                  text="Bills"
                  Icon={BillsIcon}
                />
                <DrawerItem
                  link="/todox/lists/shopping"
                  text="Shopping List"
                  Icon={ShoppingIcon}
                />
                <DrawerItem
                  link="/todox/lists/work"
                  text="Work"
                  Icon={WorkIcon}
                />
              </List>
              <Divider />
              <List>
                <DrawerItem
                  link="/todox/viewby/pending"
                  text="Pending"
                  Icon={PendingIcon}
                />
                <DrawerItem
                  link="/todox/viewby/done"
                  text="Done"
                  Icon={CheckIcon}
                />
                <DrawerItem
                  link="/todox/viewby/missing"
                  text="Missing"
                  Icon={CrossIcon}
                />
              </List>
              <Divider />
              <List>
              <Button className={this.props.classes.button}>
                Your Lists
                <IconButton>
                  <PlusIcon />
                </IconButton>
              </Button>
              </List>
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
}

export default withStyles(theme => ({
  drawer: {
    "& a": {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
  button: {
    width: "-webkit-fill-available"
  }
}))(DesktopMenu)
