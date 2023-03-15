import React, { useState, useEffect } from "react";

const Timer = ({
  initialTime,
  onTimeUp,
  onVisibilityChange,
  visibilityInterval,
  resetKey,
  isLevelOver,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [mazeVisible, setMazeVisible] = useState(true);

  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [resetKey, initialTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resetKey, onTimeUp]);

  useEffect(() => {
    const visibilityTimer = setInterval(() => {
      setMazeVisible((prevVisible) => {
        onVisibilityChange(!prevVisible);
        return !prevVisible;
      });
    }, visibilityInterval * 1000);

    return () => clearInterval(visibilityTimer);
  }, [resetKey, visibilityInterval, onVisibilityChange]);

  return (
    <div>
      <h2>Time Remaining: {timeRemaining}s</h2>
    </div>
  );
};

export default Timer;
