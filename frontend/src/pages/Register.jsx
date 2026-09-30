
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks";

const Register = () => {
  const navigate=useNavigate()
  const {loading, handleRegister } = useAuth()
  const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault()
       if (!password.trim()) {
         setError("Please enter a password.");
         return;
       }

       if (!confirmPassword.trim()) {
         setError("Please re-enter your password.");
         return;
       }

       if (password !== confirmPassword) {
         setError("Passwords do not match.");
         return;
       }
      try {
        await handleRegister({ username, email, password })
        navigate("/")
      } catch (error) {
        console.log(error)
        setError(
          error.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      }
  }
  
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
        {/* Register Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>

            <p className="text-slate-400 mt-2">
              Create your CareerLens AI account
            </p>
          </div>
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Username
              </label>

              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="Enter your full name"
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

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email Address
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="Confirm your password"
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

            {/* Register Button */}
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
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-400 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Sign in
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

export default Register;
