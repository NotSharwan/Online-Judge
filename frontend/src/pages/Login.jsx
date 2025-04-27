import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/problems");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed! Check credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mt-2"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mt-2"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
