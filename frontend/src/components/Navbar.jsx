import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-primary p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-2xl font-bold hover:text-gray-200 transition">🚀 Online Judge</Link>
        <div className="space-x-4">
          <Link to="/problems" className="text-black hover:text-gray-200 transition">Problems</Link>
          <Link to="/leaderboard" className="text-black hover:text-gray-200 transition">Leaderboard</Link>
          {!token ? (
            <>
              <Link to="/register" className="px-4 py-2 bg-accent text-black rounded hover:bg-purple-600 transition">
                Register
              </Link>
              <Link to="/login" className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 transition">
                Login
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600 transition">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
