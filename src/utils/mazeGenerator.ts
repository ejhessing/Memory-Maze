interface Coordinates {
  x: number;
  y: number;
}

interface Neighbor extends Coordinates {
  dx: number;
  dy: number;
}

const createEmptyMaze = (width: number, height: number): number[][] => {
  return new Array(height).fill(null).map(() => new Array(width).fill(0));
};

export const isOutOfBounds = (
  x: number,
  y: number,
  width: number,
  height: number
): boolean => {
  return x < 0 || y < 0 || x >= width || y >= height;
};

const generateMaze = (width = 21, height = 21): number[][] => {
  const maze: number[][] = createEmptyMaze(width, height);
  const stack: Coordinates[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      maze[y][x] = 1;
    }
  }

  const startX = Math.floor(Math.random() * Math.floor(width / 2)) * 2 + 1;
  const startY = Math.floor(Math.random() * Math.floor(height / 2)) * 2 + 1;

  maze[startY][startX] = 0;

  const getNeighbors = (x: number, y: number): Neighbor[] => {
    const directions = [
      { dx: 0, dy: -2 },
      { dx: 0, dy: 2 },
      { dx: -2, dy: 0 },
      { dx: 2, dy: 0 },
    ];

    const neighbors: Neighbor[] = [];

    directions.forEach(({ dx, dy }) => {
      const nx = x + dx;
      const ny = y + dy;

      if (!isOutOfBounds(nx, ny, width, height) && maze[ny][nx] === 1) {
        neighbors.push({ x: nx, y: ny, dx, dy });
      }
    });

    return neighbors;
  };

  const carve = (x: number, y: number): void => {
    const neighbors: Neighbor[] = getNeighbors(x, y);

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
  };

  carve(startX, startY);

  maze[1][1] = 0;
  maze[height - 2][width - 2] = 0;

  return maze;
};

export default generateMaze;
