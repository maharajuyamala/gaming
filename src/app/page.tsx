import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="gradient-background"></div> {/* Moving Background */}
      <section className="w-full max-w-md z-10">
        {" "}
        {/* Ensure content is on top */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Choose a Module:
        </h2>
        <ul className="space-y-4">
          <li className="bg-white p-4 rounded-lg shadow-lg">
            <Link href="/database">
              <div className="text-xl text-blue-500 font-bold hover:underline">
                What is a Database?
              </div>
            </Link>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-lg">
            <Link href="/dbms">
              <div className="text-xl text-blue-500 font-bold hover:underline">
                What is a DBMS?
              </div>
            </Link>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-lg">
            <Link href="/rdbms">
              <div className="text-xl text-blue-500 font-bold hover:underline">
                What is an RDBMS?
              </div>
            </Link>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-lg">
            <Link href="/sql">
              <div className="text-xl text-blue-500 font-bold hover:underline">
                Learn SQL
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
