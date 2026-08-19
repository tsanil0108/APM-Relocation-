import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Truck, Calendar, MessageSquare, ChevronDown, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendQuoteEmail } from "../../lib/sendQuote";
import "./QuoteForm.css";

const MOVE_TYPES = [
  "Home Shifting",
  "Office Relocation",
  "Vehicle Transportation",
  "Storage & Warehousing",
  "Other",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  moveType: "",
  from: "",
  to: "",
  moveDate: "",
  message: "",
};

/**
 * ONE form, used everywhere on the site (Home hero, entry popup, Branches
 * "Get Free Quote", Contact page) so every submission is wired to the same
 * place — see src/lib/sendQuote.js.
 *
 * Props:
 *  - source: label so you can tell in the email which part of the site it came from
 *  - compact: tighter spacing for use inside popups/modals
 *  - title / subtitle: optional heading overrides
 *  - onSuccess: called after a successful submit (e.g. to close a modal)
 */
export default function QuoteForm({
  source = "Website",
  compact = false,
  title = "Get Instant Moving Quote",
  subtitle,
  onSuccess,
}) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) errs.phone = "Enter a valid phone number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.moveType) errs.moveType = "Select a move type";
    if (!form.from.trim()) errs.from = "Enter pickup location";
    if (!form.to.trim()) errs.to = "Enter drop location";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      await sendQuoteEmail({ ...form, source });
      setStatus("success");
      setForm(initialForm);
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`quote-form ${compact ? "quote-form--compact" : ""}`}>
      <div className="quote-form__head">
        <span className="quote-form__head-icon">
          <Truck size={18} />
        </span>
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            className="quote-form__success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle2 size={38} />
            <h4>Thank you!</h4>
            <p>Your request has been received. Our team will call you back shortly.</p>
            <button type="button" className="btn btn-outline" onClick={() => setStatus("idle")}>
              Send Another Request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="quote-form__form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="quote-form__row">
              <label className="quote-form__field">
                <span>Your Name</span>
                <div className="quote-form__input-wrap">
                  <User size={15} />
                  <input type="text" placeholder="Enter your full name" value={form.name} onChange={update("name")} />
                </div>
                {fieldErrors.name && <small>{fieldErrors.name}</small>}
              </label>

              <label className="quote-form__field">
                <span>Phone Number</span>
                <div className="quote-form__input-wrap">
                  <Phone size={15} />
                  <input type="tel" placeholder="Enter your phone number" value={form.phone} onChange={update("phone")} />
                </div>
                {fieldErrors.phone && <small>{fieldErrors.phone}</small>}
              </label>
            </div>

            <div className="quote-form__row">
              <label className="quote-form__field">
                <span>Email (optional)</span>
                <div className="quote-form__input-wrap">
                  <Mail size={15} />
                  <input type="email" placeholder="Enter your email" value={form.email} onChange={update("email")} />
                </div>
                {fieldErrors.email && <small>{fieldErrors.email}</small>}
              </label>

              <label className="quote-form__field">
                <span>Moving Type</span>
                <div className="quote-form__select-wrap">
                  <Truck size={15} />
                  <select value={form.moveType} onChange={update("moveType")}>
                    <option value="" disabled>
                      Select move type
                    </option>
                    {MOVE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="quote-form__select-chevron" />
                </div>
                {fieldErrors.moveType && <small>{fieldErrors.moveType}</small>}
              </label>
            </div>

            <div className="quote-form__row">
              <label className="quote-form__field">
                <span>Moving From</span>
                <div className="quote-form__input-wrap">
                  <MapPin size={15} />
                  <input type="text" placeholder="Enter pickup location" value={form.from} onChange={update("from")} />
                </div>
                {fieldErrors.from && <small>{fieldErrors.from}</small>}
              </label>

              <label className="quote-form__field">
                <span>Moving To</span>
                <div className="quote-form__input-wrap">
                  <MapPin size={15} />
                  <input type="text" placeholder="Enter drop location" value={form.to} onChange={update("to")} />
                </div>
                {fieldErrors.to && <small>{fieldErrors.to}</small>}
              </label>
            </div>

            <label className="quote-form__field">
              <span>Preferred Move Date (optional)</span>
              <div className="quote-form__input-wrap">
                <Calendar size={15} />
                <input type="date" value={form.moveDate} onChange={update("moveDate")} />
              </div>
            </label>

            <label className="quote-form__field">
              <span>Message (optional)</span>
              <div className="quote-form__input-wrap quote-form__input-wrap--textarea">
                <MessageSquare size={15} />
                <textarea rows={3} placeholder="Tell us about your move" value={form.message} onChange={update("message")} />
              </div>
            </label>

            {status === "error" && (
              <p className="quote-form__error">
                <AlertCircle size={15} /> {errorMsg}
              </p>
            )}

            <motion.button
              type="submit"
              className="btn btn-primary quote-form__submit"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending..." : "Get Quote Now"}
              {status !== "submitting" && <Send size={16} />}
            </motion.button>

            <p className="quote-form__note">Free · No Obligation · 100% Secure</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}