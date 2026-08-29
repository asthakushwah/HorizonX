import { missions } from "../assets/missionsData";
import MissionCard from "../components/MissionCard";

export default function Missions() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-widest text-hover mb-3">Missions</p>
        <h1 className="font-display text-4xl font-semibold mb-3">
          The mission archive
        </h1>
        <p className="text-white/50 max-w-xl mx-auto">
          From the first Moon landing to the telescopes probing the edge of
          time — click any mission for the full story.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {missions.map((m, i) => (
          <MissionCard key={m.id} mission={m} delay={i * 0.06} />
        ))}
      </div>
    </div>
  );
}
