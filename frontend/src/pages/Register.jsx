import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const BASE_URL = "https://gigflow-g43e.onrender.com/api/auth";

  const handleInput = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.msg)
      toast.error(data.msg || "Signup failed");
      return;
    }

    toast.success("Registration Successful!");

    setUser({ username: "", email: "", password: "" });
    navigate("/login");

  } catch (error) {
    toast.error("Server error");
  }
};


  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT FORM */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-black">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-semibold text-black hover:underline"
            >
              Sign In
            </NavLink>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Username */}
            <div>
              <label className="text-base font-medium">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Your name"
                required
                className="mt-2 w-full h-10 px-3 py-2 border rounded-md focus:ring-1 focus:ring-black"
                value={user.username}
                onChange={handleInput}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-base font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="mt-2 w-full h-10 px-3 py-2 border rounded-md focus:ring-1 focus:ring-black"
                value={user.email}
                onChange={handleInput}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-base font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                required
                className="mt-2 w-full h-10 px-3 py-2 border rounded-md focus:ring-1 focus:ring-black"
                value={user.password}
                onChange={handleInput}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center bg-black text-white py-2.5 rounded-md hover:bg-black/80 transition"
            >
              Create Account <ArrowRight className="ml-2" size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998"
          className="w-full h-full object-cover rounded-l-xl"
          alt="register-banner"
        />
      </div>
    </section>
  );
}
