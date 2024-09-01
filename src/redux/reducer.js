import {
  SET_BREAK_LENGTH, SET_SESSION_LENGTH, SET_TIMER, RESET_TIMER, TOGGLE_TIMER, TOGGLE_SESSION }
  from './actions';

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
      return { 
        ...state, 
        breakLength: action.payload,
        timer: !state.isSession && !state.isRunning ? action.payload * 60 : state.timer
      };
    case SET_SESSION_LENGTH:
      return {
        ...state,
        sessionLength: action.payload,
        timer: state.isSession && !state.isRunning ? action.payload * 60 : state.timer
      };
    case SET_TIMER:
      return { ...state, timer: action.payload };
    case RESET_TIMER:
      return initialState;
    case TOGGLE_TIMER:
      return { ...state, isRunning: !state.isRunning };
    case TOGGLE_SESSION:
      return {
        ...state,
        isSession: !state.isSession,
      };
    default:
      return state;
  }
};

export default reducer;
