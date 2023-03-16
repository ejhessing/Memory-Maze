// import React, { useEffect, useRef } from "react";

// interface TimerProps {
//   time: number;
//   setTime: (time: number) => void;
//   handleTimeUp: () => void;
//   isVisible: boolean;
// }

// const Timer: React.FC<TimerProps> = ({
//   time,
//   setTime,
//   handleTimeUp,
//   isVisible,
// }) => {
//   const intervalRef = useRef<NodeJS.Timeout>();

//   useEffect(() => {
//     if (isVisible) {
//       intervalRef.current = setInterval(() => {
//         if (time <= 1) {
//           clearInterval(intervalRef.current!);
//           handleTimeUp();
//           setTime(0);
//         } else {
//           setTime(time - 1);
//         }
//       }, 1000);
//     } else {
//       clearInterval(intervalRef.current!);
//     }
//     return () => clearInterval(intervalRef.current!);
//   }, [isVisible, time, setTime, handleTimeUp]);

//   return (
//     <div className="flex flex-col text-2xl">
//       <div className="timer">
//         <span>Time left: {time}s</span>
//       </div>
//     </div>
//   );
// };

// export default Timer;

import React, { useEffect, useRef, useState } from "react";

interface Props {
  time: number;
  setTime: (time: number) => void;
  initialTime: number;
  onTimeUp: () => void;
  resetKey: number;
  isGameOver: boolean;
}

const Timer = ({
  time,
  setTime,
  initialTime,
  onTimeUp,
  resetKey,
  isGameOver,
}: Props) => {
  const countdown = useRef<any>();

  const startTimer = () => {
    countdown.current = setInterval(() => {
      // @ts-ignore
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  };

  const stopTimer = () => {
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

  // useEffect(() => {
  //   if (level === 1) {
  //     onVisibilityChange(true);
  //     setTimeout(() => {
  //       onVisibilityChange(false);
  //     }, 1000);
  //   }
  // }, [level, onVisibilityChange]);

  return (
    <div>
      <h2>Time: {time}</h2>
    </div>
  );
};

export default Timer;
