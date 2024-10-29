"use client";
import { useState } from "react";
import RajuSection from "./Rdmbs";
import { div } from "three/webgpu";

const DBMSRDBMSPage = () => {
  const [toyData, setToyData] = useState<any>([
    {
      id: 1,
      name: "Red Car",
      type: "Car",
      color: "Red",
      belongsTo: "Racing Set",
    },
    {
      id: 2,
      name: "Blue Truck",
      type: "Truck",
      color: "Blue",
      belongsTo: "Construction Set",
    },
    {
      id: 3,
      name: "Yellow Doll",
      type: "Doll",
      color: "Yellow",
      belongsTo: "Fashion Set",
    },
  ]);

  const [userData, setUserData] = useState<any>([
    {
      id: 1,
      username: "Racing Set",
      email: "racing@example.com",
      dateJoined: "2024-01-15",
    },
    {
      id: 2,
      username: "Fashion Set",
      email: "fasion@example.com",
      dateJoined: "2024-01-20",
    },
    {
      id: 3,
      username: "Construction Set",
      email: "construction@example.com",
      dateJoined: "2024-01-25",
    },
  ]);

  const [answer, setAnswer] = useState<any>("");
  const [highlightedToyRow, setHighlightedToyRow] = useState<any>(null);
  const [highlightedUserRow, setHighlightedUserRow] = useState<any>(null);
  const [highlightedEmailCell, setHighlightedEmailCell] = useState<any>(null);
  const [why, setWhy] = useState<any>(null);
  const [boss, setBoss] = useState<any>(null);
  const handleDragStart = (event: any, value: any) => {
    event.dataTransfer.setData("text/plain", value);
  };
  const unhighlight = () => {
    setHighlightedToyRow(null); // 2 for the Yellow Doll row (index starts from 0)
    setHighlightedUserRow(null); // Highlight Fashion Set row in Raju
    setHighlightedEmailCell(null);
    setWhy(null);
    if (why) {
      setBoss(true);
    }
  };
  const handleDrop = (event: any, section: any) => {
    unhighlight();
    event.preventDefault();
    const value = event.dataTransfer.getData("text/plain");
    console.log(`Dropped value: ${value} in ${section}`); // Debugging log

    if (section === "ramu") {
      switch (value) {
        case "Red Car":
          setAnswer(
            "Red Car belongs to Racing Set (Ramu can tell this because he have toys name and owners information)"
          );
          break;
        case "Yellow Doll":
          setAnswer(
            "I don't have this information (Ramu can't answer this because ramu knows Yellow Doll owner but he dont have email information)"
          );
          setWhy(false);
          break;
        default:
          setAnswer("I don't have this information");
      }
    } else if (section === "raju") {
      switch (value) {
        case "Racing Set":
          setAnswer(
            "Racing Set email is racing@example.com (Raju can answer this because he have information of email and username) "
          );
          break;
        case "Yellow Doll":
          setAnswer(
            "I don't have this information (Raju can't answer this because Taju knows email of owners but he dont know who is the owner of Yellow Doll)"
          );
          setWhy(false);
          break;
        case "Construction Set":
          setAnswer(
            "Construction Set joined on 2024-01-25 (Raju can answer this because he have information of username and joining date)"
          );
          break;
        default:
          setAnswer("I don't have this information");
      }
    } else if (section === "rdbms") {
      switch (value) {
        case "Yellow Doll":
          setAnswer("fasion@example.com");
          // Highlight the Yellow Doll row
          setHighlightedToyRow(2); // 2 for the Yellow Doll row (index starts from 0)
          setHighlightedUserRow(1); // Highlight Fashion Set row in Raju
          setHighlightedEmailCell(1); // Highlight email cell in the highlighted row
          break;
        case "Red Car":
          setAnswer("Red Car belongs to Racing Set");
        case "Racing Set":
          setAnswer("Racing Set email is racing@example.com");
          break;
        case "Construction Set":
          setAnswer("Construction Set joined on 2024-01-25");
          break;
        default:
          setAnswer("I don't have this information");
      }
    }
  };

  const allowDrop = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="h-[100svh] overflow-scroll bg-gradient-to-b from-green-200 to-blue-200 p-8">
      <div className="h-fit">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Learn DBMS and RDBMS
        </h1>

        {/* DBMS Section */}
        <section className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            What is a DBMS?
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            A <strong>DBMS</strong> (Database Management System) helps you
            organize your data efficiently, on different tables which are
            organized with rows and columns with proper headings, in simple
            words take example of toys database can arrange toys information on
            organized way which you can see below
          </p>
          <div className="flex justify-center mt-6">
            <img
              src="dbms-toys.jpeg"
              alt="Robot Explaining DBMS"
              className="h-40"
            />
          </div>
        </section>

        <p>Now imagine 2 tables for example two people Ramu and Raju</p>

        {/* Toys Table */}
        <div className="flex gap-2">
          <section
            className="bg-white shadow-md p-6 rounded-lg mb-8"
            id="ramu"
            onDrop={(e) => handleDrop(e, "ramu")}
            onDragOver={allowDrop}
          >
            <h2 className="text-xl font-normal text-gray-800">Ramu</h2>
            <p className="text-lg text-gray-700 my-4">
              On this example you can see Toy name, owner (Belongs to), color of
              a toy, type
            </p>
            <h2 className="text-3xl font-semibold text-gray-800">Toys</h2>
            <table className="min-w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Toy ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Color</th>
                  <th className="border px-4 py-2">Belongs To</th>
                </tr>
              </thead>
              <tbody>
                {toyData.map((toy: any, index: any) => (
                  <tr
                    key={toy.id}
                    className={highlightedToyRow === index ? "bg-red-200" : ""}
                  >
                    <td className="border px-4 py-2">{toy.id}</td>
                    <td
                      className="border px-4 py-2 cursor-pointer"
                      draggable
                      onDragStart={(e) => handleDragStart(e, toy.name)}
                    >
                      {toy.name}
                    </td>
                    <td className="border px-4 py-2">{toy.type}</td>
                    <td className="border px-4 py-2">{toy.color}</td>
                    <td className="border px-4 py-2">{toy.belongsTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Users Table */}
          <section
            className="bg-white shadow-md p-6 rounded-lg mb-8"
            id="raju"
            onDrop={(e) => handleDrop(e, "raju")}
            onDragOver={allowDrop}
          >
            <h2 className="text-xl font-normal text-gray-800">Raju</h2>
            <p className="text-lg text-gray-700 my-4">
              On this table you can see user id, user name, email, and when they
              joined to us
            </p>
            <h2 className="text-3xl font-semibold text-gray-800">Users</h2>
            <table className="min-w-full mt-4">
              <thead>
                <tr>
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user: any, index: any) => (
                  <tr
                    key={user.id}
                    className={highlightedUserRow === index ? "bg-red-200" : ""}
                  >
                    <td className="border px-4 py-2">{user.id}</td>
                    <td
                      className={`border px-4 py-2 cursor-pointer ${
                        highlightedUserRow === index ? "bg-red-300" : ""
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, user.username)}
                    >
                      {user.username}
                    </td>
                    <td
                      className={`border px-4 py-2 ${
                        highlightedEmailCell === index ? "bg-yellow-300" : ""
                      }`}
                    >
                      {user.email}
                    </td>
                    <td className="border px-4 py-2">{user.dateJoined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        {(why || boss) && (
          <section
            id="rdbms"
            onDrop={(e) => handleDrop(e, "rdbms")}
            onDragOver={allowDrop}
            className="bg-yellow-50 shadow-md p-6 flex justify-center rounded-lg mb-8"
          >
            Boss (RDBMS)
          </section>
        )}
        <div className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Ask these questions to Ramu or Raju
          </h2>
          <div className="my-4">
            <span
              className="block my-2 cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, "Red Car")}
            >
              Red Car belongs to whom?
            </span>
            <span
              className="block my-2 cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, "Racing Set")}
            >
              What's Racing Set email?
            </span>
            <span
              className="block my-2 cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, "Construction Set")}
            >
              When did Construction Set join?
            </span>
            <span
              className="block my-2 cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, "Yellow Doll")}
            >
              What's Yellow Doll's owner email?
            </span>
          </div>
        </div>

        {/* Drop Area for Questions */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-normal text-gray-800">Answer:</h2>
          <p className="text-lg text-gray-700">
            {answer}
            {why == false && (
              <button
                onClick={() => {
                  setWhy(true);
                  setTimeout(() => {
                    const element = document.getElementById("raju-section");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to the section
                    }
                  }, 1000);
                }}
                className="bg-blue-400 text-black rounded-lg p-2 mx-3 text-sm animate-pulse"
              >
                Know why?
              </button>
            )}
          </p>
        </div>
        {why && (
          <div className="mt-8">
            <RajuSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default DBMSRDBMSPage;
