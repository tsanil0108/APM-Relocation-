import { motion } from "framer-motion";
import { MapPin, Building2 } from "lucide-react";
import { COMPANY } from "../../data/content";
import "./BranchCard.css";

export default function BranchCard({ branch, index = 0 }) {
  return (
    <motion.div
      className="branch-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6 }}
    >
      {branch.img && (
        <div className="branch-card__media">
          <img src={branch.img} alt={`${branch.city} — ${COMPANY.name}`} loading="lazy" />
          <div className="branch-card__media-gradient" />
          <span className="branch-card__brand">
            <span className="branch-card__brand-mark">{COMPANY.name.charAt(0)}</span>
            {COMPANY.name}
          </span>
        </div>
      )}
      <div className="branch-card__body">
        <div className="branch-card__top">
          <span className="branch-card__icon">
            {index === 0 ? <Building2 size={18} /> : <MapPin size={18} />}
          </span>
          <span className="branch-card__tag">{branch.tag}</span>
        </div>
        <h3>{branch.city}</h3>
        <p>{branch.address}</p>
        <span className="branch-card__since">
          {COMPANY.tagline} · Since {COMPANY.since}
        </span>
      </div>
    </motion.div>
  );
}