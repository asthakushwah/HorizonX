import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import Button from "../components/Button";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", res.data);

      // Save JWT
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Save user
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      alert("Login Successful!");

      navigate("/");

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      alert(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin = () => {
    window.location.href =
      `${api.defaults.baseURL}/auth/google`;
  };

  // =========================
  // UI
  // =========================

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md glass border border-border rounded-xl2 p-8 sm:p-10"
    >

      {/* TITLE */}

      <h1 className="font-display text-2xl font-semibold mb-1">
        Welcome back
      </h1>

      <p className="text-sm text-white/40 mb-8">
        Sign in to sync your collections across devices.
      </p>


      {/* LOGIN FORM */}

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >

        {/* EMAIL */}

        <div className="relative">

          <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full bg-white/5 border border-border rounded-xl2 pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-hover"
          />

        </div>


        {/* PASSWORD */}

        <div className="relative">

          <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />

          <input
            type={showPw ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white/5 border border-border rounded-xl2 pl-11 pr-11 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-hover"
          />

          <button
            type="button"
            onClick={() => setShowPw((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>

        </div>


        {/* SIGN IN */}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

      </form>


      {/* OR */}

      <div className="flex items-center gap-3 my-6">

        <div className="flex-1 h-px bg-border" />

        <span className="text-xs text-white/30">
          or
        </span>

        <div className="flex-1 h-px bg-border" />

      </div>


      {/* GOOGLE LOGIN */}

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleGoogleLogin}
      >

        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
          />
        </svg>

        Continue with Google

      </Button>


      {/* SIGN UP */}

      <p className="text-center text-sm text-white/40 mt-8">

        Don't have an account?{" "}

        <Link
          to="/signup"
          className="text-hover hover:underline"
        >
          Sign up
        </Link>

      </p>

    </motion.div>
  );
}