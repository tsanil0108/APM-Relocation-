import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919967661155"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="whatsapp-fab__ping" />
      <MessageCircle size={26} fill="currentColor" />
    </motion.a>
  );
}
