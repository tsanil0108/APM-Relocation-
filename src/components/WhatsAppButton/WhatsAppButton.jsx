import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <div className="floating-contact">

      {/* CALL BUTTON */}
      <motion.a
        href="tel:+919967661155"
        className="floating-contact__btn floating-contact__call"
        aria-label="Call APM Relocation"
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.7,
          type: "spring",
          stiffness: 200,
          damping: 14,
        }}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        <span className="floating-contact__tooltip">
          Call Now
        </span>

        <Phone
          size={24}
          strokeWidth={2.4}
        />
      </motion.a>


      {/* WHATSAPP BUTTON */}
      <motion.a
        href="https://wa.me/919967661155"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn floating-contact__whatsapp"
        aria-label="Chat with APM Relocation on WhatsApp"
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 200,
          damping: 14,
        }}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        {/* PING EFFECT */}
        <span className="floating-contact__ping" />

        {/* TOOLTIP */}
        <span className="floating-contact__tooltip">
          WhatsApp
        </span>

        {/* REAL WHATSAPP LOGO */}
        <FaWhatsapp
          className="floating-contact__whatsapp-icon"
          size={31}
        />
      </motion.a>

    </div>
  );
}