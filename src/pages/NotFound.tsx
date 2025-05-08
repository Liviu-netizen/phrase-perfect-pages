
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-copywriter-gray py-20">
        <div className="text-center px-4 max-w-xl">
          <h1 className="text-8xl font-bold mb-4 text-copywriter-navy">404</h1>
          <p className="text-3xl font-bold mb-6 text-copywriter-navy">Page Not Found</p>
          <p className="text-gray-700 mb-12 text-lg">
            Oops! The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
