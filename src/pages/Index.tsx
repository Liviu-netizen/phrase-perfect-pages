
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import ServicesPreview from "@/components/home/ServicesPreview";
import Testimonials from "@/components/home/Testimonials";
import CtaStrip from "@/components/home/CtaStrip";

const Index = () => {
  console.log("Rendering Index page");
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Intro />
        <ServicesPreview />
        <Testimonials />
        <CtaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
