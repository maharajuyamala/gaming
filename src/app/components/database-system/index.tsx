"use client";
import React, { useEffect, useState } from "react";

// Typing the timeTake prop as a function that accepts a number
interface OrganisedFruitsProps {
  timeTake: (time: number) => void;
}

// Define a type for the fruit objects
interface Fruit {
  emoji: string;
  name: string;
  color: string; // Use color instead of value
}

// Base fruit names and emojis
const baseFruits: { emoji: string; name: string; color: string }[] = [
  { emoji: "🍎", name: "Apple", color: "Red" },
  { emoji: "🍌", name: "Banana", color: "Yellow" },
  { emoji: "🍇", name: "Grapes", color: "Purple" },
  { emoji: "🍉", name: "Watermelon", color: "Green" },
  { emoji: "🍊", name: "Orange", color: "Orange" },
  { emoji: "🍒", name: "Cherry", color: "Red" },
  { emoji: "🍓", name: "Strawberry", color: "Red" },
  { emoji: "🥝", name: "Kiwi", color: "Brown" },
  { emoji: "🍑", name: "Peach", color: "Pink" },
  { emoji: "🍋", name: "Lemon", color: "Yellow" },
  { emoji: "🍈", name: "Melon", color: "Green" },
  { emoji: "🍐", name: "Pear", color: "Green" },
  { emoji: "🍍", name: "Pineapple", color: "Yellow" },
  { emoji: "🥭", name: "Mango", color: "Orange" },
  { emoji: "🍊", name: "Tangerine", color: "Orange" },
  { emoji: "🍇", name: "Black Grapes", color: "Black" },
  { emoji: "🍈", name: "Cantaloupe", color: "Orange" },

  { emoji: "🍑", name: "Nectarine", color: "Orange" },
  { emoji: "🍐", name: "Asian Pear", color: "Yellow" },

  { emoji: "🍉", name: "Honeydew", color: "Green" },
  { emoji: "🍍", name: "Pink Pineapple", color: "Pink" },

  { emoji: "🍌", name: "Lady Finger Banana", color: "Yellow" },
  { emoji: "🍒", name: "Rainier Cherry", color: "Pink" },
  { emoji: "🍓", name: "Wild Strawberry", color: "Red" },
];

// Function to shuffle an array
const shuffleArray = (array: Fruit[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Generate fruit options dynamically with shuffling
const generateFruitOptions = (count: number): Fruit[] => {
  const fruitPool = [...baseFruits];
  const fruitOptions: Fruit[] = [];

  // Populate the fruitOptions array by duplicating and shuffling base fruits
  while (fruitOptions.length < count) {
    fruitOptions.push(...fruitPool);
  }
  fruitOptions.splice(200, 0, {
    emoji: "🍏",
    name: "Green Apple",
    color: "Green",
  });
  // Shuffle the final array and slice it to get exactly 'count' options
  return shuffleArray(fruitOptions).slice(0, count);
};

// Get 500 fruit options
const fruitOptions: Fruit[] = generateFruitOptions(500);

const colorOptions = [
  { name: "All", value: "" },
  { name: "Green", value: "green" },
  { name: "Red", value: "red" },
  { name: "Yellow", value: "yellow" },
  { name: "Orange", value: "orange" },
  { name: "Black", value: "black" },
];

const OrganisedFruits: React.FC<OrganisedFruitsProps> = ({ timeTake }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Function to handle search query input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle color selection
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  // Function to filter fruits based on the exact search query and selected color
  const filteredFruits = fruitOptions.filter((fruit) => {
    const matchesColor =
      selectedColor === "" ||
      fruit.color.toLowerCase().includes(selectedColor?.toLowerCase());
    const matchesName =
      searchQuery === "" ||
      fruit.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesColor && matchesName;
  });

  useEffect(() => {
    if (isGameStarted) {
      setIsGameStarted(true);
      console.log(Date.now());
      setStartTime(Date.now());
      setEndTime(null);
      setTimeTaken(null);
    }
  }, [isGameStarted]);

  const handleFruitClick = (fruit: Fruit) => {
    if (fruit.name.toLowerCase() === "green apple") {
      const now = Date.now();
      setEndTime(now);
      setIsGameStarted(false);
      setTimeTaken((now - (startTime || 0)) / 1000);
      timeTake((now - (startTime || 0)) / 1000);
    }
  };

  return (
    <div className="mt-14  flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Fruits Database</h1>
      {!isGameStarted && !timeTaken && (
        <button
          onClick={() => setIsGameStarted(true)}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Start
        </button>
      )}
      {isGameStarted && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for a fruit..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="mb-4 p-2 border border-gray-300 rounded-md w-64"
            />

            <select
              value={selectedColor}
              onChange={handleColorChange}
              className="mb-4 p-2 border border-gray-300 rounded-md w-64"
            >
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedColor("");
              }}
              className="mb-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Reset
            </button>
          </div>
          <h1 className="text-lg font-semibold mb-4 text-gray-800">
            <span className="text-red-500">Find a </span>
            <span className="text-green-500">Green Apple</span>
          </h1>
          {filteredFruits.length > 0 ? (
            <div className="flex flex-wrap justify-center items-center mt-2 overflow-scroll md:h-[50svh] h-[90svh] w-[60svw] md:w-[60svw]">
              {filteredFruits.map((fruit, index) => (
                <button
                  key={index}
                  onClick={() => handleFruitClick(fruit)}
                  className="text-3xl m-0"
                  style={{ lineHeight: "1em" }}
                >
                  {fruit.emoji}
                </button>
              ))}
            </div>
          ) : (
            <p>No matching fruits found!</p>
          )}
        </>
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

export default OrganisedFruits;
