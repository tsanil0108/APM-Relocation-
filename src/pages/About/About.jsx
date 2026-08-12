import { motion } from "framer-motion";
import { ShieldCheck, Users2, Clock3, BadgeCheck, HeartHandshake, Lightbulb, Target, Quote, ArrowRight } from "lucide-react";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Stats from "../../components/Stats/Stats";
import PageHero from "../../components/PageHero/PageHero";
import { COMPANY, JOURNEY } from "../../data/content";
import "./About.css";

const VALUES = [
  { icon: Users2, title: "Customer First", desc: "We prioritize customer satisfaction in every interaction, every decision, every move." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest, transparent and ethical principles guide all our business dealings." },
  { icon: BadgeCheck, title: "Excellence", desc: "We pursue excellence with meticulous attention to detail in every relocation." },
  { icon: ShieldCheck, title: "Safety", desc: "Protecting your belongings with the highest safety standards, always." },
  { icon: HeartHandshake, title: "Teamwork", desc: "Strong collaborative teams deliver consistently superior results together." },
  { icon: Lightbulb, title: "Innovation", desc: "Adopting modern technology to streamline and enhance relocation experiences." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About APM Relocation"
        title="Moving Lives. Delivering Trust."
        desc="India's most trusted relocation partner, delivering safe, reliable and affordable moving solutions for homes, offices and vehicles across the country."
      />

      {/* INTRO SECTION */}
      <section className="section about-intro">
        <div className="container">
          <div className="about-intro__grid">
            <motion.div
              className="about-intro__text"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="eyebrow">Who We Are</span>
              <h2>A Legacy of Trust &amp; Excellence</h2>
              <p>
                We are {COMPANY.name}, a professional packers and movers company built on the foundation of reliability, safety, and customer satisfaction. With years of experience, we've perfected the art of relocation—from packing your goods with precision, to transporting them safely, to setting up your new space exactly as you envision it.
              </p>
              <p>
                Operating 24/7 across India, our team combines state-of-the-art equipment with trained professionals to ensure every move is smooth, stress-free, and completed on time—no matter the complexity.
              </p>

              <motion.div
                className="about-intro__badges"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.span className="about-intro__badge" variants={itemVariants}>
                  <ShieldCheck size={16} strokeWidth={2} />
                  <div>
                    <strong>100% Safe</strong>
                    <span>Full coverage insured</span>
                  </div>
                </motion.span>
                <motion.span className="about-intro__badge" variants={itemVariants}>
                  <Clock3 size={16} strokeWidth={2} />
                  <div>
                    <strong>On-Time</strong>
                    <span>Never delayed delivery</span>
                  </div>
                </motion.span>
                <motion.span className="about-intro__badge" variants={itemVariants}>
                  <Target size={16} strokeWidth={2} />
                  <div>
                    <strong>Transparent</strong>
                    <span>No hidden charges</span>
                  </div>
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.div
              className="about-intro__visual"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="about-intro__frame">
                <div className="about-intro__gradient" />
                <img
                  className="about-intro__scene"
                  src="/images/about-move.jpg"
                  alt="APM Relocation crew executing a professional move"
                  width={1600}
                  height={773}
                />
                <div className="about-intro__overlay" />
                <div className="about-intro__stat">
                  <strong>Est. {COMPANY.since}</strong>
                  <span>Pan-India Excellence</span>
                </div>
              </div>

              {/* Signature: a wax-seal style "verified consignment" stamp,
                  echoing the label you'd find on a sealed shipment. */}
              <motion.div
                className="about-intro__seal"
                initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
              >
                <div className="about-intro__seal-inner">
                  <strong>VERIFIED</strong>
                  <span>Since {COMPANY.since}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="about-intro__divider" />
      </section>

      {/* STATS */}
      <Stats variant="light" />

      {/* JOURNEY TIMELINE */}
      <section className="section journey">
        <div className="journey__backdrop" />
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Our Journey"
            title="From Small Beginnings to Pan-India Leadership"
          />

          <motion.div
            className="journey__timeline"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {JOURNEY.map((j, i) => (
              <motion.div
                className="journey__item"
                key={j.year}
                variants={itemVariants}
              >
                <div className="journey__node">
                  <div className="journey__dot" />
                  <div className="journey__line" />
                </div>
                <div className="journey__content">
                  <div className="journey__year">{j.year}</div>
                  <p>{j.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="section values">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="What Drives Us"
            title="Core Values That Define Us"
          />

          <motion.div
            className="values__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="value-card"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="value-card__header">
                  <span className="value-card__icon">
                    <v.icon size={24} strokeWidth={1.6} />
                  </span>
                  <span className="value-card__index">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM BANNER */}
      <section className="section team-banner">
        <div className="team-banner__backdrop" />

        <div className="container">
          <div className="team-banner__grid">
            <motion.div
              className="team-banner__image"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="team-banner__frame">
                <img
                  src="/images/gallery-team-group.jpg"
                  alt="APM Relocation trained and verified team"
                  width={900}
                  height={820}
                />
                <div className="team-banner__badge">
                  <Users2 size={16} strokeWidth={2} />
                  <span>500+ Trained Crew</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="team-banner__content"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="team-banner__accent">
                <Quote size={42} strokeWidth={1.2} />
              </div>
              <span className="eyebrow">Our People</span>
              <h2>Built on Trust. Powered by People.</h2>
              <p>
                Our dedicated team of moving experts ensures a smooth and stress-free relocation experience from start to finish. Every member is trained, verified, and uniformed—so you know exactly who's handling your most valuable belongings.
              </p>

              <div className="team-banner__stats">
                <motion.div
                  className="team-stat"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <strong>20+</strong>
                  <span>Years Experience</span>
                </motion.div>
                <motion.div
                  className="team-stat"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <strong>100+</strong>
                  <span>Cities Served</span>
                </motion.div>
                <motion.div
                  className="team-stat"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <strong>4.8/5</strong>
                  <span>Customer Rating</span>
                </motion.div>
              </div>

              <motion.a
                href="tel:+919876543210"
                className="btn btn-primary btn-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Meet Our Team
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}