import React from 'react';
import './Maze.css';

const Maze = ({ maze, rows, cols, objectPosition }) => {
  return (
    <div 
      className="maze-wrapper"
      style={{ '--rows': rows, '--cols': cols }}
    >
      <div className="maze-outer-border">
        <div 
          className="maze-container" 
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {maze.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isStart = rowIndex === 0 && colIndex === 0;
              const isEnd = rowIndex === rows - 1 && colIndex === cols - 1;
              const isObject = objectPosition.row === rowIndex && objectPosition.col === colIndex;
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    maze-cell
                    ${isStart ? 'start-cell' : ''}
                    ${isEnd ? 'end-cell' : ''}
                    ${isObject ? 'object-cell' : ''}
                  `.trim()}
                >
                  {/* North wall */}
                  <div className={`
                    wall-north 
                    ${!cell.up ? 'wall-hidden' : ''} 
                    ${rowIndex === 0 ? 'boundary-wall' : ''}
                  `.trim()}></div>
                  
                  {/* East wall */}
                  <div className={`
                    wall-east 
                    ${!cell.right ? 'wall-hidden' : ''} 
                    ${colIndex === cols - 1 ? 'boundary-wall' : ''}
                  `.trim()}></div>
                  
                  {/* West wall */}
                  <div className={`
                    wall-west 
                    ${!cell.left ? 'wall-hidden' : ''} 
                    ${colIndex === 0 ? 'boundary-wall' : ''}
                  `.trim()}></div>
                  
                  {/* South wall */}
                  <div className={`
                    wall-south 
                    ${!cell.down ? 'wall-hidden' : ''} 
                    ${rowIndex === rows - 1 ? 'boundary-wall' : ''}
                  `.trim()}></div>
                  
                  {/* Moving object */}
                  {isObject && <div className="object"></div>}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Maze;