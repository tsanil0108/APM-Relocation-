import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import SectionDivider from "./components/SectionDivider/SectionDivider";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Branches from "./pages/Branches/Branches";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <section id="home" className="page-section">
        <Home />
      </section>

      <SectionDivider next="About Us" />

      <section id="about" className="page-section">
        <About />
      </section>

      <SectionDivider next="Our Services" />

      <section id="services" className="page-section">
        <Services />
      </section>

      <SectionDivider next="Our Branches" />

      <section id="branches" className="page-section">
        <Branches />
      </section>

      <SectionDivider next="Gallery" />

      <section id="gallery" className="page-section">
        <Gallery />
      </section>

      <SectionDivider next="Contact Us" />

      <section id="contact" className="page-section">
        <Contact />
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}