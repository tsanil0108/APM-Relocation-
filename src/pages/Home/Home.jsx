import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Star,
  MapPin,
  Truck,
  ChevronDown,
  Package,
  Users,
  ClipboardList,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import Stats from "../../components/Stats/Stats";
import Testimonials from "../../components/Testimonials/Testimonials";
import { COMPANY, CORE_PROMISES, SERVICES, PROCESS_STEPS, CLIENTS } from "../../data/content";
import "./Home.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

// Image showcase slideshow — shown uncropped (object-fit: contain) so the
// full photo is always clearly visible, whatever its aspect ratio
const HERO_SLIDES = [
  { src: "/images/hero-truck-road-pin.jpg" },
  { src: "/images/hero-loading-building.jpg" },
  { src: "/images/hero-office-signage.jpg" },
  { src: "/images/hero-truck-drone-city.jpg" },
  { src: "/images/hero-truck-night.jpg" },
];

const SLIDE_DURATION = 5000; // ms between background changes

const MOVE_TYPES = ["Home Shifting", "Office Relocation", "Vehicle Transportation", "Storage & Warehousing"];
const MOVE_SIZES = ["1 RK / 1 BHK", "2 BHK", "3 BHK", "4+ BHK / Villa", "Small Office", "Large Office"];

// Icon + accent per process step, matched by position to PROCESS_STEPS in content.js
const PROCESS_ICONS = [PhoneCall, ClipboardList, Package, Truck, PackageCheck];

