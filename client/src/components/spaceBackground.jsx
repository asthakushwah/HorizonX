import { motion } from "framer-motion";

// Stable random stars generated once
const stars = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

// Slow-floating "dust" particles for extra depth
const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 3 + 2,
  delay: Math.random() * 6,
  duration: Math.random() * 10 + 12,
  drift: Math.random() * 60 - 30,
}));

const shootingStars = [
  { top: "12%", left: "5%", delay: 1, duration: 1.6 },
  { top: "30%", left: "65%", delay: 5, duration: 1.4 },
  { top: "55%", left: "15%", delay: 9, duration: 1.5 },
  { top: "70%", left: "75%", delay: 13, duration: 1.7 },
];

export  default function SpaceBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0a0e2a_0%,_#000000_70%)]" />

      {/* Drifting, breathing nebula clouds */}
      <motion.div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-blue-600/20 blur-[160px]"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[15%] left-[15%] w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[140px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[130px]"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -40, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] rounded-full bg-blue-500/10 blur-[150px]"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Slowly rotating glowing planet */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.5), rgba(0,0,0,0.9) 70%)",
          boxShadow: "0 0 120px 40px rgba(59,130,246,0.15)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [1, 1.4, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Slow floating dust particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-blue-300/40 blur-[1px]"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.drift, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-px w-24 bg-gradient-to-r from-white via-white/80 to-transparent rounded-full"
          style={{ top: s.top, left: s.left, rotate: "-25deg" }}
          animate={{
            x: [0, 350],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 7,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Fade to black at bottom so it blends with rest of page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
}