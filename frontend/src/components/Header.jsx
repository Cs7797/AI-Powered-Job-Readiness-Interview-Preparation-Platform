import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks.js";

const Header = () => {
  const navigate = useNavigate();

  const { user, loading, authChecked, handleLogout } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!authChecked) {
    return (
      <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-white">
            Career<span className="text-indigo-400">Lens</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}

        <Link to="/" className="text-lg font-bold tracking-tight text-white">
          Career<span className="text-indigo-400">Lens</span>
          <span className="text-slate-500 text-xs ml-2 font-medium">AI</span>
        </Link>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-7">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/interview"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            Interview Prep
          </Link>
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* User */}

              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-indigo-400">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <span className="text-sm text-slate-300">{user.username}</span>
              </div>

              {/* Logout */}

              <button
                onClick={handleLogoutClick}
                disabled={loading}
                className="text-sm text-slate-400 hover:text-red-400 transition"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
    