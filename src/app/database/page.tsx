"use client";
import Link from "next/link";
import PineappleGame from "../components/Pinapple-game";
import { useEffect, useState } from "react";
import OrganisedFruits from "../components/database-system";
import Robot from "../components/Robot"; // Import the Robot component

const DatabaseModule = () => {
  const [pinapple_time, set_pinapple_time] = useState(0);
  const [db_time, set_db_time] = useState(0);
  const [robotMessage, setRobotMessage] = useState("");
  const [start, setStart] = useState(false);
  const [button, setButton] = useState<any>(null);
  useEffect(() => {
    if (pinapple_time === 0) {
      setRobotMessage(
        "Hello! I am your assistant robot. Let's learn about databases!"
      );
      setTimeout(() => {
        setRobotMessage(
          `Will learn database in very simple way Now i am giving one task to you just find out pineapple`
        );
        setTimeout(() => {
          setStart(true);
        }, 7000);
      }, 7000);
    } else if (db_time === 0) {
      setRobotMessage(
        "You felt struggle to find pineapple right?, I can understand now, find green apple using search and color option"
      );
    } else {
      setRobotMessage(
        "Great, So on the first case, you saw a mixed fruit bucket; it was hard to find the fruit you wanted. But in the second case, you saw an organized basket where you can search for the fruit you want. A database is also like an organized fruit basket, which can hold a lot of data and will have RDBMS and SQL to search for the data we want. These concepts will be explained in further sections."
      );
      setButton({ title: "Learn DBMS", link: "/dbms" });
    }
  }, [pinapple_time, db_time]);

  return (
    <div className="min-h-screen p-8 bg-gray-100 bg-animated relative">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          What is a Database?
        </h1>
        <div className="flex w-fit">
          <div className="bg-white text-sm p-3 w-fit">
            <span className="font-bold"> Non-database Time</span>
            <p>{pinapple_time} Seconds</p>
          </div>
          <div className="bg-white text-sm p-3 w-fit ">
            <span className="font-bold"> Database Time</span>
            <p>{db_time} Seconds</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {(!start || pinapple_time !== 0) && robotMessage && (
          <Robot
            message={robotMessage}
            button={button}
            // onTaskComplete={() => {
            //   if (pinapple_time === 0) {
            //     set_pinapple_time(0); // This can be changed to 1 or your desired logic
            //   }
            //   if (db_time === 0 && pinapple_time > 0) {
            //     set_db_time(0);
            //   }
            // }}
          />
        )}

        {/* Conditional Rendering of Games */}
        {start && pinapple_time === 0 && (
          <PineappleGame
            timeTake={(e) => setTimeout(() => set_pinapple_time(e), 3000)}
          />
        )}
        {start && db_time === 0 && pinapple_time > 0 && (
          <OrganisedFruits
            timeTake={(e) => e && setTimeout(() => set_db_time(e), 3000)}
          />
        )}
      </div>

      <Link href="/" className="absolute bottom-2 left-5">
        <div className="mt-10 inline-block text-blue-500 underline">
          Back to Home
        </div>
      </Link>
    </div>
  );
};

export default DatabaseModule;
