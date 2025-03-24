import { useEffect, useState } from "react";
import { fetchProblems } from "../api";
import { Link } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const getProblems = async () => {
      try {
        const response = await fetchProblems();
        setProblems(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    getProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">Problems</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3 font-medium">
                  <Link to={`/problems/${problem._id}`} className="text-blue-500 hover:underline">
                    {problem.title}
                  </Link>
                </td>
                <td className={`p-3 ${problem.difficulty === "easy" ? "text-green-500" : problem.difficulty === "medium" ? "text-yellow-500" : "text-red-500"}`}>
                  {problem.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problems;
