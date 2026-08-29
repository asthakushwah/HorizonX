import { Link } from "react-router-dom";
import { Rocket, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* HorizonX */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <Rocket className="w-5 h-5" />

            <span className="font-display font-semibold text-lg">
              Horizon<span className="text-hover">X</span>
            </span>
          </Link>

          <p className="text-sm text-white/50 max-w-xs">
            Your window to the universe — an interactive NASA gallery for
            explorers of every kind.
          </p>
        </div>


        {/* Explore */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-3 text-white/80">
            Explore
          </h4>

          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <Link
                to="/solar-system"
                className="hover:text-hover transition"
              >
                Solar System
              </Link>
            </li>

            <li>
              <Link
                to="/mars-rover"
                className="hover:text-hover transition"
              >
                Mars Rover
              </Link>
            </li>

            <li>
              <Link
                to="/missions"
                className="hover:text-hover transition"
              >
                Missions
              </Link>
            </li>

            <li>
              <Link
                to="/timeline"
                className="hover:text-hover transition"
              >
                Timeline
              </Link>
            </li>
          </ul>
        </div>


        {/* Did You Know */}
        <div>
          <h4 className="font-display text-sm font-semibold mb-3 text-white/80 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Did You Know?
          </h4>

          <div className="border border-white/10 rounded-xl p-4 bg-white/[0.02]">
            <p className="text-xs uppercase tracking-widest text-hover mb-2">
              Space Fact
            </p>

            <p className="text-sm text-white/60 leading-6">
              A day on Venus is longer than a year on Venus.
            </p>

            <Link
              to="/solar-system"
              className="inline-block mt-3 text-sm text-white/70 hover:text-hover transition"
            >
              Discover more →
            </Link>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-border py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} HorizonX. Not affiliated with NASA. Built
        for exploration.
      </div>
    </footer>
  );
}