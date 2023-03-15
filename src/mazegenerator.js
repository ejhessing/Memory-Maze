function createEmptyMaze(width, height) {
  return new Array(height).fill(null).map(() => new Array(width).fill(0));
}

function isOutOfBounds(x, y, width, height) {
  return x < 0 || y < 0 || x >= width || y >= height;
}

function generateMaze(width = 21, height = 21) {
  const maze = createEmptyMaze(width, height);
  const stack = [];

  // Mark all cells as walls
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      maze[y][x] = 1;
    }
  }

  // Random starting point
  const startX = Math.floor(Math.random() * Math.floor(width / 2)) * 2 + 1;
  const startY = Math.floor(Math.random() * Math.floor(height / 2)) * 2 + 1;

  // Set starting point as a passage
  maze[startY][startX] = 0;

  // Helper function to get neighbors
  function getNeighbors(x, y) {
    const directions = [
      { dx: 0, dy: -2 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 },
      { dx: 2, dy: 0 },
    ];

    const neighbors = [];

    directions.forEach(({ dx, dy }) => {
      const nx = x + dx;
      const ny = y + dy;

      if (!isOutOfBounds(nx, ny, width, height) && maze[ny][nx] === 1) {
        neighbors.push({ x: nx, y: ny, dx, dy });
      }
    });

    return neighbors;
  }

  // Recursive function for maze generation
  function carve(x, y) {
    const neighbors = getNeighbors(x, y);

    while (neighbors.length > 0) {
      const idx = Math.floor(Math.random() * neighbors.length);
      const { x: nx, y: ny, dx, dy } = neighbors[idx];

      if (maze[ny][nx] === 1) {
        maze[ny - dy / 2][nx - dx / 2] = 0;
        maze[ny][nx] = 0;
        stack.push({ x: nx, y: ny });
        carve(nx, ny);
      }

      neighbors.splice(idx, 1);
    }
  }

  carve(startX, startY);

  // Set start and end points
  maze[1][1] = 0;
  maze[height - 2][width - 2] = 0;

  return maze;
}

export default generateMaze;
