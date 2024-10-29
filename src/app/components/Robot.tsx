"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Robot = ({ message, onTaskComplete, button }: any) => {
  const [showBubble, setShowBubble] = useState(true);

  return (
    <div className="relative flex items-center">
      <img
        src="/robot.png" // Add the path to your robot image
        alt="Robot"
        className="w-24 h-24" // Add any animations you like
      />
      {showBubble && (
        <div className="absolute left-28 bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-800">{message}</p>
          {button && (
            <div className="gap-2 flex flex-col">
              <Link
                href={button?.link}
                className="px-4 w-fit mt-5 text-sm py-2 text-white bg-blue-600 rounded-lg"
              >
                {button?.title}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Robot;
