import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimer } from './redux/actions';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import Component3 from './components/Component3';

function App() {
  const dispatch = useDispatch();
  const { timer, isRunning, isSession, breakLength, sessionLength } = useSelector(state => state);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        dispatch(setTimer(timer - 1));
      }, 1000);
    } else if (timer === 0) {
      document.getElementById('beep').play();
      dispatch(setTimer(isSession ? breakLength * 60 : sessionLength * 60));
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, isSession, breakLength, sessionLength, dispatch]);

  return (
    <div className="app">
      <h1>25 + 5 Clock</h1>
      <Component2 />
      <Component1 />
      <Component3 />
    </div>
  );
}

export default App;