
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
                  alt="Liviu, Copywriter" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-copywriter-navy">My Story</h2>
              <div className="space-y-4 font-playfair text-gray-700">
                <p>
                  I'm Liviu, the mind behind Liviu The Copywriter. My journey began 8 years ago, when I discovered the immense power of selling through words.
                </p>
                <p>
                  Since then, I've been building my own brand of copywriting that helps small business owners and startups, like you, connect with customers through a loud voice and a clear message.
                </p>
                <p>
                  I started out as a freelance writer on platforms like Fiverr and Upwork, where I gained deep experience into the market and learned what different industries truly need. That experience shaped the way I work today: focused, strategic, and in-line with results.
                </p>
                <p>
                  Now, here we are - just a few words on a screen between you and the message your business needs to be heard. Let's make your customers feel seen, understood, and ready to buy.
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
                    <div>
                      <span className="font-bold">Shodan in Judo (Black Belt) (2018)</span>
                      <p>Discipline. Focus. Strategy. Judo taught me how to think three steps ahead. practical to every campaign I write.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold">Algorithmic Computing & C++ (2021)</span>
                      <p>Built a strong foundation in logic, problem-solving, and structured thinking, core skills I now use to write sharp, clear copy.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold">Web & Graphic Design / UI & UX Design (2022)</span>
                      <p>Learned how to make brands look good and feel right. I apply design thinking to craft copy that not only reads well, but fits perfectly into digital experiences.</p>
                    </div>
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
                    <div>
                      <span className="font-bold">8 Years of Freelance Copywriting</span>
                      <p>Built my career on platforms like Fiverr, working with diverse clients and learning what makes audiences click & buy</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold">Hands-On Work Across Industries</span>
                      <p>I've held roles in sectors ranging from social media to legal affairs. That real world experience taught me how different industries operate, and now I bring that knowledge into every word I write.</p>
                    </div>
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
                Liviu has an uncanny ability to capture a brand's voice perfectly. He's our go-to copywriter for all our major campaigns, and the results speak for themselves.
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
                <div className="mb-4 text-4xl text-copywriter-yellow">🥋</div>
                <h3 className="font-bold mb-2 text-copywriter-navy">Rolling on the Mats</h3>
                <p className="text-gray-700">In the jiu-jitsu gym, where strategy meets sweat and every roll teaches me something new about persistence.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4 text-4xl text-copywriter-yellow">🥩</div>
                <h3 className="font-bold mb-2 text-copywriter-navy">Cooking Steak</h3>
                <p className="text-gray-700">Perfecting the art of the perfect sear, because great things take time and attention to detail.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4 text-4xl text-copywriter-yellow">💕</div>
                <h3 className="font-bold mb-2 text-copywriter-navy">With My Lovely Wife</h3>
                <p className="text-gray-700">Sharing life's best moments with the woman who keeps me grounded and inspired every single day.</p>
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
