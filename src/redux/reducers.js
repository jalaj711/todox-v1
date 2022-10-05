const initialState = {
  open: false,
  text: "Snackbar text",
  showActionButton: false,
  actionButtonText: "undo",
  actionButtonClickCallback: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_SNACKBAR_OPEN": {
      return {
        ...state,
        open: true,
        text: action.message,
        showActionButton: action.showActionButton,
        actionButtonText: action.actionButtonText,
        actionButtonClickCallback: action.actionButtonClickCallback,
      }
    }

    case "TOGGLE_SNACKBAR_CLOSE": {
      return {
        ...state,
        open: false,
      }
    }

    default: {
      return state;
    }
  }
}