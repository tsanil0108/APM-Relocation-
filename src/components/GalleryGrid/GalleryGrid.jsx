import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Package,
  Boxes,
  Truck,
  Home,
  Users,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react";

import "./GalleryGrid.css";

const ICONS = {
  Packing: Package,
  Loading: Boxes,
  Transportation: Truck,
  Delivery: Home,
  "Our Team": Users,
};

export default function GalleryGrid({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen =
    activeIndex !== null &&
    items.length > 0 &&
    Boolean(items[activeIndex]);

  const active = isOpen ? items[activeIndex] : null;

  const openImage = useCallback(
    (index) => {
      if (!items[index]?.img) return;

      setActiveIndex(index);
    },
    [items]
  );

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    if (!items.length) return;

    setActiveIndex((current) => {
      if (current === null) return 0;

      return (current - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    if (!items.length) return;

    setActiveIndex((current) => {
      if (current === null) return 0;

      return (current + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        close();
      }

      if (event.key === "ArrowLeft") {
        showPrev();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyboard);

      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, showPrev, showNext]);

  return (
    <>
      <motion.div layout className="gallery-grid">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const Icon = ICONS[item.cat] || Package;

            return (
              <motion.article
                layout
                key={`${item.label}-${index}`}
                className={`gallery-card ${
                  item.img ? "gallery-card--clickable" : ""
                }`}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 12,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.38,
                  delay: Math.min(index * 0.04, 0.22),
                }}

                /* =========================
                   DESKTOP — HOVER TO OPEN
                ========================== */
                onMouseEnter={() => {
                  const canHover = window.matchMedia(
                    "(hover: hover) and (pointer: fine)"
                  ).matches;

                  if (canHover && item.img) {
                    openImage(index);
                  }
                }}

                /* =========================
                   MOBILE — TAP TO OPEN
                ========================== */
                onClick={() => {
                  const touchDevice = window.matchMedia(
                    "(hover: none)"
                  ).matches;

                  if (touchDevice && item.img) {
                    openImage(index);
                  }
                }}

                onKeyDown={(event) => {
                  if (
                    item.img &&
                    (event.key === "Enter" ||
                      event.key === " ")
                  ) {
                    event.preventDefault();

                    openImage(index);
                  }
                }}
                role={item.img ? "button" : undefined}
                tabIndex={item.img ? 0 : -1}
                aria-label={
                  item.img
                    ? `Open ${item.label}`
                    : undefined
                }
              >
                <div className="gallery-card__media">
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.label}
                      className="gallery-card__image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="gallery-card__placeholder">
                      <Icon
                        size={42}
                        strokeWidth={1.5}
                      />

                      <span>{item.cat}</span>
                    </div>
                  )}

                  <div className="gallery-card__shade" />

                  <div className="gallery-card__top">
                    <span className="gallery-card__category">
                      {item.cat}
                    </span>

                    {item.img && (
                      <span className="gallery-card__expand">
                        <Expand size={16} />
                      </span>
                    )}
                  </div>

                  <div className="gallery-card__content">
                    <p className="gallery-card__small">
                      APM RELOCATION
                    </p>

                    <h3>{item.label}</h3>

                    {item.img && (
                      <div className="gallery-card__view">
                        <span className="gallery-card__view-icon">
                          <ZoomIn size={15} />
                        </span>

                        <span>View Image</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ===================================================
          FULL SCREEN GALLERY
      =================================================== */}

      <AnimatePresence>
        {isOpen && active && (
          <motion.div
            className="gallery-lightbox"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={close}
          >
            {/* TOP BAR */}

            <div className="gallery-lightbox__topbar">
              <div className="gallery-lightbox__info">
                <span>
                  {active.cat}
                </span>

                <strong>
                  {active.label}
                </strong>
              </div>

              <button
                type="button"
                className="gallery-lightbox__close"
                onClick={(event) => {
                  event.stopPropagation();
                  close();
                }}
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>
            </div>

            {/* PREVIOUS */}

            {items.length > 1 && (
              <button
                type="button"
                className="
                  gallery-lightbox__nav
                  gallery-lightbox__nav--prev
                "
                onClick={(event) => {
                  event.stopPropagation();

                  showPrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={25} />
              </button>
            )}

            {/* IMAGE */}

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${active.img}`}
                className="gallery-lightbox__stage"
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <img
                  src={active.img}
                  alt={active.label}
                  className="gallery-lightbox__image"
                />

                <div className="gallery-lightbox__caption">
                  <div>
                    <span className="gallery-lightbox__category">
                      {active.cat}
                    </span>

                    <h3>
                      {active.label}
                    </h3>
                  </div>

                  <span className="gallery-lightbox__counter">
                    {String(
                      activeIndex + 1
                    ).padStart(2, "0")}

                    <i />

                    {String(
                      items.length
                    ).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* NEXT */}

            {items.length > 1 && (
              <button
                type="button"
                className="
                  gallery-lightbox__nav
                  gallery-lightbox__nav--next
                "
                onClick={(event) => {
                  event.stopPropagation();

                  showNext();
                }}
                aria-label="Next image"
              >
                <ChevronRight size={25} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}