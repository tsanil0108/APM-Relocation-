import { motion } from "framer-motion";
import { X } from "lucide-react";
import QuoteForm from "./QuoteForm";
import "./QuoteModal.css";

/**
 * Reusable popup shell that wraps <QuoteForm/>. Used for:
 *  - the entry popup shown when someone first lands on the site
 *  - the "Get Free Quote" popup triggered from the Branches page
 * Click on the backdrop or the close button dismisses it; clicks inside
 * the card don't bubble up (so typing in the form never closes it).
 */
export default function QuoteModal({ onClose, source, title, subtitle }) {
  return (
    <motion.div
      className="quote-modal__backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="quote-modal"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="quote-modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <QuoteForm compact source={source} title={title} subtitle={subtitle} onSuccess={onClose} />
      </motion.div>
    </motion.div>
  );
}