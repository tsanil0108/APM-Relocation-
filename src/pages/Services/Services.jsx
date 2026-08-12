import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home, Briefcase, Building2, MapPin, Car, Package, Truck, Warehouse } from "lucide-react";
import PageHero from "../../components/PageHero/PageHero";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { SERVICES } from "../../data/content";
import "./Services.css";

const ICONS = { home: Home, briefcase: Briefcase, building: Building2, "map-pin": MapPin, car: Car, package: Package, truck: Truck, warehouse: Warehouse };

const scrollToContact = (e) => {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Complete relocation solutions for every move"
        desc="Professional packing, transportation, storage and relocation services across India — safe, fast and affordable, tailored to your needs."
      />

      <div className="container services-banner">
        <div className="services-banner__frame">
          <img
            className="services-banner__img"
            src="/images/services-banner.jpg"
            alt="APM Relocation truck ready for dispatch"
            width={1600}
            height={480}
          />
          <div className="services-banner__overlay" />
          <div className="services-banner__caption">
            <strong>{SERVICES.length} Services</strong>
            <span>One consultant, one written quote, zero surprises</span>
          </div>
        </div>
      </div>

      {/* QUICK NAV */}
      <div className="services-nav">
        <div className="container services-nav__row">
          {SERVICES.map((s) => {
            const NavIcon = ICONS[s.icon] || Package;
            return (
              <a key={s.id} href={`#${s.id}`} className="services-nav__pill">
                <NavIcon size={14} strokeWidth={2.2} />
                {s.title}
              </a>
            );
          })}
        </div>
      </div>

      <section className="section services-detail">
        <div className="services-detail__grain" />
        <div className="container">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Package;
            const reversed = i % 2 === 1;
            return (
              <motion.article
                id={s.id}
                key={s.id}
                className={`service-block ${reversed ? "service-block--reverse" : ""}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="service-block__visual">
                  <span className="service-block__tag">
                    {String(i + 1).padStart(2, "0")} — {String(SERVICES.length).padStart(2, "0")}
                  </span>

                  <img
                    className="service-block__img"
                    src={s.img}
                    alt={s.title}
                    width={800}
                    height={680}
                    loading="lazy"
                  />
                  <div className="service-block__gradient" />

                  {s.short && (
                    <p className="service-block__caption">{s.short}</p>
                  )}

                  <span className="service-block__seal">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="service-block__copy">
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                  <ul>
                    {s.points.map((pt) => (
                      <li key={pt}><CheckCircle2 size={17} /> {pt}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn btn-primary" onClick={scrollToContact}>
                    Get a Quote for {s.title} <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="section services-cta">
        <div className="services-cta__backdrop" />
        <div className="container services-cta__box">
          <SectionHeading
            align="center"
            light
            eyebrow="Not Sure Which Service You Need?"
            title="Talk to a relocation consultant — it's free"
            desc="Tell us what you're moving and where, and we'll send a transparent, written proposal within hours."
          />
          <a href="#contact" className="btn btn-light" onClick={scrollToContact}>Request Free Consultation <ArrowRight size={17} /></a>
        </div>
      </section>
    </>
  );
}