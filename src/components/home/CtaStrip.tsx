
import { Link } from 'react-router-dom';

const CtaStrip = () => {
  return (
    <section className="py-20 bg-copywriter-navy text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to scale your SaaS with copy that converts?
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-300">
          Let's work together to craft messaging that turns your features into revenue.
        </p>
        <Link to="/contact" className="btn-primary text-lg">
          Get Started Today
        </Link>
      </div>
    </section>
  );
};

export default CtaStrip;
