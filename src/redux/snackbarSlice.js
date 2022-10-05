import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  text: "Snackbar text",
  showActionButton: false,
  actionButtonText: "undo",
  actionButtonClickCallback: null,
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.open = true
      state.text = action.payload.text || initialState.text
      state.showActionButton = action.payload.showActionButton || initialState.showActionButton
      state.actionButtonText = action.payload.actionButtonText || initialState.actionButtonText
      state.actionButtonClickCallback = action.payload.actionButtonClickCallback || initialState.actionButtonClickCallback
    },
    closeSnackbar: (state) => {
      state.open = false
    },
  },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer