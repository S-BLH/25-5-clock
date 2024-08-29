import { SET_BREAK_LENGTH, SET_SESSION_LENGTH, SET_TIMER, RESET_TIMER, TOGGLE_TIMER } from './actions';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timer: 25 * 60,
  isSession: true,
  isRunning: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREAK_LENGTH:
      return { ...state, breakLength: action.payload };
    case SET_SESSION_LENGTH:
      return { ...state, sessionLength: action.payload, timer: action.payload * 60 };
    case SET_TIMER:
      return { ...state, timer: action.payload };
    case RESET_TIMER:
      return { ...initialState };
    case TOGGLE_TIMER:
      return { ...state, isRunning: !state.isRunning };
    default:
      return state;
  }
};

export default reducer;