import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import Button from "../components/Button";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  // =========================
  // FORM STATES
  // =========================

  const [showPw, setShowPw] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // CREATE ACCOUNT
  // =========================

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("REGISTER RESPONSE:", response.data);

      // Save JWT token
      if (response.data?.token) {
        localStorage.setItem(
          "token",
          response.data.token
        );
      }

      // Save user
      if (response.data?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      alert("Registration Successful!");

      navigate("/");

    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleLogin = () => {
    const googleUrl =
      `${api.defaults.baseURL}/auth/google`;

    console.log(
      "Redirecting to Google:",
      googleUrl
    );

    window.location.href = googleUrl;
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
        Create your account
      </h1>

      <p className="text-sm text-white/40 mb-8">
        Build cosmic collections and pick up where you left off.
      </p>

      {/* SIGNUP FORM */}

      <form
        onSubmit={handleSignup}
        className="space-y-4"
      >
        {/* NAME */}

        <div className="relative">
          <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />

          <input
            type="text"
            required
            placeholder="Full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-white/5 border border-border rounded-xl2 pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-hover"
          />
        </div>

        {/* EMAIL */}

        <div className="relative">
          <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />

          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/5 border border-border rounded-xl2 pl-11 pr-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-hover"
          />
        </div>

        {/* PASSWORD */}

        <div className="relative">
          <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />

          <input
            type={
              showPw
                ? "text"
                : "password"
            }
            required
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/5 border border-border rounded-xl2 pl-11 pr-11 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-hover"
          />

          <button
            type="button"
            onClick={() =>
              setShowPw((prev) => !prev)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
          >
            {showPw ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* CREATE ACCOUNT */}

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
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

      {/* GOOGLE */}

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

        <span className="text-white/70 hover:text-white">
          Continue with Google
        </span>
      </Button>

      {/* LOGIN LINK */}

      <p className="text-center text-sm text-white/40 mt-8">
        Already have an account?{" "}

        <Link
          to="/login"
          className="text-hover hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}