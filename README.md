# React Maze Game

A React.js implementation of a procedurally generated maze game with cyberpunk styling.

## Features

- **Procedural Maze Generation**: Dynamic maze creation using a custom algorithm
- **Player Movement**: Navigate using arrow keys
- **Timer System**: Countdown timer that regenerates the maze every 15 seconds
- **Cyberpunk Styling**: Neon green theme with glowing effects
- **Intro Video**: Optional intro video on game start
- **Responsive Design**: Adapts to different screen sizes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd react-maze-game
```

2. Install dependencies:
```bash
npm install
```

3. Add your assets:
   - Place your intro video at `public/videos/intro.mp4`
   - Place your background image at `src/assets/amazedmid.png`

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Game Controls

- **Arrow Keys**: Move the player object through the maze
- **Objective**: Navigate from the green start cell to the orange end cell
- **Timer**: The maze regenerates every 15 seconds


## Project Structure

```
src/
├── components/
│   ├── IntroVideo.js      # Intro video component
│   ├── MazeGame.js        # Main game logic
│   ├── Maze.js            # Maze rendering component
│   ├── Maze.css           # Maze-specific styles
│   └── Timer.js           # Timer component
├── utils/
│   └── mazeGenerator.js   # Maze generation algorithm
├── App.js                 # Main app component
├── App.css               # App styles
├── index.js              # Entry point
└── index.css             # Global styles
```

## Customization

- **Maze Size**: Modify `rows` and `cols` in `MazeGame.js`
- **Timer Duration**: Change `INTERVAL` in `App.js`
- **Colors**: Update CSS variables in the style files
- **Algorithm**: Modify `mazeGenerator.js` for different maze patterns

## Technologies Used

- React 18
- CSS3 with animations
- HTML5 Canvas (for maze rendering)
- Modern JavaScript (ES6+)

## License

MIT License