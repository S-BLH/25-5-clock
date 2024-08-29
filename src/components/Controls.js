import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBreakLength, setSessionLength } from '../redux/actions';

const Component2 = () => {
  const dispatch = useDispatch();
  const { breakLength, sessionLength, isRunning } = useSelector(state => state);

  const handleLengthChange = (type, change) => {
    if (isRunning) return;
    const currentLength = type === 'break' ? breakLength : sessionLength;
    const newLength = Math.max(1, Math.min(60, currentLength + change));
    if (type === 'break') {
      dispatch(setBreakLength(newLength));
    } else {
      dispatch(setSessionLength(newLength));
    }
  };

  return (
    <div className="length-controls">
      <div>
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={() => handleLengthChange('break', -1)}>-</button>
        <div id="break-length">{breakLength}</div>
        <button id="break-increment" onClick={() => handleLengthChange('break', 1)}>+</button>
      </div>
      <div>
        <div id="session-label">Session Length</div>
        <button id="session-decrement" onClick={() => handleLengthChange('session', -1)}>-</button>
        <div id="session-length">{sessionLength}</div>
        <button id="session-increment" onClick={() => handleLengthChange('session', 1)}>+</button>
      </div>
    </div>
  );
};

export default Component2;