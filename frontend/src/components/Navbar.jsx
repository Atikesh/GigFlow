import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State
  const { token, user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">GigFlow</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/gigs" className="hover:text-gray-300">Browse Gigs</Link>

          {!token && (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/create-gig" className="hover:text-gray-300">Create Gig</Link>

              {/* PROFILE DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 px-3 py-1 border rounded hover:bg-white hover:text-black transition"
                >
                  <User size={18} />
                  {user?.username || "User"}
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg p-4 space-y-2 z-20">
                    <p className="font-semibold text-lg">{user?.username}</p>
                    <p className="text-sm text-gray-700">Email: {user?.email}</p>
                    <p className="text-sm text-gray-700">User ID: {user?.userId}</p>

                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black px-6 py-4 space-y-3 text-lg">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/gigs" onClick={() => setOpen(false)}>Browse Gigs</Link>

          {!token && (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block bg-white text-black p-2 rounded"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              <div className="bg-white text-black rounded p-3">
                <p className="font-bold">{user?.username}</p>
                <p className="text-sm">Email: {user?.email}</p>
                <p className="text-sm">ID: {user?.userId}</p>
              </div>

              <Link to="/create-gig" onClick={() => setOpen(false)}>Create Gig</Link>

              <button
                onClick={handleLogout}
                className="block bg-red-500 w-full text-white p-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
