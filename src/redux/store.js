import { createStore } from "redux"
import reducer from "./reducers"

const config = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, config)
  return store
}
