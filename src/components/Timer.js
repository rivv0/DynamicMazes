import React from 'react';

const Timer = ({ countdown, percentage, color }) => {
  return (
    <div className="timer-container">
      <div className="timer-box">
        <div className="timer-text">Lock resets in</div>
        <div className={`circular-timer timer-${color}`}>
          <div className="timer-number">{countdown}</div>
          <svg className="timer-circle" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              className="timer-progress"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Timer;