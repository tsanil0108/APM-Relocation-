import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import QuoteModal from "../QuoteForm/QuoteModal";

const SESSION_KEY = "apm_welcome_popup_shown";
const SHOW_DELAY_MS = 1800;

/**
 * Appears once, a couple of seconds after someone lands on the site, and
 * can be dismissed (backdrop click, the × button, or after a successful
 * submit). Uses sessionStorage so it doesn't pop up again on every reload
 * within the same browser tab session — only once per visit.
 */
export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <QuoteModal
          source="Entry Popup"
          title="Planning a Move?"
          subtitle="Get a free, no-obligation quote in under a minute."
          onClose={() => setOpen(false)}
        />
      )}
    </AnimatePresence>
  );
}