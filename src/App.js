import React, { useState, useEffect, useCallback } from 'react';
import MazeGame from './components/MazeGame';
import IntroVideo from './components/IntroVideo';
import './App.css';

const INTERVAL = 15000; // 15 seconds
const TIMER_INTERVAL = 1000; // 1 second
const VIDEO_DURATION = 6000; // 6 seconds

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, VIDEO_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div className="App">
      <div className="game-container"></div>
      {showIntro ? (
        <IntroVideo onVideoEnd={handleVideoEnd} />
      ) : (
        <MazeGame 
          interval={INTERVAL}
          timerInterval={TIMER_INTERVAL}
        />
      )}
    </div>
  );
}

export default App;