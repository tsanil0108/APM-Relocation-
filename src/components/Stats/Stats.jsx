import { motion } from "framer-motion";
import AnimatedCounter from "../AnimatedCounter/AnimatedCounter";
import { STATS } from "../../data/content";
import "./Stats.css";

export default function Stats({ variant = "dark" }) {
  return (
    <div className={`stats stats--${variant}`}>
      <div className="container stats__row">
        {STATS.map((s, i) => (
          <motion.div
            className="stats__item"
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <strong>
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </strong>
            <span>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
