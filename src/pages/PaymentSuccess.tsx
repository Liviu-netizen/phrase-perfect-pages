
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-8 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-copywriter-navy">Payment Successful!</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-700">
            Thank you for your purchase. I'll be in touch with you soon to get started on your project.
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-12 text-gray-600">
            An email confirmation has been sent to your email address with the details of your order.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              to="/" 
              className="bg-copywriter-navy text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all"
            >
              Return to Home
            </Link>
            <Link 
              to="/contact" 
              className="bg-white text-copywriter-navy border-2 border-copywriter-navy px-8 py-3 rounded-full font-bold hover:bg-copywriter-gray transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default PaymentSuccess;
