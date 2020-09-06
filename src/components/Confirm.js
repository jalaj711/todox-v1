import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

export default class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Confirmation",
      content: "Are you sure?",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      open: false,
    }

    window.confirm = (options, confirmCallback, closeCallback) => {
      this.setState({
        ...this.state,
        ...options,
        open: true,
      })
      this.closeCallback = closeCallback
      this.confirmCallback = confirmCallback
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleClose() {
    if (this.closeCallback) this.closeCallback()
    this.setState({
      ...this.state,
      open: false,
    })
  }

  handleConfirm() {
    if (this.confirmCallback) this.confirmCallback()
    this.setState({
      ...this.state,
      open: false,
    })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.state.cancelButtonText}
            </Button>
            <Button onClick={this.handleConfirm} color="primary" autoFocus>
              {this.state.confirmButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
