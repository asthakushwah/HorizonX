import { Outlet, Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import Starfield from "../components/Starfield";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg text-white px-5 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-bg/80" />
        <Starfield count={70} />
      </div>

      <Link to="/" className="flex items-center gap-2 mb-8">
        <Rocket className="w-6 h-6" />
        <span className="font-display font-semibold text-xl">
          Horizon<span className="text-hover">X</span>
        </span>
      </Link>

      <Outlet />
    </div>
  );
}
