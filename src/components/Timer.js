import React from 'react';
import { useSelector } from 'react-redux';

const Component1 = () => {
  const { timer, isSession } = useSelector((state => state));

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timer-display">
      <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
      <div id="time-left">{formatTime(timer)}</div>
    </div>
  );
};

export default Component1;
