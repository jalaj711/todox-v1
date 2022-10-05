export const toggleSnackbarOpen = (snackbarProps) => ({
  type: "TOGGLE_SNACKBAR_OPEN",
  ...snackbarProps,
})

export const toggleSnackbarClose = () => ({
  type: "TOGGLE_SNACKBAR_CLOSE",
})
