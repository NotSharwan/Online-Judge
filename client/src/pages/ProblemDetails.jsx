import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProblemById } from "../api";

const ProblemDetails = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const getProblem = async () => {
      try {
        const response = await fetchProblemById(id);
        setProblem(response.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    getProblem();
  }, [id]);

  if (!problem) {
    return <p className="text-center text-gray-600">Loading problem...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">{problem.title}</h2>
      <p className="text-gray-700 mt-2">{problem.description}</p>

      <h3 className="font-semibold mt-4">Input Format</h3>
      <p className="text-gray-600">{problem.inputFormat}</p>

      <h3 className="font-semibold mt-4">Output Format</h3>
      <p className="text-gray-600">{problem.outputFormat}</p>

      <Link to={`/submit/${problem._id}`} className="block bg-blue-500 text-white text-center p-2 rounded mt-4 hover:bg-blue-600">
        Submit Solution
      </Link>
    </div>
  );
};

export default ProblemDetails;
