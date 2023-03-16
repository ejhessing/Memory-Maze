import React, { useState, useCallback, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import generateMaze, { isOutOfBounds } from "../../utils/mazeGenerator";
import Maze from "../Maze";
import Player from "../Player";
import Timer from "../Timer";
import { GameHeader } from "./components/GameHeader";
import { GameOverModal } from "./components/GameOverModal";
import { LevelSuccessModal } from "./components/LevelSuccessModal";

import "./modal.css";

const failAudio = new Audio("../assets/fail.wav");
const successAudio = new Audio("../assets/success.wav");

interface PlayerPosition {
  x: number;
  y: number;
}

const GameContainer: React.FC = () => {
  const cellSize = 30;
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({
    x: 1,
    y: 1,
  });
  const [mazeVisible, setMazeVisible] = useState(true);
  const [timeAllowed, setTimeAllowed] = useState(30);
  const [visibilityHelper, setVisibilityHelper] = useState(2);
  const [sizeOfMaze, setSizeOfMaze] = useState(4);
  const [winModalVisible, setWinModalVisible] = useState(false);
  const [loseModalVisible, setLoseModalVisible] = useState(false);
  const initialMaze = generateMaze(sizeOfMaze, sizeOfMaze);
  const [hints, setHints] = useState(3);

  const [score, setScore] = useState(0);
  const [steps, setSteps] = useState(0);

  const [maze, setMaze] = useState(initialMaze);
  const [time, setTime] = useState(timeAllowed);

  const [level, setLevel] = useState(1);

  const handleTimeUp = useCallback(() => {
    failAudio.play();
    setLoseModalVisible(true);
    setPlayerPosition({ x: 1, y: 1 });

    if (level > 1) {
      setLevel(level - 1);
    }
    setMaze(generateMaze(sizeOfMaze + level, sizeOfMaze + level));
    setTime(timeAllowed);
  }, [level]);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setMazeVisible(visible);
  }, []);

  useEffect(() => {
    handleVisibilityChange(true);
    setTimeout(() => {
      handleVisibilityChange(false);
    }, 2000);
  }, [level, handleVisibilityChange]);

  const movePlayer = useCallback(
    (dx: number, dy: number) => {
      const newX = playerPosition.x + dx;
      const newY = playerPosition.y + dy;

      if (
        !isOutOfBounds(newX, newY, maze[0].length, maze.length) &&
        maze[newY][newX] === 0
      ) {
        setPlayerPosition({ x: newX, y: newY });
        setSteps(steps + 1); // Increment steps

        // Check if the player reached the end point
        if (newX === maze[0].length - 2 && newY === maze.length - 2) {
          const maxSteps = ((maze.length - 1) * (maze[0].length - 1)) / 2;
          const stepScore = ((maxSteps - steps) / maxSteps) * 100;
          const timeScore = (time / timeAllowed) * 100;
          const finalScore = Math.round((stepScore + timeScore) / 2);
          setScore((prevScore) => prevScore + finalScore);
          successAudio.play();
          setWinModalVisible(true);
        }
      }
    },
    [maze, playerPosition, steps, time]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault();
          movePlayer(0, -1);
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
        case "a":
          e.preventDefault();
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
        case "d":
          e.preventDefault();
          movePlayer(1, 0);
          break;
        case "h":
          e.preventDefault();
          handleUseHint();
          break;
        case "Enter":
          if (winModalVisible) {
            handleWin();
          }
          break;
        default:
          break;
      }
    },
    [movePlayer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleWin = useCallback(() => {
    setWinModalVisible(false);
    setLevel(level + 1);
    setMaze(generateMaze(sizeOfMaze + level, sizeOfMaze + level));
    setTime(timeAllowed);
    setPlayerPosition({ x: 1, y: 1 });
  }, [level]);

  const handleLoss = useCallback(() => {
    setLoseModalVisible(false);
    setMazeVisible(true);
    // setHints(hints - 1);
    setTime(timeAllowed);
    setPlayerPosition({ x: 1, y: 1 });
  }, []);

  const scaleFactor = Math.min(
    window.innerWidth / (cellSize * (sizeOfMaze + level)),
    1
  );

  const handleUseHint = useCallback(() => {
    if (hints > 0) {
      setHints(hints - 1);
      setMazeVisible(true);
      setTimeout(() => {
        setMazeVisible(false);
      }, 2000);
    }
  }, [hints]);

  return (
    <div className="h-screen w-full">
      <GameHeader title="Memory Maze" score={score} time={time} level={level} />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div
          className="w-full h-full flex justify-center items-center flex-col"
          style={{ transform: `scale(${scaleFactor})` }}
        >
          <Stage
            width={maze[0].length * cellSize}
            height={maze.length * cellSize}
          >
            <Layer visible={mazeVisible}>
              <Maze maze={maze} cellSize={cellSize} />
            </Layer>
            <Layer>
              <Player
                x={playerPosition.x}
                y={playerPosition.y}
                cellSize={cellSize}
              />
            </Layer>
          </Stage>
          <button
            onClick={handleUseHint}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Use a hint to reveal the maze
          </button>
          <span>
            <span className="w-24 inline-block text-2xl">Hints:</span>
            {hints}
          </span>
        </div>

        <Timer
          time={time}
          setTime={setTime}
          onTimeUp={handleTimeUp}
          initialTime={timeAllowed}
          resetKey={level}
          isGameOver={winModalVisible || loseModalVisible}
        />
        {winModalVisible && (
          <LevelSuccessModal
            handleWin={handleWin}
            score={score}
            level={level}
            open={winModalVisible}
          />
        )}
        {loseModalVisible && (
          <GameOverModal
            handleLoss={handleLoss}
            score={score}
            level={level}
            open={loseModalVisible}
          />
        )}
      </div>
    </div>
  );
};

export default GameContainer;
