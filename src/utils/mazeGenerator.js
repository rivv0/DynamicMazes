// Maze generation algorithm based on the Elixir version
export const generateMaze = (rows, cols) => {
  // Initialize maze with all walls
  const maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      maze[i][j] = {
        up: true,
        right: true,
        left: true,
        down: true
      };
    }
  }

  // Initialize maze state
  let origin = { row: rows - 1, col: cols - 1 };
  const iterations = rows * cols * 10;
  
  // Create path matrix to track connections
  const pathMatrix = [];
  for (let i = 0; i < rows; i++) {
    pathMatrix[i] = [];
    for (let j = 0; j < cols; j++) {
      pathMatrix[i][j] = null;
    }
  }

  // Generate maze paths
  for (let iter = 0; iter < iterations; iter++) {
    const adjacents = getOriginAdjacents(origin, rows, cols);
    if (adjacents.length === 0) continue;
    
    const randomAdjacent = adjacents[Math.floor(Math.random() * adjacents.length)];
    const { row: newRow, col: newCol, direction } = randomAdjacent;
    
    // Set the path in the matrix
    pathMatrix[origin.row][origin.col] = direction;
    pathMatrix[newRow][newCol] = null;
    
    // Update origin
    origin = { row: newRow, col: newCol };
  }

  // Convert path matrix to wall configuration
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const direction = pathMatrix[i][j];
      if (direction) {
        removeWalls(maze, i, j, direction, rows, cols);
      }
    }
  }

  return maze;
};

const getOriginAdjacents = (origin, rows, cols) => {
  const { row, col } = origin;
  const adjacents = [];

  if (row > 0) adjacents.push({ row: row - 1, col, direction: 'up' });
  if (row < rows - 1) adjacents.push({ row: row + 1, col, direction: 'down' });
  if (col > 0) adjacents.push({ row, col: col - 1, direction: 'left' });
  if (col < cols - 1) adjacents.push({ row, col: col + 1, direction: 'right' });

  return adjacents;
};

const removeWalls = (maze, row, col, direction, rows, cols) => {
  switch (direction) {
    case 'up':
      maze[row][col].up = false;
      if (row > 0) maze[row - 1][col].down = false;
      break;
    case 'down':
      maze[row][col].down = false;
      if (row < rows - 1) maze[row + 1][col].up = false;
      break;
    case 'left':
      maze[row][col].left = false;
      if (col > 0) maze[row][col - 1].right = false;
      break;
    case 'right':
      maze[row][col].right = false;
      if (col < cols - 1) maze[row][col + 1].left = false;
      break;
    default:
      // No action needed for unknown directions
      break;
  }
};