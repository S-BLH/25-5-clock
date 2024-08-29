export const SET_BREAK_LENGTH = 'SET_BREAK_LENGTH';
export const SET_SESSION_LENGTH = 'SET_SESSION_LENGTH';
export const SET_TIMER = 'SET_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const TOGGLE_TIMER = 'TOGGLE_TIMER';

export const setBreakLength = (length) => ({ type: SET_BREAK_LENGTH, payload: length });
export const setSessionLength = (length) => ({ type: SET_SESSION_LENGTH, payload: length });
export const setTimer = (time) => ({ type: SET_TIMER, payload: time });
export const resetTimer = () => ({ type: RESET_TIMER });
export const toggleTimer = () => ({ type: TOGGLE_TIMER });