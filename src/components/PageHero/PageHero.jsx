import { motion } from "framer-motion";
import { MapPin, PackageCheck, Truck } from "lucide-react";
import "./PageHero.css";

const ROUTE_STEPS = [
  { icon: MapPin, label: "Pickup" },
  { icon: Truck, label: "In Transit" },
  { icon: PackageCheck, label: "Delivered" },
];

export default function PageHero({ eyebrow, title, desc, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__grain" />
      <div className="container page-hero__inner">
        <motion.span
          className="eyebrow page-hero__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          {title}
        </motion.h1>
        {desc && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
          >
            {desc}
          </motion.p>
        )}
        {children}
      </div>

      {/* Signature: the hero's own route — pickup to delivery, spelled out
          as a literal, animated shipment path instead of a decorative line. */}
      <motion.div
        className="hero-route"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container hero-route__inner">
          <div className="hero-route__track">
            <div className="hero-route__line" />
            <motion.div
              className="hero-route__truck"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
            >
              <Truck size={16} strokeWidth={2.4} />
            </motion.div>

            {ROUTE_STEPS.map((step, i) => (
              <div
                className="hero-route__stop"
                key={step.label}
                style={{ left: `${(i / (ROUTE_STEPS.length - 1)) * 100}%` }}
              >
                <span className="hero-route__dot">
                  <step.icon size={14} strokeWidth={2.2} />
                </span>
                <span className="hero-route__label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}