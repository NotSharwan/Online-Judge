import axios from "axios";
import { API_BASE_URL } from "./config";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Register a new user
export const registerUser = async (userData) => {
  try {
    return await axios.post(`${API_BASE_URL}/auth/register`, userData);
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    return await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all problems
export const fetchProblems = async () => {
  try {
    return await axios.get(`${API_BASE_URL}/problems`);
  } catch (error) {
    console.error("Error fetching problems:", error.response?.data || error.message);
    throw error;
  }
};

// Submit a solution
export const submitSolution = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submissions`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Submission failed:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all submissions for a specific problem
export const fetchSubmissions = async (problemId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/submissions/${problemId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching submissions:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch leaderboard
export const fetchLeaderboard = async () => {
  try {
    return await axios.get(`${API_BASE_URL}/leaderboard`);
  } catch (error) {
    console.error("Error fetching leaderboard:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch a specific problem by ID
export const fetchProblemById = async (problemId) => {
  return await axios.get(`${API_BASE_URL}/problems/${problemId}`);
};
