import React from "react";

const Instructions: React.FC = () => {
  return (
    <div className="space-y-4 ">
      <h2 className="text-2xl font-bold">How to play</h2>
      <ul className="list-disc list-inside text-lg text-left">
        <li>
          Use the arrow keys or "W", "A", "S", "D" keys to move the player in
          the maze.
        </li>
        <li>
          The maze is initially visible for 2 seconds to help you memorize the
          path.
        </li>
        <li>
          As you progress through levels, the maze size will increase, making it
          more challenging.
        </li>
        <li>The game ends when you run out of time.</li>
        <li>
          You can use a hint to reveal the maze for 2 seconds by clicking the
          "Use a hint to reveal the maze" button or "H" for hint.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
