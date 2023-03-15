import React from "react";
import { Circle } from "react-konva";

const Player = ({ position, cellSize }) => {
  return (
    <Circle
      x={(position.x + 0.5) * cellSize}
      y={(position.y + 0.5) * cellSize}
      radius={cellSize * 0.4}
      fill="blue"
    />
  );
};

export default Player;
