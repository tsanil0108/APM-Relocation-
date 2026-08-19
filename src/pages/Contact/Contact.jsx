import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero/PageHero";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { COMPANY, BRANCHES } from "../../data/content";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We're here to help you move"
        desc="Get in touch with our relocation experts for any queries, assistance or a free moving quote."
      />

      <section className="section contact-info-strip">
        <div className="container contact-info-strip__grid">
          <div className="contact-info-card">
            <Clock size={20} />
            <strong>24/7 Support</strong>
            <span>Always reachable</span>
          </div>
          <div className="contact-info-card">
            <CheckCircle2 size={20} />
            <strong>100% Safe &amp; Secure</strong>
            <span>Insured moves</span>
          </div>
          <div className="contact-info-card">
            <Send size={20} />
            <strong>Quick Response</strong>
            <span>Reply within 30 mins</span>
          </div>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-main__grid">
          {/* FORM — same shared form/email pipeline as every other quote
              form on the site (Home, entry popup, Branches). */}
          <div className="contact-form-card">
            <QuoteForm source="Contact Page" title="Send us a message" subtitle="Fill out the form and our team will get back to you shortly." />
          </div>

          {/* SIDE INFO */}
          <div className="contact-side">
            <div className="contact-side__scene">
              <img
                className="contact-side__scene-img"
                src="/images/contact-office.jpg"
                alt="APM Relocation branch office"
                width={1600}
                height={867}
              />
            </div>
            <div className="contact-side__card">
              <h3>Get in touch</h3>
              <ul>
                <li>
                  <span><Phone size={18} /></span>
                  <div><strong>Call Us</strong><a href={`tel:${COMPANY.phone1}`}>{COMPANY.phone1}</a></div>
                </li>
                <li>
                  <span><MessageCircle size={18} /></span>
                  <div><strong>WhatsApp</strong><a href="https://wa.me/919967661155" target="_blank" rel="noreferrer">Chat with our experts</a></div>
                </li>
                <li>
                  <span><Mail size={18} /></span>
                  <div><strong>Email Us</strong><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
                </li>
                <li>
                  <span><MapPin size={18} /></span>
                  <div><strong>Head Office</strong><p>{COMPANY.address}</p></div>
                </li>
              </ul>
            </div>

            <div className="contact-side__branches">
              <h3>Branches across India</h3>
              <div className="contact-side__branch-tags">
                {BRANCHES.map((b) => <span key={b.city}>{b.city}</span>)}
                <span>120+ Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}