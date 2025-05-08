
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* About Header */}
      <section className="pt-32 pb-16 bg-copywriter-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About WordCraft</h1>
          <div className="h-1 w-24 bg-copywriter-yellow mx-auto"></div>
        </div>
      </section>
      
      {/* About Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <div className="rounded-full overflow-hidden border-4 border-copywriter-yellow shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" 
                  alt="Emily Parker, Copywriter" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-copywriter-navy">My Story</h2>
              <div className="space-y-4 font-playfair text-gray-700">
                <p>
                  I'm Emily Parker, the founder of WordCraft. My journey into copywriting began over a decade ago when I realized the immense power that words have to persuade, inspire, and transform.
                </p>
                <p>
                  After earning my degree in English Literature and Marketing from Boston University, I spent five years at a top advertising agency crafting campaigns for Fortune 500 companies. While the work was exciting, I knew I wanted to help businesses of all sizes harness the power of great copy.
                </p>
                <p>
                  In 2015, I founded WordCraft with a simple mission: to help businesses communicate more effectively with their customers through clear, compelling copy that converts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Credentials */}
      <section className="py-16 bg-copywriter-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-copywriter-navy text-center">Credentials & Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-copywriter-navy">Education & Training</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>BA in English Literature & Marketing, Boston University</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Certified Content Marketing Specialist</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>SEO Copywriting Masterclass Graduate</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-copywriter-navy">Industry Experience</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5+ years at Johnston & Partners Advertising</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Worked with 100+ businesses across tech, health, finance, and e-commerce</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Published in Marketing Weekly and Content Creator Magazine</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <blockquote className="bg-copywriter-navy text-white p-10 rounded-lg shadow-lg relative">
              <div className="absolute -top-5 left-10 text-copywriter-yellow text-6xl">"</div>
              <p className="text-xl md:text-2xl font-playfair italic mb-8 relative z-10">
                Emily has an uncanny ability to capture a brand's voice perfectly. She's our go-to copywriter for all our major campaigns, and the results speak for themselves.
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full border-2 border-copywriter-yellow"
                  />
                </div>
                <div>
                  <p className="font-bold">James Wilson</p>
                  <p className="text-copywriter-yellow">CMO, Global Tech Solutions</p>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>
      
      {/* Personal Touch */}
      <section className="py-16 bg-copywriter-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-copywriter-navy text-center">When I'm Not Writing...</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4 text-4xl text-copywriter-yellow">🏃‍♀️</div>
                <h3 className="font-bold mb-2 text-copywriter-navy">Trail Running</h3>
                <p className="text-gray-700">I find my best ideas come during long runs in nature.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4 text-4xl text-copywriter-yellow">📚</div>
                <h3 className="font-bold mb-2 text-copywriter-navy">Reading</h3>
                <p className="text-gray-700">Always working through my towering "to read" pile.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4 text-4xl text-copywriter-yellow">🧁</div>
                <h3 className="font-bold mb-2 text-copywriter-navy">Baking</h3>
                <p className="text-gray-700">Amateur pastry chef and sourdough enthusiast.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About CTA */}
      <section className="py-16 bg-copywriter-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Let's create something amazing together
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
            See how my copywriting expertise can help your business stand out and connect with your ideal customers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="/portfolio" className="btn-primary">
              View My Work
            </a>
            <a href="/contact" className="btn-secondary">
              Start a Project
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
