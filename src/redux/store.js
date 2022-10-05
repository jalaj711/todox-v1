import { configureStore } from "@reduxjs/toolkit"
import snackbarReducer from "./snackbarSlice"

export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
  },
})
