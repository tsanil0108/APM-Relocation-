import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PageHero from "../../components/PageHero/PageHero";
import GalleryGrid from "../../components/GalleryGrid/GalleryGrid";

import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
} from "../../data/content";

import "./Gallery.css";

const BANNER_IMAGES = [
  "/images/services-move.jpg",
  "/images/hero-truck.jpg",
  "/images/hero-truck-road-pin.jpg",
  "/images/hero-truck-drone-city.jpg",
];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [bannerIndex, setBannerIndex] = useState(0);

  const items = useMemo(() => {
    return active === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(
          (item) => item.cat === active
        );
  }, [active]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex(
        (prev) =>
          (prev + 1) % BANNER_IMAGES.length
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our Gallery"
        title="Moments that move us forward"
        desc="A glimpse of our packing, loading, transportation and delivery moments across India."
      />

      <section className="section gallery-page">
        <div className="container">

          {/* =========================
              SMOOTH CHANGING BANNER
          ========================== */}

          <div className="gallery-page__banner">
            <AnimatePresence
              initial={false}
              mode="sync"
            >
              <motion.img
                key={BANNER_IMAGES[bannerIndex]}
                className="gallery-page__banner-img"
                src={BANNER_IMAGES[bannerIndex]}
                alt="APM Relocation"
                initial={{
                  opacity: 0,
                  scale: 1.04,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.02,
                }}
                transition={{
                  opacity: {
                    duration: 1.2,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 4.5,
                    ease: "linear",
                  },
                }}
              />
            </AnimatePresence>

            <div className="gallery-page__banner-overlay" />

            <div className="gallery-page__banner-content">
              <span>APM RELOCATION</span>

              <h2>
                Moving moments across India
              </h2>
            </div>

            <div className="gallery-page__banner-dots">
              {BANNER_IMAGES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={
                    index === bannerIndex
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setBannerIndex(index)
                  }
                  aria-label={`Show banner ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* =========================
              FILTERS
          ========================== */}

          <div className="gallery-page__filters">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-page__filter ${
                  active === cat ? "active" : ""
                }`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}