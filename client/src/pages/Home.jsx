import { Globe2, Rocket, Earth, Archive } from "lucide-react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    icon: Globe2,
    title: "Solar System",
    description: "Spin through interactive planets, moons, and orbital facts.",
    to: "/solar-system",
  },
  {
    icon: Rocket,
    title: "Mars Rover",
    description: "Browse thousands of images captured by NASA's rover fleet.",
    to: "/mars-rover",
  },
  {
    icon: Earth,
    title: "Earth from Space",
    description: "See our planet the way astronauts do — from orbit.",
    to: "/earth",
  },
  {
    icon: Archive,
    title: "Mission Archive",
    description: "Apollo, Artemis, Voyager and every landmark mission since.",
    to: "/missions",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-hover mb-3">
            Explore
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Four ways into the cosmos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.08} />
          ))}
        </div>
      </section>
    </div>
  );
}
