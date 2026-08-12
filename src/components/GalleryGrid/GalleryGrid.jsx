import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Boxes, Truck, Home, Users, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import "./GalleryGrid.css";

const ICONS = {
  Packing: Package,
  Loading: Boxes,
  Transportation: Truck,
  Delivery: Home,
  "Our Team": Users,
};

export default function GalleryGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;
  const active = isOpen ? items[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );

  // Keyboard navigation + body scroll lock while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, showPrev, showNext]);

  return (
    <>
      <div className="gallery-grid">
        <AnimatePresence>
          {items.map((item, i) => {
            const Icon = ICONS[item.cat] || Package;
            return (
              <motion.figure
                layout
                key={item.label + i}
                className="gallery-tile"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => item.img && setActiveIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.label} full screen`}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && item.img) {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
              >
                {item.img ? (
                  <img className="gallery-tile__img" src={item.img} alt={item.label} loading="lazy" />
                ) : (
                  <div className="gallery-tile__visual">
                    <Icon size={34} strokeWidth={1.6} />
                  </div>
                )}
                <div className="gallery-tile__overlay">
                  <span className="gallery-tile__cat">{item.cat}</span>
                  <p>{item.label}</p>
                  <span className="gallery-tile__zoom"><ZoomIn size={16} /></span>
                </div>
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="gallery-lightbox__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <button
              type="button"
              className="gallery-lightbox__close"
              onClick={close}
              aria-label="Close full screen view"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={activeIndex}
                className="gallery-lightbox__figure"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <img className="gallery-lightbox__img" src={active.img} alt={active.label} />
                <figcaption className="gallery-lightbox__caption">
                  <span className="gallery-lightbox__cat">{active.cat}</span>
                  <p>{active.label}</p>
                  <span className="gallery-lightbox__count">
                    {activeIndex + 1} / {items.length}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}