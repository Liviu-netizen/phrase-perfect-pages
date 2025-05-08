
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import ServicesPreview from "@/components/home/ServicesPreview";
import Testimonials from "@/components/home/Testimonials";
import CtaStrip from "@/components/home/CtaStrip";

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <ServicesPreview />
      <Testimonials />
      <CtaStrip />
      <Footer />
    </>
  );
};

export default Index;
