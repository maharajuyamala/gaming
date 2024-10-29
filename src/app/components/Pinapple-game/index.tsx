"use client";
import React, { useState } from "react";
interface PineappleGameProps {
  timeTake: (time: number) => void;
}
const PineappleGame = ({ timeTake }: PineappleGameProps) => {
  // State to track game status
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  // Different types of fruits
  const fruitOptions = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍊",
    "🍒",
    "🍓",
    "🥝",
    "🍑",
    "🍋",
    "🍈",
    "🍏",
    "🍐",
  ];

  // Function to generate the fruit list with different types of fruits
  const generateFruitList = (totalFruits: number, pineappleIndex: number) => {
    return Array(totalFruits)
      .fill(null)
      .map((_, index) =>
        index === pineappleIndex
          ? "🍍"
          : fruitOptions[Math.floor(Math.random() * fruitOptions.length)]
      );
  };

  // Generate the fruit list with 1000 fruits and place the pineapple at a random position
  const fruitList = generateFruitList(1000, Math.floor(Math.random() * 500));
  fruitList.splice(286, 1, "🍍");
  // Shuffle the fruits randomly
  const shuffleFruits = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to start the game
  const startGame = () => {
    setIsGameStarted(true);
    setStartTime(Date.now());
    setEndTime(null);
    setTimeTaken(null);
    timeTake(0);
  };

  // Function to handle the click on a fruit
  const handleFruitClick = (fruit: string) => {
    if (fruit === "🍍") {
      const now = Date.now();
      setEndTime(now);
      setIsGameStarted(false);
      setTimeTaken((now - (startTime || 0)) / 1000);
      timeTake((now - (startTime || 0)) / 1000);
    }
  };

  // Shuffling the fruits
  const shuffledFruits = shuffleFruits(fruitList);

  return (
    <div className="mt-14  flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Find the Pineapple!
      </h1>

      {!isGameStarted && !timeTaken && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Start
        </button>
      )}

      {isGameStarted && (
        <div className="flex flex-wrap justify-center items-center mt-8 overflow-scroll md:h-[50svh] h-[90svh] w-[60svw] md:w-[60svw]">
          <div className="h-fit w-fit">
            {shuffledFruits.map((fruit, index) => (
              <button
                key={index}
                onClick={() => handleFruitClick(fruit)}
                className="text-3xl m-0"
                style={{ lineHeight: "1em" }}
              >
                {fruit}
              </button>
            ))}
          </div>
        </div>
      )}

      {timeTaken && (
        <div className="mt-8 text-center">
          <p className="text-2xl text-gray-700">Congratulations! 🎉</p>
          <p className="text-xl text-gray-700">
            You found the pineapple in <strong>{timeTaken} seconds!</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PineappleGame;
