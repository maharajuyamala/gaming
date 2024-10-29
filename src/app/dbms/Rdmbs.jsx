import React, { useEffect, useState } from "react";

const RajuSection = () => {
  const [visibleLines, setVisibleLines] = useState([]);
    const lines = [
    "Because Ramu knows only about Ramu table, Raju knows about Raju table but for the question, what's the Yellow Doll's owner email?",
    "Above question has 2 questions.",
    "1st: What's Yellow Doll's owner? We need to find the owner name with Ramu then that name so we can search on Raju's table.",
    "But they don't know about each other. HOW?",
    "In this case, RDBMS comes into the picture. DBMS you already learned. Now, what does R mean? Relationship.",
    "RDBMS is the boss of DBMS; it knows all relations of that table.",
    "New Boss table was added try to ask that same queation Boss table"
  ];


  
  return (
    <section
      className="bg-white shadow-md p-6 rounded-lg mb-8 text-gray-800"
    >
      <div className="space-y-4">
        {lines.map((line, index) => (
          <p
            key={index}
            className="transition-opacity duration-500 ease-in-out opacity-100"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
};

export default RajuSection;