export default function Home() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [form, setForm] = useState({
    moveType: "",
    from: "",
    to: "",
    size: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const networkWords = useMemo(() => NETWORK_WORDS, []);

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/contact", { state: { quote: form } });
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__glow hero__glow--yellow" />
        <div className="hero__glow hero__glow--clay" />
        <div className="hero__grain" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <motion.span className="eyebrow" initial="hidden" animate="show" custom={0} variants={fadeUp}>
              <Sparkles size={14} /> Since {COMPANY.since} · Pan-India Movers
            </motion.span>

            <motion.h1 initial="hidden" animate="show" custom={1} variants={fadeUp}>
              We move your <span className="hero__highlight">whole world</span>,
              <br /> not just your boxes.
            </motion.h1>

            <motion.p className="hero__desc" initial="hidden" animate="show" custom={2} variants={fadeUp}>
              Local, domestic and international shifting experts — safe, reliable, time-bound
              and scratch-free. From a single carton to a full office, we handle every mile
              of the journey.
            </motion.p>

            <motion.div className="hero__actions" initial="hidden" animate="show" custom={3} variants={fadeUp}>
              <a href="#quote" className="btn btn-primary">
                Get Free Quote <ArrowRight size={17} />
              </a>
              <a href={`tel:${COMPANY.phone1}`} className="btn btn-outline">
                <PhoneCall size={17} /> {COMPANY.phone1}
              </a>
            </motion.div>

            <motion.div className="hero__rating" initial="hidden" animate="show" custom={4} variants={fadeUp}>
              <div className="hero__avatars">
                <span className="hero__avatar hero__avatar--1">R</span>
                <span className="hero__avatar hero__avatar--2">S</span>
                <span className="hero__avatar hero__avatar--3">A</span>
                <span className="hero__avatar hero__avatar--4">+</span>
              </div>
              <div className="hero__rating-divider" />
              <div className="hero__rating-text">
                <div className="hero__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                  <strong className="hero__rating-score">4.8/5</strong>
                </div>
                <span>1,200+ happy customers moved</span>
              </div>
            </motion.div>
          </div>

          {/* IMAGE SHOWCASE — full image visible, no crop-cover overlay */}
          <motion.div
            className="hero__visual-col"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="hero__visual">
              <div className="hero__badge hero__badge--1">
                <span className="hero__badge-icon">
                  <ShieldCheck size={16} />
                </span>
                <span className="hero__badge-text">
                  <strong>99%</strong>
                  <small>Safe Deliveries</small>
                </span>
              </div>
              <div className="hero__badge hero__badge--2">
                <span className="hero__badge-icon">
                  <Clock size={16} />
                </span>
                <span className="hero__badge-text">
                  <strong>On-Time</strong>
                  <small>Always</small>
                </span>
              </div>

              <div className="hero__frame">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={HERO_SLIDES[activeSlide].src}
                    src={HERO_SLIDES[activeSlide].src}
                    alt="APM Relocation branded truck"
                    className="hero__frame-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                <div className="hero__frame-fade" />
                <div className="hero__frame-chip">
                  <Users size={14} /> 50,000+ Happy Movers
                </div>
              </div>
            </div>

            <div className="hero__dots">
              {HERO_SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  className={`hero__dot ${i === activeSlide ? "is-active" : ""}`}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="hero__marquee">
          <div className="hero__marquee-track">
            {[...networkWords, ...networkWords].map((w, i) => (
              <span key={i}>
                {w} <i>•</i>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE STRIP — sits below hero, never covers the image */}
      <section className="quote-strip" id="quote">
        <div className="container">
          <motion.div
            className="quote-strip__card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="quote-strip__head">
              <Truck size={20} />
              <h3>Get Instant Moving Quote</h3>
            </div>

            <form className="quote-strip__form" onSubmit={handleSubmit}>
              <label className="hero__field">
                <span>Moving Type</span>
                <div className="hero__select-wrap">
                  <Truck size={15} className="hero__select-lead" />
                  <select value={form.moveType} onChange={handleChange("moveType")} required>
                    <option value="" disabled>
                      Select move type
                    </option>
                    {MOVE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="hero__select-icon" />
                </div>
              </label>

              <label className="hero__field">
                <span>From</span>
                <div className="hero__input-wrap">
                  <MapPin size={15} />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    value={form.from}
                    onChange={handleChange("from")}
                    required
                  />
                </div>
              </label>

              <label className="hero__field">
                <span>To</span>
                <div className="hero__input-wrap">
                  <MapPin size={15} />
                  <input
                    type="text"
                    placeholder="Enter drop location"
                    value={form.to}
                    onChange={handleChange("to")}
                    required
                  />
                </div>
              </label>

              <label className="hero__field">
                <span>Move Size</span>
                <div className="hero__select-wrap">
                  <select value={form.size} onChange={handleChange("size")} required>
                    <option value="" disabled>
                      Select size
                    </option>
                    {MOVE_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="hero__select-icon" />
                </div>
              </label>

              <motion.button
                type="submit"
                className="btn btn-primary quote-strip__submit"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Quote Now <ArrowRight size={16} />
              </motion.button>
            </form>
            <p className="quote-strip__note">Free · No Obligation · 100% Secure</p>
          </motion.div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="promises">
        <div className="container promises__grid">
          {CORE_PROMISES.map((p, i) => (
            <motion.div
              key={p.title}
              className="promise-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="promise-card__num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-preview">
        <div className="container">
          <div className="services-preview__head">
            <SectionHeading
              eyebrow="What We Offer"
              title="End-to-end relocation, handled with care"
              desc="From a single room to a full commercial fleet move — explore the services that make APM Relocation India's dependable moving partner."
            />
            <Link to="/services" className="btn btn-outline services-preview__all">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="services-preview__grid">
            {SERVICES.slice(0, 6).map((s, i) => (
              <ServiceCard service={s} key={s.id} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Stats variant="dark" />

      {/* PROCESS */}
      <section className="section process">
        <div className="process__glow" />
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title="Your move, mapped out"
            desc="A clear, honest process from the first call to the last box unpacked."
          />

          <div className="process-flow">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = PROCESS_ICONS[i % PROCESS_ICONS.length];
              const isLast = i === PROCESS_STEPS.length - 1;
              return (
                <div className="process-flow__item" key={s.step}>
                  <motion.div
                    className="process-flow__card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                    whileHover={{ y: -6 }}
                  >
                    <span className="process-flow__num">{s.step}</span>
                    <span className="process-flow__icon">
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </motion.div>

                  {!isLast && (
                    <motion.div
                      className="process-flow__connector"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 60 24" preserveAspectRatio="none" className="process-flow__connector-svg">
                        <path d="M0 12 H46" />
                        <path d="M40 5 L48 12 L40 19" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          <motion.div
            className="process-flow__finish"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle2 size={18} />
            <span>Delivered on time, exactly as promised — every single move.</span>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="testimonials-section__grain" />
        <div className="container">
          <SectionHeading align="center" light eyebrow="Customer Stories" title="Trusted by thousands of happy movers" />
          <Testimonials />
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section clients">
        <div className="container">
          <p className="clients__label">Trusted by leading organisations across India</p>
          <div className="clients__row">
            {CLIENTS.map((c) => (
              <span key={c} className="clients__item">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const NETWORK_WORDS = [
  "Mumbai",
  "Delhi",
  "Bangaluru",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];