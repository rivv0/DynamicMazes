import React, { useState, useEffect, useCallback } from 'react';
import Maze from './Maze';
import Timer from './Timer';
import SuccessModal from './SuccessModal';
import { generateMaze } from '../utils/mazeGenerator';

const MazeGame = ({ interval, timerInterval }) => {
  const [maze, setMaze] = useState(null);
  const [rows] = useState(10);
  const [cols] = useState(10);
  const [objectPosition, setObjectPosition] = useState({ row: 0, col: 0 });
  const [countdown, setCountdown] = useState(Math.floor(interval / 1000));
  const [timerPercentage, setTimerPercentage] = useState(100);
  const [timerColor, setTimerColor] = useState('white');
  const [showSuccess, setShowSuccess] = useState(false);
  const [points, setPoints] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Generate initial maze
  useEffect(() => {
    const newMaze = generateMaze(rows, cols);
    setMaze(newMaze);
  }, [rows, cols]);

  // Timer tick effect - only run if game not won
  useEffect(() => {
    if (gameWon) return; // Stop timer if game is won
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newCountdown = Math.max(0, prev - 1);
        
        // Calculate percentage and color
        const totalSeconds = Math.floor(interval / 1000);
        const percentage = (newCountdown / totalSeconds) * 100;
        setTimerPercentage(percentage);
        
        let color;
        if (newCountdown > 10) {
          color = 'green';
        } else if (newCountdown > 5) {
          color = 'orange';
        } else {
          color = 'red';
        }
        setTimerColor(color);
        
        return newCountdown;
      });
    }, timerInterval);

    return () => clearInterval(timer);
  }, [interval, timerInterval, gameWon]);

  // Maze regeneration effect - only run if game not won
  useEffect(() => {
    if (gameWon) return; // Stop regeneration if game is won
    
    const regenerateTimer = setInterval(() => {
      const newMaze = generateMaze(rows, cols);
      setMaze(newMaze);
      setObjectPosition({ row: 0, col: 0 });
      setCountdown(Math.floor(interval / 1000));
      setTimerPercentage(100);
      setTimerColor('white');
      setShowSuccess(false);
    }, interval);

    return () => clearInterval(regenerateTimer);
  }, [interval, rows, cols, gameWon]);

  // Handle keyboard input
  const handleKeyPress = useCallback((event) => {
    if (!maze || gameWon) return; // Don't allow movement if game is won

    const { row, col } = objectPosition;
    let newPosition = { row, col };

    const currentCell = maze[row] && maze[row][col];
    if (!currentCell) return;

    switch (event.key) {
      case 'ArrowUp':
        if (row > 0) {
          const upperCell = maze[row - 1][col];
          const canMoveUp = !currentCell.up && !upperCell.down;
          if (canMoveUp) {
            newPosition = { row: row - 1, col };
          }
        }
        break;
      case 'ArrowDown':
        if (row < rows - 1) {
          const lowerCell = maze[row + 1][col];
          const canMoveDown = !currentCell.down && !lowerCell.up;
          if (canMoveDown) {
            newPosition = { row: row + 1, col };
          }
        }
        break;
      case 'ArrowLeft':
        if (col > 0) {
          const leftCell = maze[row][col - 1];
          const canMoveLeft = !currentCell.left && !leftCell.right;
          if (canMoveLeft) {
            newPosition = { row, col: col - 1 };
          }
        }
        break;
      case 'ArrowRight':
        if (col < cols - 1) {
          const rightCell = maze[row][col + 1];
          const canMoveRight = !currentCell.right && !rightCell.left;
          if (canMoveRight) {
            newPosition = { row, col: col + 1 };
          }
        }
        break;
      default:
        return;
    }

    // Check if player reached the end
    const reachedEnd = newPosition.row === rows - 1 && newPosition.col === cols - 1;
    
    setObjectPosition(newPosition);
    
    if (reachedEnd) {
      setShowSuccess(true);
      setPoints(prev => prev + 1);
      setGameWon(true);
    }
  }, [maze, objectPosition, rows, cols, gameWon]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    const newMaze = generateMaze(rows, cols);
    setMaze(newMaze);
    setObjectPosition({ row: 0, col: 0 });
    setCountdown(Math.floor(interval / 1000));
    setTimerPercentage(100);
    setTimerColor('white');
    setShowSuccess(false);
    setGameWon(false);
  }, [rows, cols, interval]);

  if (!maze) {
    return <div>Loading maze...</div>;
  }

  return (
    <div className="page-container">
      {showSuccess && (
        <SuccessModal 
          points={points}
          onPlayAgain={handlePlayAgain}
        />
      )}
      <Timer 
        countdown={countdown}
        percentage={timerPercentage}
        color={timerColor}
      />
      <Maze 
        maze={maze}
        rows={rows}
        cols={cols}
        objectPosition={objectPosition}
      />
    </div>
  );
};

export default MazeGame;