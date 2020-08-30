import React from "react"
import { withStyles } from "@material-ui/core/styles"
import {
  AccordionActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  //  IconButton,
  Divider,
  Button,
} from "@material-ui/core"
//import { Link } from "react-router-dom"
import {
  //  StarBorderOutlined,
  //  Star,
  ExpandMoreOutlined,
} from "@material-ui/icons"
import clsx from "clsx"

class TodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starred: props.task.starred,
      done: props.task.done,
      isOpen: false,
    }
    this.toggleStar = this.toggleStar.bind(this)
    this.toggleState = this.toggleState.bind(this)
  }

  toggleStar() {
    this.setState({
      ...this.state,
      starred: !this.state.starred,
    })
  }

  parseDate(date) {
    let dte = new Date(date)
    let prefix = n => (n < 10 ? "0" + n : n)
    let month
    switch (dte.getMonth()) {
      case 0:
        month = "Jan"
        break
      case 1:
        month = "Feb"
        break
      case 2:
        month = "Mar"
        break
      case 3:
        month = "Apr"
        break
      case 4:
        month = "May"
        break
      case 5:
        month = "Jun"
        break
      case 6:
        month = "Jul"
        break
      case 7:
        month = "Aug"
        break
      case 8:
        month = "Sep"
        break
      case 9:
        month = "Oct"
        break
      case 10:
        month = "Nov"
        break
      case 11:
        month = "Dec"
        break
      default:
        break
    }
    return `${prefix(dte.getDate())} ${month} ${prefix(
      dte.getHours()
    )}:${prefix(dte.getMinutes())}`
  }

  toggleState() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Accordion expanded={this.state.isOpen}>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            onClick={this.toggleState}
          >
            <Typography className={this.props.classes.heading}>
              {this.props.task.title}
            </Typography>
            <div className={this.props.classes.grow} />
            <div className={this.props.classes.reminderTiming}>
              <Typography className={this.props.classes.secondaryHeading}>
                {this.props.task.reminder
                  ? this.parseDate(this.props.task.deadline)
                  : ""}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={this.props.classes.details}>
            <div className={this.props.classes.fullWidth}>
              <Typography variant="button">Description</Typography>
              {this.props.task.description || <i>No description provided</i>}
            </div>
            <div className={this.props.classes.othDetails}>
              <div className={this.props.classes.column}>
                {new Date(this.props.task.reminder).toString()}
              </div>
              <div
                className={clsx(
                  this.props.classes.column,
                  this.props.classes.helper
                )}
              >
                <Typography variant="caption">
                  Select your destination of choice
                  <br />
                </Typography>
              </div>
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button size="small">Delete</Button>
            <Button size="small" color="primary">
              Edit
            </Button>
            <Button size="small" color="primary">
              Mark as done
            </Button>
          </AccordionActions>
        </Accordion>
      </div>
    )
  }
}

export default withStyles(theme => ({
  root: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
    display: "block",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  reminderTiming: {
    flexBasis: "33.33%",
    minWidth: "fit-content",
  },
  fullWidth: {
    width: "100%",
  },
  othDetails: {
    display: "flex",
  },
}))(TodoItem)
