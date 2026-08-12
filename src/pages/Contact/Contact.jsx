import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import PageHero from "../../components/PageHero/PageHero";
import { COMPANY, BRANCHES } from "../../data/content";
import "./Contact.css";

const MOVE_TYPES = ["Home Shifting", "Office Relocation", "Car Transportation", "Bike Transportation", "Commercial Shifting", "Storage & Warehousing"];

const initialForm = { name: "", phone: "", email: "", from: "", to: "", moveDate: "", moveType: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) errs.phone = "Enter a valid phone number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.from.trim()) errs.from = "Enter pickup location";
    if (!form.to.trim()) errs.to = "Enter drop location";
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
    }
  };

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
          {/* FORM */}
          <div className="contact-form-card">
            <h2>Send us a message</h2>
            <p>Fill out the form and our team will get back to you shortly.</p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="contact-form__success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle2 size={40} />
                  <h3>Thank you!</h3>
                  <p>Your request has been received. Our team will call you back shortly.</p>
                  <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="contact-form__row">
                    <div className="field">
                      <label>Your Name</label>
                      <input value={form.name} onChange={update("name")} placeholder="Enter your full name" />
                      {errors.name && <small>{errors.name}</small>}
                    </div>
                    <div className="field">
                      <label>Phone Number</label>
                      <input value={form.phone} onChange={update("phone")} placeholder="Enter your phone number" />
                      {errors.phone && <small>{errors.phone}</small>}
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="field">
                      <label>Email Address</label>
                      <input value={form.email} onChange={update("email")} placeholder="Enter your email" />
                      {errors.email && <small>{errors.email}</small>}
                    </div>
                    <div className="field">
                      <label>Move Type</label>
                      <select value={form.moveType} onChange={update("moveType")}>
                        <option value="">Select move type</option>
                        {MOVE_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="contact-form__row">
                    <div className="field">
                      <label>Moving From</label>
                      <input value={form.from} onChange={update("from")} placeholder="Enter pickup location" />
                      {errors.from && <small>{errors.from}</small>}
                    </div>
                    <div className="field">
                      <label>Moving To</label>
                      <input value={form.to} onChange={update("to")} placeholder="Enter drop location" />
                      {errors.to && <small>{errors.to}</small>}
                    </div>
                  </div>

                  <div className="field">
                    <label>Moving Date</label>
                    <input type="date" value={form.moveDate} onChange={update("moveDate")} />
                  </div>

                  <div className="field">
                    <label>Message</label>
                    <textarea rows={4} value={form.message} onChange={update("message")} placeholder="Tell us about your move" />
                  </div>

                  <button type="submit" className="btn btn-primary contact-form__submit">
                    Send Message <Send size={16} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
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
