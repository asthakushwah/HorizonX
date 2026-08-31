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