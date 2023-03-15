import React from "react";
import { Rect } from "react-konva";

const Maze = ({ maze, cellSize }) => {
  const exitX = maze[0].length - 2;
  const exitY = maze.length - 2;

  return (
    <>
      {maze.map((row, y) =>
        row.map((cell, x) => (
          <Rect
            key={`${x}-${y}`}
            x={x * cellSize}
            y={y * cellSize}
            width={cellSize}
            height={cellSize}
            fill={
              cell === 1
                ? "black"
                : x === exitX && y === exitY
                ? "green"
                : "white"
            }
          />
        ))
      )}
    </>
  );
};

export default Maze;
