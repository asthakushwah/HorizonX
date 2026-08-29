import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Menu, X, User, LogOut } from "lucide-react";
import useScrolled from "../hooks/useScrolled";
import { classNames } from "../utils/helpers";

const links = [
  { to: "/", label: "Home" },
  { to: "/solar-system", label: "Solar System" },
  { to: "/mars-rover", label: "Mars Rover" },
  { to: "/earth", label: "Earth" },
  { to: "/asteroids", label: "Asteroids" },
  { to: "/timeline", label: "Timeline" },
  { to: "/missions", label: "Missions" },
  { to: "/constellation", label: "Constellation" },
  { to: "/ai-assistant", label: "AI Assistant" },
  { to: "/collections", label: "Collections" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const scrolled = useScrolled(10);
  const navigate = useNavigate();

  // Get logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        setUser(null);
      }
    }
  }, []);

  // Update navbar when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setOpen(false);

    navigate("/login");
  };

  // Get user's first letter
  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <header
      className={classNames(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto h-20 px-8 flex items-center gap-8">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="flex items-center gap-2 flex-shrink-0 group relative"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.15, rotate: 15 }}
          >
            <Rocket className="w-9 h-9 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
          </motion.div>

          <motion.span
            className="text-4xl font-extrabold tracking-tight text-white relative"
            animate={{
              textShadow: [
                "0 0 8px rgba(59,130,246,0.25)",
                "0 0 20px rgba(59,130,246,0.55)",
                "0 0 8px rgba(59,130,246,0.25)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          >
            Horizon
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] inline-block"
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              X
            </motion.span>
          </motion.span>
        </Link>

        {/* ================= DESKTOP LINKS ================= */}

        <div className="hidden lg:flex flex-1 justify-center items-center gap-2 ml-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                classNames(
                  "px-3 py-2 rounded-full text-sm transition-all duration-300",
                  isActive
                    ? "bg-white text-black"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ================= DESKTOP AUTH ================= */}

        <div className="hidden lg:flex items-center gap-3 flex-shrink-0 ml-6">

          {user ? (
            <>
              {/* Profile Avatar */}

              <Link
                to="/profile"
                className="group relative"
                title={user.name || "Profile"}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-400/50 group-hover:border-blue-400 transition-all duration-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold border-2 border-blue-400/50 group-hover:scale-105 transition-all duration-300">
                    {userInitial}
                  </div>
                )}
              </Link>

              {/* Logout */}

              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}

        <button
          className="lg:hidden ml-auto p-2 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* ================= MOBILE NAV ================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-border"
          >
            <div className="flex flex-col p-4 gap-1">

              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    classNames(
                      "px-4 py-3 rounded-lg text-sm transition-colors duration-300",
                      isActive
                        ? "bg-white text-black"
                        : "text-white/70 hover:bg-card hover:text-white"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* ================= MOBILE USER ================= */}

              {user ? (
                <div className="mt-2 pt-3 border-t border-border">

                  {/* Profile */}

                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {userInitial}
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">
                        {user.name || "User"}
                      </p>

                      <p className="text-xs text-white/40">
                        View Profile
                      </p>
                    </div>

                    <User className="w-4 h-4 text-white/40" />
                  </Link>

                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>

                </div>
              ) : (
                /* ================= MOBILE LOGIN ================= */

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">

                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 px-4 py-3 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-center transition-all duration-300"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center hover:opacity-90"
                  >
                    Sign Up
                  </NavLink>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}