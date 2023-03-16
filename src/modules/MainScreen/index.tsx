import { useState } from "react";

import GameContainer from "../GameContainer";
import React from "react";
import Instructions from "./components/Instructions";

export const MainScreen = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-gray-800 text-gray-100 p-10">
      {!gameStarted ? (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Memory Maze</h1>
          <p className="text-xl text-center w-full max-w-5xl">
            Welcome to Memory Maze! The objective of the game is to navigate
            through a randomly generated maze and reach the finish point. You
            will be scored based on the time it takes to complete the maze and
            the number of moves.
          </p>
          <div className="">
            <Instructions />
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={startGame}
          >
            I'm ready!
          </button>
        </div>
      ) : (
        <GameContainer />
      )}
    </div>
  );
};
