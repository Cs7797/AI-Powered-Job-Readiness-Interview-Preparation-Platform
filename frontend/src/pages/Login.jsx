import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Email validation
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      await handleLogin({
        email: email.trim(),
        password,
      });

      navigate("/");
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Invalid email or password.");
    }
  };

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center
        bg-slate-950 text-6xl text-amber-50"
      >
        Loading.....
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

            <p className="text-slate-400 mt-2">
              Sign in to continue to your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email Address
              </label>

              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                value={email}
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                required
                className="
                  w-full
                  bg-slate-800
                  border border-slate-700
                  text-white
                  placeholder-slate-500
                  px-4 py-3
                  rounded-lg
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>

              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="
                  w-full
                  bg-slate-800
                  border border-slate-700
                  text-white
                  placeholder-slate-500
                  px-4 py-3
                  rounded-lg
                  outline-none
                  transition
                  focus:border-indigo-500
                  focus:ring-2
                  focus:ring-indigo-500/20
                "
              />
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-indigo-600"
              />

              <label htmlFor="remember" className="text-sm text-slate-400">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-500
                text-white
                font-semibold
                py-3
                rounded-lg
                transition
                duration-200
                shadow-lg
                shadow-indigo-600/20
              "
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-7">
            <div className="flex-1 h-px bg-slate-800"></div>

            <span className="px-4 text-xs text-slate-500">OR</span>

            <div className="flex-1 h-px bg-slate-800"></div>
          </div>

          {/* Google */}
          {/* <button
            type="button"
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              bg-slate-800
              hover:bg-slate-700
              border border-slate-700
              text-slate-200
              font-medium
              py-3
              rounded-lg
              transition
            "
          >
            <span className="font-bold">G</span>
            Continue with Google
          </button> */}

          {/* Signup */}
          <p className="text-center text-sm text-slate-400 mt-7">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          © 2026 CareerLens AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
