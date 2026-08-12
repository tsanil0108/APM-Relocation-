import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { COMPANY } from "../../data/content";
import "./Footer.css";

const SocialIcon = ({ path }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d={path} />
  </svg>
);

const SOCIALS = [
  { label: "Facebook", path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12" },
  { label: "Instagram", path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2m0 1.8c-2.67 0-2.99.01-4.04.06-.97.04-1.5.2-1.85.34-.46.18-.79.4-1.14.75-.35.35-.57.68-.75 1.14-.14.35-.3.88-.34 1.85C3.83 9 3.82 9.33 3.82 12s.01 3 .06 4.04c.04.98.2 1.5.34 1.86.18.46.4.79.75 1.14.35.35.68.57 1.14.75.35.14.88.3 1.85.34 1.05.05 1.37.06 4.04.06s3-.01 4.04-.06c.98-.04 1.5-.2 1.86-.34.46-.18.79-.4 1.14-.75.35-.35.57-.68.75-1.14.14-.35.3-.88.34-1.86.05-1.04.06-1.37.06-4.04s-.01-3-.06-4.04c-.04-.97-.2-1.5-.34-1.85a3.1 3.1 0 0 0-.75-1.14 3.1 3.1 0 0 0-1.14-.75c-.35-.14-.88-.3-1.86-.34C15 3.83 14.67 3.82 12 3.82m0 3.06a5.12 5.12 0 1 1 0 10.24 5.12 5.12 0 0 1 0-10.24m0 1.8a3.32 3.32 0 1 0 0 6.64 3.32 3.32 0 0 0 0-6.64m5.33-1.99a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0" },
  { label: "YouTube", path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81M9.6 15.6V8.4l6.27 3.6z" },
  { label: "LinkedIn", path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56z" },
];

const QUICK_LINKS = [
  { to: "home", label: "Home" },
  { to: "about", label: "About Us" },
  { to: "services", label: "Services" },
  { to: "branches", label: "Our Branches" },
  { to: "gallery", label: "Gallery" },
  { to: "contact", label: "Contact Us" },
];

const scrollToId = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const SERVICE_LINKS = [
  "Home Shifting", "Office Relocation", "Car Transportation", "Bike Transportation", "Loading & Unloading", "Storage & Warehousing",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cta">
        <div className="container footer__cta-row">
          <div>
            <h3>Ready to move? Let's plan it together.</h3>
            <p>Free consultation · No hidden charges · 20+ years of trusted moving experience.</p>
          </div>
          <a href="#contact" className="btn btn-light" onClick={scrollToId("contact")}>
            Get Free Quote <ArrowRight size={17} />
          </a>
        </div>
      </div>

      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <div className="footer__logo">
            <img className="footer__mark" src="/logo-mark.svg" alt={`${COMPANY.name} logo`} width={36} height={36} />
            <strong>{COMPANY.name}</strong>
          </div>
          <p>India's trusted packers &amp; movers, delivering safe, reliable and affordable relocation across the country since {COMPANY.since}.</p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a href="#" aria-label={s.label} key={s.label}>
                <SocialIcon path={s.path} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l.to}><a href={`#${l.to}`} onClick={scrollToId(l.to)}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Our Services</h4>
          <ul>
            {SERVICE_LINKS.map((s) => (
              <li key={s}><a href="#services" onClick={scrollToId("services")}>{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact Us</h4>
          <ul className="footer__contact">
            <li><Phone size={16} /> {COMPANY.phone1}</li>
            <li><Phone size={16} /> {COMPANY.phone2}</li>
            <li><Mail size={16} /> {COMPANY.email}</li>
            <li><MapPin size={16} /> {COMPANY.address}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-row">
          <span>© {new Date().getFullYear()} {COMPANY.name} Packers &amp; Movers. All rights reserved.</span>
          <span>Designed for a better moving experience.</span>
        </div>
      </div>
    </footer>
  );
}