import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ points, onPlayAgain }) => {
  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <h2 className="success-title">Success!</h2>
        <p className="success-message">Yayy! You robbed the bank!</p>
        <p className="success-points">Points: {points}</p>
        <button 
          className="play-again-button"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;