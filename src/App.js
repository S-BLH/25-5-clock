import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTimer,
  toggleSession,
  setBreakLength,
  setSessionLength,
  resetTimer,
  toggleTimer,
} from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const {
    timer, isRunning, isSession, breakLength, sessionLength,
  } = useSelector((state) => state);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch(setTimer(timer - 1));
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timer, dispatch]);

  useEffect(() => {
    if (timer < 0) {
      audioRef.current.play().catch((e) => console.error('Audio play failed:', e));
      dispatch(toggleSession());
      dispatch(setTimer(isSession ? breakLength * 60 : sessionLength * 60));
    }
  }, [timer, isSession, breakLength, sessionLength, dispatch]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    dispatch(resetTimer());
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1 && !isRunning) {
      dispatch(setBreakLength(breakLength - 1));
    }
  };

  const handleBreakIncrease = () => {
    if (breakLength < 60 && !isRunning) {
      dispatch(setBreakLength(breakLength + 1));
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1 && !isRunning) {
      dispatch(setSessionLength(sessionLength - 1));
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60 && !isRunning) {
      dispatch(setSessionLength(sessionLength + 1));
    }
  };

  return (
    <div className="app">
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <div>
          <div id="break-label">Break Length</div>
          <button id="break-decrement" type="button" onClick={handleBreakDecrease}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" type="button" onClick={handleBreakIncrease}>+</button>
        </div>
        <div>
          <div id="session-label">Session Length</div>
          <button id="session-decrement" type="button" onClick={handleSessionDecrease}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" type="button" onClick={handleSessionIncrease}>+</button>
        </div>
      </div>
      <div className="timer-display">
        <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
        <div id="time-left">{formatTime(timer)}</div>
      </div>
      <button id="start_stop" type="button" onClick={() => dispatch(toggleTimer())}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button id="reset" type="button" onClick={handleReset}>Reset</button>
      <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav">
        <track kind="none" />
      </audio>
    </div>
  );
}

export default App;
