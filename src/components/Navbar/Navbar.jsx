import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY } from "../../data/content";
import "./Navbar.css";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "branches", label: "Branches" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Scrollspy: update the active navbar link as the user scrolls past each section
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px", // treat the middle band of the viewport as "current"
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__row">
        <a href="#home" className="nav__brand" onClick={goTo("home")}>
          <img className="nav__mark" src="/logo-mark.svg" alt={`${COMPANY.name} logo`} width={40} height={40} />
          <span className="nav__brand-text">
            <strong>{COMPANY.name}</strong>
            <small>{COMPANY.tagline} · Since {COMPANY.since}</small>
          </span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={goTo(l.id)}
              className={"nav__link" + (active === l.id ? " nav__link--active" : "")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <a href={`tel:${COMPANY.phone1}`} className="nav__phone">
            <Phone size={16} /> {COMPANY.phone1}
          </a>
          <a href="#contact" className="btn btn-primary nav__quote" onClick={goTo("contact")}>
            Get Free Quote
          </a>
        </div>

        <button className="nav__burger" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`nav__mobile ${open ? "nav__mobile--open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={goTo(l.id)} className="nav__mobile-link">
            {l.label}
          </a>
        ))}
        <a href={`tel:${COMPANY.phone1}`} className="btn btn-primary nav__mobile-cta">
          <Phone size={16} /> Call {COMPANY.phone1}
        </a>
      </div>
    </header>
  );
}