import React, { useEffect, useRef, useState } from "react";

const Timer = ({
  time,
  setTime,
  initialTime,
  onTimeUp,
  onVisibilityChange,
  resetKey,
  isGameOver,
  level,
}) => {
  const [isActive, setIsActive] = useState(true);
  const countdown = useRef(null);

  const startTimer = () => {
    setIsActive(true);
    countdown.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(countdown.current);
  };

  useEffect(() => {
    if (isGameOver) {
      stopTimer();
    } else {
      startTimer();
    }

    return () => {
      stopTimer();
    };
  }, [isGameOver]);

  useEffect(() => {
    if (time === 0) {
      stopTimer();
      onTimeUp();
    }
  }, [time, onTimeUp]);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime, resetKey]);

  useEffect(() => {
    if (level === 1) {
      onVisibilityChange(true);
      setTimeout(() => {
        onVisibilityChange(false);
      }, 1000);
    }
  }, [level, onVisibilityChange]);

  return (
    <div>
      <h2>Time: {time}</h2>
    </div>
  );
};

export default Timer;
