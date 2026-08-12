import { motion } from "framer-motion";
import "./SectionHeading.css";

export default function SectionHeading({ eyebrow, title, desc, align = "left", light = false }) {
  return (
    <motion.div
      className={`section-heading section-heading--${align} ${light ? "section-heading--light" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </motion.div>
  );
}
