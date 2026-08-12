import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/content";
import "./Testimonials.css";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  const go = (dir) => {
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="testimonials">
      <div className="testimonials__quote-icon">
        <Quote size={48} strokeWidth={1.5} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="testimonials__card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="testimonials__stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={17} fill={i < Math.round(t.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <p>&ldquo;{t.quote}&rdquo;</p>
          <div className="testimonials__author">
            <span className="testimonials__avatar">{t.name.charAt(0)}</span>
            <div>
              <strong>{t.name}</strong>
              <small>{t.city}</small>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="testimonials__controls">
        <button onClick={() => go(-1)} aria-label="Previous testimonial">
          <ChevronLeft size={20} />
        </button>
        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next testimonial">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
