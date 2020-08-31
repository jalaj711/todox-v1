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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button,
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
      dialogOpen: false,
    }

    window.setTitle = title => {
      this.setState({ title })
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.getLists = this.getLists.bind(this)
    this.addList = this.addList.bind(this)
    this.createList = this.createList.bind(this)
  }

  componentDidMount() {
    if (!window.database) {
      import("../database").then(database => {
        console.log("[indexedDB] Creating database instance")
        let db = new database.default()
        db.onsuccess = _evt => {
          window.database = db
          this.getLists()
        }
      })
    } else {
      this.getLists()
    }
  }

  getLists() {
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

  handleDialogOpen() {
    this.setState({
      ...this.state,
      dialogOpen: true,
    })
  }

  addList(name) {
    import("../todo_template").then(todo_template => {
      let list = new todo_template.default.TodoList(
        name,
        () => {
          window.database.add("lists", list).onsuccess = evt => {
            console.log("done")
            this.handleDialogClose()
            this.getLists()
          }
        },
        {
          onerror: msg => {
            console.log("error", msg)
            this.setState({
              ...this.state,
              addError:
                "This name is already being used. Please try sometthing else!",
            })
          },
        }
      )
    })
  }
  createList() {
    let name = document.getElementById("add-list-to-db").value
    if (name) {
      if (!window.database) {
        import("../database").then(database => {
          console.log("[indexedDB] Creating database instance")
          let db = new database.default()
          db.onsuccess = _evt => {
            window.database = db
            this.addList(name)
          }
        })
      } else {
        this.addList(name)
      }
    } else {
      this.setState({
        ...this.state,
        addError: "Please enter a name",
      })
    }
  }

  handleDialogClose() {
    this.setState({
      ...this.setState({
        ...this.state,
        dialogOpen: false,
        addError: undefined
      }),
    })
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
                  <IconButton onClick={this.handleDialogOpen}>
                    <PlusIcon />
                  </IconButton>
                </div>
                {this.state.listsLoaded ? (
                  this.state.lists.length !== 0 ? (
                    this.state.lists.map(list => (
                      <DrawerItem
                      className={this.props.classes.a}
                        handleDrawer={this.handleDrawerToggle}
                        text={list.name}
                        link={`/todox/lists/${list.id}`}
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
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new task-list enter your list title here
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="add-list-to-db"
              label="List tittle"
              type="text"
              autoComplete="off"
              fullWidth
              error={Boolean(this.state.addError)}
              helperText={this.state.addError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createList} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
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
