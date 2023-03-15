import React, { useState, useCallback, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Maze from "./Maze";
import Player from "./Player";
import Timer from "./Timer";
import generateMaze from "./mazeGenerator";
import "./modal.css";

function isOutOfBounds(x, y, width, height) {
  return x < 0 || y < 0 || x >= width || y >= height;
}

const GameContainer = () => {
  const cellSize = 30;
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [mazeVisible, setMazeVisible] = useState(true);
  const [timeAllowed, setTimeAllowed] = useState(30);
  const [visibilityHelper, setVisibilityHelper] = useState(2);
  const [sizeOfMaze, setSizeOfMaze] = useState(4);
  const [winModalVisible, setWinModalVisible] = useState(false);
  const [loseModalVisible, setLoseModalVisible] = useState(false);
  const initialMaze = generateMaze(sizeOfMaze, sizeOfMaze);
  const [lives, setLives] = useState(3);

  const [score, setScore] = useState(0);
  const [steps, setSteps] = useState(0);

  const [maze, setMaze] = useState(initialMaze);
  const [time, setTime] = useState(timeAllowed);

  const [level, setLevel] = useState(1);

  const handleTimeUp = useCallback(() => {
    setLoseModalVisible(true);
    setPlayerPosition({ x: 1, y: 1 });

    if (level > 1) {
      setLevel(level - 1);
    }
    setMaze(generateMaze(sizeOfMaze + level, sizeOfMaze + level));
    setTime(timeAllowed);
  }, [level]);

  const handleVisibilityChange = useCallback((visible) => {
    setMazeVisible(visible);
  }, []);

  useEffect(() => {
    handleVisibilityChange(true);
    setTimeout(() => {
      handleVisibilityChange(false);
    }, 2000);
  }, [level, handleVisibilityChange]);

  const movePlayer = useCallback(
    (dx, dy) => {
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
          setWinModalVisible(true);
        }
      }
    },
    [maze, playerPosition, steps, time, timeAllowed]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [movePlayer]);

  const updateSettings = (e) => {
    e.preventDefault();

    setTimeAllowed(parseInt(e.target.timeAllowed.value));
    setVisibilityHelper(parseInt(e.target.visibilityHelper.value));
    setSizeOfMaze(parseInt(e.target.sizeOfMaze.value));
  };

  const closeModal = () => {
    setWinModalVisible(false);
    setLoseModalVisible(false);
  };

  const revealMaze = () => {
    if (lives > 0) {
      setLives(lives - 1);
      handleVisibilityChange(true);
      setTimeout(() => {
        handleVisibilityChange(false);
      }, 2000);
    }
  };

  const handleWinCloseModal = () => {
    setLevel(level + 1);
    setPlayerPosition({ x: 1, y: 1 });
    setMaze(generateMaze(sizeOfMaze + level, sizeOfMaze + level));
    setTime(timeAllowed);
    setSteps(0); // Reset steps
    closeModal();
  };

  const handleLoseCloseModal = () => {
    setPlayerPosition({ x: 1, y: 1 });
    setMaze(generateMaze(sizeOfMaze + level, sizeOfMaze + level));
    setTime(timeAllowed);
    setSteps(0); // Reset steps
    closeModal();
  };

  return (
    <div>
      <div>
        <h2>Score: {score}</h2>
      </div>
      <Stage width={maze[0].length * cellSize} height={maze.length * cellSize}>
        <Layer visible={mazeVisible}>
          <Maze maze={maze} cellSize={cellSize} />
        </Layer>
        <Layer>
          <Player position={playerPosition} cellSize={cellSize} />
        </Layer>
      </Stage>
      <Timer
        time={time}
        setTime={setTime}
        initialTime={timeAllowed}
        onTimeUp={handleTimeUp}
        onVisibilityChange={handleVisibilityChange}
        resetKey={level}
        isGameOver={winModalVisible || loseModalVisible}
        level={level}
      />

      <div>
        <h2>Level: {level}</h2>
        {/* <form onSubmit={updateSettings}>
          <label>
            Time Allowed:
            <input
              type="number"
              name="timeAllowed"
              defaultValue={timeAllowed}
            />
          </label>
          <label>
            Visibility Helper:
            <input
              type="number"
              name="visibilityHelper"
              defaultValue={visibilityHelper}
            />
          </label>
          <label>
            Size of Maze:
            <input type="number" name="sizeOfMaze" defaultValue={sizeOfMaze} />
          </label>
          <button type="submit">Update Settings</button>
        </form> */}
      </div>
      <div>
        <button onClick={revealMaze}>Reveal Maze</button>
        <h2>Lives: {lives}</h2>
      </div>

      {winModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>You won! Congratulations!</h2>
            <p>Proceeding to the next level.</p>
            <button onClick={handleWinCloseModal}>Close</button>
          </div>
        </div>
      )}
      {loseModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>You lost!</h2>
            <p>Your final score: {score}</p>
            <button onClick={handleLoseCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
