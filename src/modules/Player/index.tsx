import React from "react";
import { Circle } from "react-konva";

interface PlayerProps {
  x: number;
  y: number;
  cellSize: number;
}

const Player: React.FC<PlayerProps> = ({ x, y, cellSize }) => {
  return (
    <Circle
      x={(x + 0.5) * cellSize}
      y={(y + 0.5) * cellSize}
      radius={cellSize * 0.4}
      fill="blue"
    />
  );
};

export default Player;
