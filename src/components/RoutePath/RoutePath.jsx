import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Truck } from "lucide-react";
import "./RoutePath.css";

/**
 * Signature element: a hand-drawn dashed "route" that reveals on scroll
 * with a truck travelling along it — the visual thesis of a relocation brand.
 */
export default function RoutePath({ flat = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const truckOffset = useTransform(scrollYProgress, [0, 1], ["0%", "96%"]);

  const d = flat
    ? "M2 30 Q 150 30 300 30 T 598 30"
    : "M2 60 C 100 10, 200 110, 300 60 S 500 10, 598 60";

  return (
    <div className="route-path" ref={ref}>
      <svg viewBox="0 0 600 90" fill="none" preserveAspectRatio="none">
        <path d={d} className="route-path__ghost" />
        <motion.path d={d} className="route-path__line" style={{ pathLength }} />
      </svg>
      <motion.div className="route-path__truck" style={{ left: truckOffset }}>
        <Truck size={22} strokeWidth={2.4} />
      </motion.div>
    </div>
  );
}
