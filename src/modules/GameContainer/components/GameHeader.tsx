import React from "react";

interface Props {
  score: number;
  time: number;
  level: number;
  title: string;
}

export const GameHeader = ({ title, score, time, level }: Props) => {
  const timeColor =
    time <= 5
      ? "text-red-600"
      : time <= 15
      ? "text-yellow-600"
      : "text-gray-100";

  return (
    <div className="flex flex-col w-full px-10 py-5">
      <div className="flex justify-between items-center w-full">
        <div className="text-4xl font-bold">{title}</div>
        <div className="text-4xl text-green-600">{score}</div>
      </div>
      <div className="flex justify-between items-center w-full mt-4 text-2xl font-mono">
        <span className="flex flex-col">
          <span>
            <span className="w-24 inline-block">Level:</span>
            {level}
          </span>
        </span>
        <span>
          <span className="w-24 inline-block">Time:</span>
          <span className={timeColor}>{time}</span>
        </span>
      </div>
    </div>
  );
};
