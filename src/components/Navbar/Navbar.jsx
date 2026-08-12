import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY } from "../../data/content";
import "./Navbar.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/branches", label: "Branches" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__row">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <img className="nav__mark" src="/logo-mark.svg" alt={`${COMPANY.name} logo`} width={40} height={40} />
          <span className="nav__brand-text">
            <strong>{COMPANY.name}</strong>
            <small>{COMPANY.tagline} · Since {COMPANY.since}</small>
          </span>
        </Link>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => "nav__link" + (isActive ? " nav__link--active" : "")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__cta">
          <a href={`tel:${COMPANY.phone1}`} className="nav__phone">
            <Phone size={16} /> {COMPANY.phone1}
          </a>
          <Link to="/contact" className="btn btn-primary nav__quote">Get Free Quote</Link>
        </div>

        <button className="nav__burger" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`nav__mobile ${open ? "nav__mobile--open" : ""}`}>
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className="nav__mobile-link">
            {l.label}
          </NavLink>
        ))}
        <a href={`tel:${COMPANY.phone1}`} className="btn btn-primary nav__mobile-cta">
          <Phone size={16} /> Call {COMPANY.phone1}
        </a>
      </div>
    </header>
  );
}
