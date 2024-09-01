import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTimer, resetTimer } from '../redux/actions';

const Component3 = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const handleStartStop = () => {
    dispatch(toggleTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="timer-controls">
      <button id="start_stop" type="button" onClick={handleStartStop}>Start/Stop</button>
      <button id="reset" type="button" onClick={handleReset}>Reset</button>
      <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav">
        <track kind="captions" src="path/to/captions.vtt" srcLang="en" label="English" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Component3;
