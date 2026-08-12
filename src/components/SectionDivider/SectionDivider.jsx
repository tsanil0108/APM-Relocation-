import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ArrowRight } from "lucide-react";
import "./SectionDivider.css";

const ROAD_D =
  "M0 40 C 150 8, 250 72, 400 40 S 650 8, 800 40 S 950 62, 1000 40";

/**
 * Signature divider used between stacked page sections on the single-page
 * layout (Home -> About -> Services -> Branches -> Gallery -> Contact).
 * A curved "road" draws itself in as the user scrolls, with the brand truck
 * riding along it, and a "Next Stop" pill naming whichever section is
 * coming up — so every transition on the page reads like a leg of a trip.
 */
export default function SectionDivider({ next }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 25%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const truckLeft = useTransform(scrollYProgress, [0, 1], ["1%", "97%"]);
  const truckTilt = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-6, 6, -6, 6, -2]);

  return (
    <div className="section-divider" ref={ref}>
      <div className="container section-divider__inner">
        <div className="section-divider__road">
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="section-divider__svg">
            <path d={ROAD_D} className="section-divider__ghost" />
            <motion.path d={ROAD_D} className="section-divider__line" style={{ pathLength }} />
          </svg>

          <motion.div className="section-divider__truck" style={{ left: truckLeft, rotate: truckTilt }}>
            <Truck size={17} strokeWidth={2.4} />
          </motion.div>
        </div>

        {next && (
          <motion.div
            className="section-divider__next"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="section-divider__next-label">Next Stop</span>
            <span className="section-divider__next-title">
              {next} <ArrowRight size={14} />
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}