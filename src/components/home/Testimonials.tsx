
import { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "Liviu transformed our website copy and we saw a 35% increase in conversions within the first month. His ability to understand our audience and speak directly to their needs was remarkable.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechStart Inc."
    },
    {
      quote: "Working with Liviu was a game-changer for our email campaigns. Open rates increased by 22% and we've seen a significant boost in customer engagement.",
      author: "Michael Chen",
      position: "CEO",
      company: "Bright Solutions"
    },
    {
      quote: "Liviu has an incredible talent for finding the perfect words to tell our story. Our brand voice has never been stronger or more consistent across all our platforms.",
      author: "Rebecca Adams",
      position: "Brand Manager",
      company: "Modern Living"
    },
    {
      quote: "I was struggling to articulate what makes my business unique. Liviu not only helped me find my voice but created copy that genuinely resonates with my ideal clients.",
      author: "David Torres",
      position: "Founder",
      company: "Artisan Design Co."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 bg-copywriter-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-copywriter-navy">
            What My Clients Say
          </h2>
          <div className="h-1 w-24 bg-copywriter-yellow mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
            <div className="mb-6">
              <svg className="w-10 h-10 text-copywriter-yellow opacity-50" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
              </svg>
            </div>
            <p className="text-xl md:text-2xl font-playfair italic mb-8 text-gray-700">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex flex-col items-center">
              <p className="font-bold text-copywriter-navy">
                {testimonials[currentIndex].author}
              </p>
              <p className="text-gray-600">
                {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 -ml-4 md:-ml-6">
            <button 
              onClick={handlePrev}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-copywriter-yellow transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-copywriter-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4 md:-mr-6">
            <button 
              onClick={handleNext}
              className="bg-white rounded-full p-2 shadow-lg hover:bg-copywriter-yellow transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-copywriter-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-copywriter-yellow' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
