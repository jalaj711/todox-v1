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
  DeleteOutlined,
  CheckOutlined,
  EditOutlined,
  ExpandMoreOutlined,
} from "@material-ui/icons"

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

  parseNotifDelta(date) {
    let delta = date * 10
    if (delta < 60) {
      return `${delta} min before`
    } else if (delta / 60 < 24) {
      return `${Math.round(delta / 60)} hr(s) before`
    } else {
      return `${Math.round(delta / (60 * 24))} day(s) before`
    }
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
              <Typography variant="button" className={this.props.classes.secHeading3}>Description</Typography>
              <br />
              <div className={this.props.classes.description}>
                {this.props.task.description || <i>No description provided</i>}
              </div>
            </div>
            <div className={this.props.classes.othDetails}>
              <div className={this.props.classes.column}>
                <Typography variant="button" className={this.props.classes.secHeading3}>Due At</Typography>
                <br />
                <div className={this.props.classes.description}>
                  {this.parseDate(this.props.task.deadline)}
                </div>
              </div>
              <div className={this.props.classes.column}>
                <Typography variant="button" className={this.props.classes.secHeading3}>Reminder</Typography>
                <br />
                <div className={this.props.classes.description}>
                  {this.parseNotifDelta(this.props.task.notifTimeDelta)}
                </div>
              </div>
              
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button
              startIcon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
            <Button startIcon={<EditOutlined />} size="small" color="secondary">
              Edit
            </Button>
            <Button startIcon={<CheckOutlined />} size="small" color="primary">
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
    minWidth: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  secHeading3: {
    fontSize: theme.typography.pxToRem(12),
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
  reminderTiming: {
    minWidth: "fit-content",
  },
  fullWidth: {
    width: "100%",
  },
  othDetails: {
    display: "flex",
  },
  description: {
    marginLeft: theme.spacing(1),
  },
}))(TodoItem)
