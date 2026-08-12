import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import PageTransition from "./components/PageTransition/PageTransition";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Branches from "./pages/Branches/Branches";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";

export default function App() {
  const location = useLocation();

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/branches" element={<PageTransition><Branches /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
