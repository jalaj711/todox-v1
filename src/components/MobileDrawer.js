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
} from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
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
  AddOutlined as PlusIcon,
  MenuOutlined as MenuIcon,
} from "@material-ui/icons"

import { NavLink } from "react-router-dom"

const drawerWidth = 240

class Item extends React.Component {
  render() {
    return (
      <NavLink
        to={this.props.link}
        activeClassName={`${this.props.classes.active} ${this.props.classes.root}`}
        className={this.props.classes.root}
        onClick={this.props.handleDrawer}
      >
        <ListItem button>
          {this.props.Icon ? (
            <ListItemIcon>
              <this.props.Icon />
            </ListItemIcon>
          ) : (
            ""
          )}
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
  root: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
}))(Item)

class MobileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "todox",
      lists: [],
    }

    window.setTitle = title => {
      this.setState({ title })
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  componentDidMount() {
    let getLists = () => {
      window.database.getMultipleByFilters(
        "lists",
        "id",
        {
          filter: "__re",
          val: /^(?!.*bills|today|work|shopping).*$/,
        },
        lists => {
          this.setState({
            ...this.state,
            listsLoaded: true,
            lists: lists || [],
          })
        }
      )
    }
    if (!window.database) {
      import("../database").then(database => {
        console.log("[indexedDB] Creating database instance")
        let db = new database.default()
        db.onsuccess = _evt => {
          window.database = db
          getLists()
        }
      })
    } else {
      getLists()
    }
  }

  handleDrawerToggle() {
    this.setState({
      ...this.state,
      mobileOpen: !this.state.mobileOpen,
    })
  }

  render() {
    return (
      <div>
        <AppBar position="fixed" className={this.props.classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={this.props.classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
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
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div>
              <div className={this.props.classes.toolbar} />
              <Divider />
              <List>
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/lists/today"
                  text="My Day"
                  Icon={DayIcon}
                />
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/lists/starred"
                  text="Starred Tasks"
                  Icon={StarIcon}
                />
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/lists/bills"
                  text="Bills"
                  Icon={BillsIcon}
                />
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/lists/shopping"
                  text="Shopping List"
                  Icon={ShoppingIcon}
                />
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/lists/work"
                  text="Work"
                  Icon={WorkIcon}
                />
              </List>
              <Divider />
              <List>
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/viewby/pending"
                  text="Pending"
                  Icon={PendingIcon}
                />
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/viewby/done"
                  text="Done"
                  Icon={CheckIcon}
                />
                <DrawerItem
                className={this.props.classes.a}
                  handleDrawer={this.handleDrawerToggle}
                  link="/todox/viewby/missing"
                  text="Missing"
                  Icon={CrossIcon}
                />
              </List>
              <Divider />
              <List>
                <div className={this.props.classes.button}>
                  <Typography variant="button">Your Lists</Typography>
                  <div className={this.props.classes.grow} />
                  <IconButton>
                    <PlusIcon />
                  </IconButton>
                </div>
                {this.state.listsLoaded ? (
                  this.state.lists.length !== 0 ? (
                    this.state.lists.map(list => (
                      <DrawerItem
                      className={this.props.classes.a}
                        handleDrawer={this.handleDrawerToggle}
                        onClick={this.handleDrawerToggle}
                        text={list.title}
                        link={`/todox/lists/${list.title}`}
                        key={list.id}
                      />
                    ))
                  ) : (
                    <Typography
                      variant="body1"
                      component="i"
                      className={this.props.classes.notFound}
                    >
                      No lists found. Click on the + icon on top right to create
                      one
                    </Typography>
                  )
                ) : (
                  <div style={{ padding: 8 }}>
                    <Skeleton width={200} />
                    <Skeleton width={160} />
                  </div>
                )}
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
    display: "flex",
    padding: 0,
    fontSize: theme.typography.subtitle2.fontSize,
    width: "-webkit-fill-available",
    "& .MuiTypography-root, .MuiIconButton-root": {
      padding: theme.spacing(1),
    },
  },
  notFound: {
    fontSize: "smaller",
    padding: ` 0 ${theme.spacing(1)}px`,
    display: "flex",
  },
}))(MobileMenu)
