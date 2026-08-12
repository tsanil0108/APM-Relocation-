import { motion } from "framer-motion";
import { Home, Briefcase, Building2, MapPin, Car, Package, Truck, Warehouse, ArrowUpRight } from "lucide-react";
import "./ServiceCard.css";

const ICONS = {
  home: Home,
  briefcase: Briefcase,
  building: Building2,
  "map-pin": MapPin,
  car: Car,
  package: Package,
  truck: Truck,
  warehouse: Warehouse,
};

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICONS[service.icon] || Package;
  return (
    <motion.article
      className={`service-card ${service.img ? "service-card--media" : ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -8 }}
    >
      {service.img && (
        <div className="service-card__media">
          <img src={service.img} alt={service.title} loading="lazy" />
        </div>
      )}
      <div className="service-card__icon">
        <Icon size={26} strokeWidth={2} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <a
        href="#services"
        className="service-card__link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        Learn more <ArrowUpRight size={16} />
      </a>
    </motion.article>
  );
}