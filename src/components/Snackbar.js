import React from "react"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import { useDispatch, useSelector } from "react-redux"
import { closeSnackbar } from "../redux/snackbarSlice"

export default function CustomSnackbar() {
  const dispatch = useDispatch()
  const open = useSelector((state) => state.snackbar.open)
  const text = useSelector((state) => state.snackbar.text)
  const showActionButton = useSelector((state) => state.snackbar.showActionButton)
  const actionButtonText = useSelector((state) => state.snackbar.actionButtonText)
  const actionButtonClickCallback = useSelector((state) => state.snackbar.actionButtonClickCallback)

  const handleClose = (_evt, reason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(closeSnackbar())
  }

  let click = evt => {
    handleClose()
    try {
      actionButtonClickCallback(evt)
    } catch (e) {}
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={text}
        action={
          <React.Fragment>
            {showActionButton ? (
              <Button color="secondary" size="small" onClick={click}>
                {actionButtonText}
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
