import { SET_BREAK_LENGTH, SET_SESSION_LENGTH, SET_TIMER, RESET_TIMER, TOGGLE_TIMER, TOGGLE_SESSION } from './actions';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timer: 25 * 60, // Timer starts with the session length
  isSession: true,
  isRunning: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREAK_LENGTH:
      return { ...state, breakLength: action.payload };
    case SET_SESSION_LENGTH:
      // When session length is updated, reset the timer if currently in session
      return {
        ...state,
        sessionLength: action.payload,
        timer: state.isSession ? action.payload * 60 : state.timer
      };
    case SET_TIMER:
      return { ...state, timer: action.payload };
    case RESET_TIMER:
      return {
        ...initialState,
        timer: initialState.sessionLength * 60, // Reset timer to initial session length
      };
    case TOGGLE_TIMER:
      return { ...state, isRunning: !state.isRunning };
    case TOGGLE_SESSION:
      return {
        ...state,
        isSession: !state.isSession,
        timer: state.isSession ? state.breakLength * 60 : state.sessionLength * 60
      };
    default:
      return state;
  }
};

export default reducer;
