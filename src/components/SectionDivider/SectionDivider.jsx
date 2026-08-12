import { motion } from "framer-motion";
import { MapPin, ArrowRight, Truck } from "lucide-react";
import "./SectionDivider.css";

export default function SectionDivider({
  next = "Gallery",
  onClick,
}) {
  return (
    <section className="move-divider">
      <div className="move-divider__inner">

        <div className="move-divider__skyline" />

        <div className="move-divider__from">
          <div className="move-divider__pin">
            <MapPin size={24} strokeWidth={2.4} />
          </div>
          <span>FROM</span>
          <strong>Where We Are</strong>
        </div>

        <div className="move-divider__to">
          <div className="move-divider__pin">
            <MapPin size={24} strokeWidth={2.4} />
          </div>
          <span>TO</span>
          <strong>Where We Go</strong>
        </div>

        <div className="move-divider__road-wrap">
          <svg
            className="move-divider__road"
            viewBox="0 0 1600 210"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="road-shadow"
              d="
                M -20 95
                C 140 155, 220 60, 390 112
                C 530 160, 650 60, 810 103
                C 960 150, 1080 72, 1250 112
                C 1380 145, 1490 72, 1620 100
              "
            />

            <path
              className="road-main"
              d="
                M -20 95
                C 140 155, 220 60, 390 112
                C 530 160, 650 60, 810 103
                C 960 150, 1080 72, 1250 112
                C 1380 145, 1490 72, 1620 100
              "
            />

            <path
              className="road-middle"
              d="
                M -20 95
                C 140 155, 220 60, 390 112
                C 530 160, 650 60, 810 103
                C 960 150, 1080 72, 1250 112
                C 1380 145, 1490 72, 1620 100
              "
            />
          </svg>

          <motion.div
            className="move-divider__truck"
            initial={{ x: "-15%", y: 0 }}
            whileInView={{ x: "55%" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 2.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="move-divider__truck-card">
              <img
                src="/images/hero-truck.jpg"
                alt="APM Relocation moving truck"
              />
            </div>
          </motion.div>

          <div className="move-divider__road-point move-divider__road-point--left" />
          <div className="move-divider__road-point move-divider__road-point--right" />
        </div>

        <motion.div
          className="move-divider__cta-area"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.15,
            duration: 0.55,
          }}
        >
          <div className="move-divider__eyebrow">
            <span />
            READY FOR THE NEXT MOVE?
            <span />
          </div>

          <button
            type="button"
            className="move-divider__next"
            onClick={onClick}
          >
            <span className="move-divider__next-icon">
              <ArrowRight size={20} />
            </span>

            <span className="move-divider__next-label">
              NEXT STOP
            </span>

            <span className="move-divider__separator" />

            <strong>{next}</strong>

            <span className="move-divider__dots">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </button>

          <div className="move-divider__mini-route">
            <MapPin size={17} />

            <span className="move-divider__mini-line" />

            <span className="move-divider__mini-truck">
              <Truck size={22} />
            </span>

            <span className="move-divider__mini-line" />

            <MapPin size={17} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}