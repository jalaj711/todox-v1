import { createSlice } from '@reduxjs/toolkit'

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    text: "Snackbar text",
    showActionButton: false,
    actionButtonText: "undo",
    actionButtonClickCallback: null,
  },
  reducers: {
    openSnackbar: (state) => {
      state = {
        open: true,
        text: action.message,
        showActionButton: action.showActionButton,
        actionButtonText: action.actionButtonText,
        actionButtonClickCallback: action.actionButtonClickCallback,
      }
    },
    closeSnackbar: (state) => {
      state.open = false
    },
  },
})

export const { open, close } = snackbarSlice.actions

export default snackbarSlice.reducer