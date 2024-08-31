import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimer, toggleTimer, setBreakLength, setSessionLength, toggleSession, resetTimer } from './redux/actions';

function App() {
  const dispatch = useDispatch();
  const { timer, isRunning, isSession, breakLength, sessionLength } = useSelector(state => state);
  const [timerLabel, setTimerLabel] = useState('Session');
  const audioRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        dispatch(setTimer(timer - 1));
      }, 1000);
    } else if (timer === 0) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      if (isSession) {
        dispatch(toggleSession());
        dispatch(setTimer(breakLength * 60));
        setTimerLabel('Break');
      } else {
        dispatch(toggleSession());
        dispatch(setTimer(sessionLength * 60));
        setTimerLabel('Session');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, isSession, breakLength, sessionLength, dispatch]);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1 && !isRunning) {
      dispatch(setBreakLength(breakLength - 1));
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60 && !isRunning) {
      dispatch(setBreakLength(breakLength + 1));
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1 && !isRunning) {
      dispatch(setSessionLength(sessionLength - 1));
      if (isSession) {
        dispatch(setTimer((sessionLength - 1) * 60));
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60 && !isRunning) {
      dispatch(setSessionLength(sessionLength + 1));
      if (isSession) {
        dispatch(setTimer((sessionLength + 1) * 60));
      }
    }
  };

  const handleStartStop = () => {
    dispatch(toggleTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
    setTimerLabel('Session');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (isRunning) {
      dispatch(toggleTimer());
    }
  };

  return (
    <div className="app">
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <div>
          <div id="break-label">Break Length</div>
          <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={handleBreakIncrement}>+</button>
        </div>
        <div>
          <div id="session-label">Session Length</div>
          <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={handleSessionIncrement}>+</button>
        </div>
      </div>
      <div className="timer-display">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{formatTime(timer)}</div>
      </div>
      <button id="start_stop" onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button id="reset" onClick={handleReset}>Reset</button>
      <audio id="beep" ref={audioRef} src="path_to_your_audio_file.mp3" />
    </div>
  );
}

export default App;