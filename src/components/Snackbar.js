import React from "react"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

export default function CustomSnackbar() {
  // TODO: get the following from the Redux store:
  // const snackbarState = store.Snackbar
  // const {
  //   open,
  //   text,
  //   showActionButton,
  //   actionButtonText,
  //   actionButtonClickCallback
  // } = snackbarState

  const handleClose = (_evt, reason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(closeSnackbar)
  }

  // TODO: ROADKILL
  // const [state, setState] = React.useState({
  //   open: false,
  //   text: "Snackbar text",
  //   showActionButton: false,
  //   actionButtonText: "undo",
  //   actionButtonClickCallback: null,
  // })

  // window.snackbar = {
  //   show: ({
  //     text = "Snackbar text",
  //     actionButtonText = null,
  //     showActionButton = false,
  //     actionButtonClickCallback = null,
  //   }) => {
  //     setState({
  //       open: true,
  //       text,
  //       actionButtonClickCallback,
  //       actionButtonText,
  //       showActionButton,
  //     })
  //   },
  //   close: (event, reason) => {
  //     handleClose(event, reason)
  //   },
  // }

  let click = evt => {
    handleClose()
    try {
      state.actionButtonClickCallback(evt)
    } catch (e) {}
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={state.text}
        action={
          <React.Fragment>
            {state.showActionButton ? (
              <Button color="secondary" size="small" onClick={click}>
                {state.actionButtonText}
              </Button>
            ) : (
              ""
            )}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}
