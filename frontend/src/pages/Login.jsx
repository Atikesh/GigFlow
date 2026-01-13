import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import api from "../services/api";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const handleInput = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
  e.preventDefault();

  dispatch(loginUser(user))
    .unwrap()
    .then((res) => {
      toast.success("Login Successful!");
      navigate("/");
    })
    .catch((err) => {
      toast.error(err?.msg || "Invalid credentials");
    });
};


  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-black">Sign In</h2>

          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{" "}
            <NavLink to="/register" className="font-semibold hover:underline">
              Create one
            </NavLink>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="w-full border rounded px-3 py-2"
                value={user.email}
                onChange={handleInput}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="w-full border rounded px-3 py-2"
                value={user.password}
                onChange={handleInput}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {loading ? "Logging in..." : "Sign In"}
              <ArrowRight className="inline ml-2" />
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e"
          alt="banner"
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>
    </section>
  );
}
