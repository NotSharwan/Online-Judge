import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProblemById, submitSolution } from "../api";

const Submit = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to submit solutions.");
      navigate("/login");
      return;
    }

    // Fetch the problem details
    const getProblem = async () => {
      try {
        const response = await fetchProblemById(problemId);
        setProblem(response.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    getProblem();
  }, [problemId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await submitSolution({ problemId, code, language });
      setResult(response.data);
    } catch (error) {
      console.error("Submission failed:", error);
      setResult({ status: "Error", message: "Failed to submit." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {problem ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          <p className="text-gray-700 mt-2">{problem.description}</p>

          <form onSubmit={handleSubmit} className="mt-4">
            <label className="block text-gray-700 font-semibold">Select Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
            </select>

            <label className="block text-gray-700 font-semibold mt-4">Write Your Code:</label>
            <textarea
              className="w-full p-2 border rounded mt-2 font-mono text-sm"
              rows="8"
              placeholder="Write your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>

            <button className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600">
              {loading ? "Submitting..." : "Submit Code"}
            </button>
          </form>

          {/* Show Submission Result */}
          {result && (
            <div className="mt-4 p-3 bg-gray-200 rounded">
              <h3 className="font-bold">Submission Result:</h3>
              <p className={`font-semibold ${result.status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
                {result.status}
              </p>
              {result.message && <p className="text-gray-700">{result.message}</p>}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Loading problem...</p>
      )}
    </div>
  );
};

export default Submit;
