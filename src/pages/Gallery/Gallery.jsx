import { useState, useMemo } from "react";
import PageHero from "../../components/PageHero/PageHero";
import GalleryGrid from "../../components/GalleryGrid/GalleryGrid";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../../data/content";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState("All");

  const items = useMemo(
    () => (active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.cat === active)),
    [active]
  );

  return (
    <>
      <PageHero
        eyebrow="Our Gallery"
        title="Moments that move us forward"
        desc="A glimpse of our packing, loading, transportation and delivery moments across India."
      />

      <section className="section gallery-page">
        <div className="container">
          <div className="gallery-page__banner">
            <img
              className="gallery-page__banner-img"
              src="/images/services-move.jpg"
              alt="APM Relocation crew at work"
              width={1536}
              height={1024}
            />
          </div>
          <div className="gallery-page__filters">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`gallery-page__filter ${active === cat ? "active" : ""}`}
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
