import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeatureCard({ icon: Icon, title, description, to, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-6 rounded-xl2 border border-border bg-card card-glow overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-hover/0 group-hover:bg-hover/10 rounded-full blur-3xl transition-all duration-500" />
      <div className="w-12 h-12 rounded-xl2 border border-border flex items-center justify-center mb-5 group-hover:border-hover transition-colors">
        <Icon className="w-6 h-6 text-white group-hover:text-hover transition-colors" />
      </div>
      <h3 className="font-display text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/50 mb-5 leading-relaxed">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-1.5 text-sm text-white/80 group-hover:text-hover transition-colors"
      >
        Open <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
