import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setError("Please fill all fields.");
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/auth/signup", formData);

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token); // store token as plain string

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-96 flex items-center gap-4 flex-col shadow-lg rounded-sm px-4 py-6 bg-white">
        <h1 className="font-bold md:text-4xl text-2xl">Signup</h1>

        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-light text-sm">
              Username
            </label>
            <input
              type="text"
              onChange={handleChanges}
              value={formData.username}
              id="username"
              name="username"
              className="focus:outline-none px-4 py-2 border border-gray-700 rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-light text-sm">
              Email
            </label>
            <input
              type="email"
              onChange={handleChanges}
              value={formData.email}
              id="email"
              name="email"
              className="focus:outline-none px-4 py-2 border border-gray-700 rounded-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-light text-sm">
              Password
            </label>
            <input
              type="password"
              onChange={handleChanges}
              value={formData.password}
              id="password"
              name="password"
              className="focus:outline-none px-4 py-2 border border-gray-700 rounded-sm"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-cyan-600 mt-2 hover:bg-cyan-700 px-8 py-2 rounded-lg font-bold text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
