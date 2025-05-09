import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const ServiceSection = ({ 
  id, 
  title, 
  description, 
  deliverables, 
  benefits,
  image 
}: { 
  id: string; 
  title: string; 
  description: string; 
  deliverables: string[]; 
  benefits: string[];
  image: string;
}) => {
  return (
    <div id={id} className="py-16 border-b border-gray-200 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-bold mb-4 text-copywriter-navy">{title}</h2>
          <p className="mb-8 text-gray-700 text-lg">{description}</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-copywriter-navy">What's Included:</h3>
            <ul className="space-y-3">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-copywriter-navy">Benefits:</h3>
            <ul className="space-y-3">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-copywriter-yellow mr-2 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8">
            <a href="/contact" className="btn-primary">
              Get a Quote
            </a>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PackageCard = ({ 
  title, 
  price, 
  description, 
  features, 
  highlighted = false 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  highlighted?: boolean;
}) => {
  return (
    <div 
      className={`rounded-lg shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 ${
        highlighted ? 'bg-copywriter-navy text-white border-4 border-copywriter-yellow' : 'bg-white'
      }`}
    >
      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-copywriter-yellow' : 'text-copywriter-navy'}`}>
        {title}
      </h3>
      <div className="mb-4">
        <span className={`text-3xl font-bold ${highlighted ? 'text-white' : 'text-copywriter-navy'}`}>{price}</span>
        {price !== "Custom" && <span className={`${highlighted ? 'text-gray-300' : 'text-gray-600'}`}>/starting at</span>}
      </div>
      <p className={`mb-6 ${highlighted ? 'text-gray-300' : 'text-gray-700'}`}>{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className={`w-5 h-5 mr-2 mt-1 ${highlighted ? 'text-copywriter-yellow' : 'text-copywriter-yellow'}`} />
            <span className={highlighted ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <a 
        href="/contact" 
        className={`block text-center py-3 px-6 rounded-full font-bold transition-colors ${
          highlighted 
            ? 'bg-copywriter-yellow text-copywriter-navy hover:bg-white' 
            : 'bg-copywriter-navy text-white hover:bg-copywriter-yellow hover:text-copywriter-navy'
        }`}
      >
        Select Plan
      </a>
    </div>
  );
};

const ProcessStep = ({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-copywriter-yellow text-copywriter-navy flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2 text-copywriter-navy">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      id: "website",
      title: "Website Copy",
      description: "Your visitors, now customers, with a clean website copy that makes them scroll, book, and buy.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      deliverables: [
        "Homepage copy that clearly communicates your value proposition",
        "About page that tells your brand's story",
        "Product/service descriptions that highlight benefits, not just features",
        "Call-to-action text that drives conversions"
      ],
      benefits: [
        "More visitors will now become customers",
        "Reduced bounce rates as visitors stay engaged",
        "Clear brand messaging that speaks to your target audience",
        "Tailored tone that builds trust with potential customers"
      ]
    },
    {
      id: "email",
      title: "Email Campaigns",
      description: "Nurture leads, drive sales, and build customer relationships with strategic email campaigns.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      deliverables: [
        "Welcome email sequence to onboard new subscribers",
        "Promotional emails that drive action without being pushy or aggressive",
        "Nurture sequences to build relationships with your audience",
        "Re-engagement campaigns to win back inactive subscribers",
        "Subject lines and preview text that boost open rates"
      ],
      benefits: [
        "More potential clients will open your emails through powerful subject lines",
        "More clients will visit your website from the email",
        "Stronger relationships with your audience",
        "Consistent brand voice across all communications"
      ]
    },
    {
      id: "content",
      title: "Content Writing",
      description: "Establish your expertise and attract organic traffic with high-quality blog posts and articles.",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      deliverables: [
        "SEO-optimized blog posts that target strategic keywords",
        "In-depth articles that showcase your expertise",
        "Thought leadership content that positions you as an industry leader",
        "Engaging social media copy to promote your content",
        "Content strategy to guide your ongoing publishing efforts"
      ],
      benefits: [
        "Increased organic traffic from search engines",
        "Longer time spent on your website by visitors",
        "Higher domain authority as you publish quality content",
        "More social shares and backlinks from other websites",
        "Established credibility in your industry"
      ]
    }
  ];

  const packages = [
    {
      title: "Essential",
      price: "$99.99",
      description: "Perfect for small businesses looking to improve specific pieces of copy.",
      features: [
        "Single page website copy OR",
        "3-email sequence OR",
        "2 blog posts (up to 1,200 words each)",
        "2 rounds of revisions",
        "SEO best practices",
        "Delivered within 7 business days"
      ]
    },
    {
      title: "Professional",
      price: "$299.99",
      description: "Comprehensive solution for businesses needing full website or campaign copy.",
      features: [
        "Full 5-page website copy OR",
        "6-email nurture sequence OR",
        "5 blog posts (up to 1,500 words each)",
        "3 rounds of revisions",
        "SEO keyword optimization",
        "Content strategy consultation",
        "Delivered within 14 business days"
      ],
      highlighted: true
    },
    {
      title: "Enterprise",
      price: "$899.99",
      description: "Tailored solutions at a fixed price, for larger businesses with ongoing copy needs.",
      features: [
        "Custom scope based on your needs",
        "Unlimited revisions",
        "Dedicated account manager",
        "Comprehensive content strategy",
        "Priority delivery",
        "Monthly performance reports"
      ]
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Discovery",
      description: "I'll learn about your business, goals, audience, and competitors to understand what makes you unique."
    },
    {
      number: 2,
      title: "Strategy",
      description: "Based on research, I'll develop a content strategy that aligns with your business objectives."
    },
    {
      number: 3,
      title: "Creation",
      description: "I'll craft compelling copy that speaks to your audience and drives them to take action."
    },
    {
      number: 4,
      title: "Refinement",
      description: "You'll review the copy and provide feedback for revisions until you're completely satisfied."
    },
    {
      number: 5,
      title: "Launch",
      description: "Once approved, your copy is ready to publish and start working for your business."
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Services Header */}
      <section className="pt-32 pb-16 bg-copywriter-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Copywriting Services</h1>
          <div className="h-1 w-24 bg-copywriter-yellow mx-auto mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto">
            Strategic copywriting services designed to help your business connect with customers and drive conversions.
          </p>
        </div>
      </section>
      
      {/* Services Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-copywriter-navy">My Approach to Copywriting</h2>
            <p className="text-lg mb-6 text-gray-700">
              First off, Forget about ChatGPT copy & Paste content. My approach to copywriting is old school, going through deep industry research, dissecting the audience, identifying your target customer, and then writing your message.
            </p>
            <p className="text-lg text-gray-700">
              What do you have to do? Book a service or a call. Keep scrolling to see how I can help you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Service Blocks */}
      <section className="py-16 bg-copywriter-gray">
        <div className="container mx-auto px-4">
          {services.map((service, index) => (
            <ServiceSection 
              key={index}
              id={service.id}
              title={service.title}
              description={service.description}
              deliverables={service.deliverables}
              benefits={service.benefits}
              image={service.image}
            />
          ))}
        </div>
      </section>
      
      {/* Packages & Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-copywriter-navy">Packages & Pricing</h2>
            <div className="h-1 w-24 bg-copywriter-yellow mx-auto mb-8"></div>
            <p className="text-lg max-w-2xl mx-auto text-gray-700">
              Spiked your interest?
              <br />Pick the package that fits you best - or hit me up for a custom solution that speaks directly to your business, no guesswork included.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, index) => (
              <PackageCard 
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                highlighted={pkg.highlighted}
              />
            ))}
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-copywriter-navy">My Process</h2>
            <div className="h-1 w-24 bg-copywriter-yellow mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <ProcessStep 
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-copywriter-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-copywriter-navy">Client Success Stories</h2>
            <div className="h-1 w-24 bg-copywriter-yellow mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4 text-copywriter-yellow text-2xl">"</div>
              <p className="text-lg mb-6 text-gray-700 font-playfair italic">
                Emily rewrote our entire website and the results were immediate. Our bounce rate dropped by 30% and contact form submissions increased by 25%.
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/women/45.jpg" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-copywriter-navy">Amanda Zhang</p>
                  <p className="text-gray-600">CEO, Harper Design Studio</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4 text-copywriter-yellow text-2xl">"</div>
              <p className="text-lg mb-6 text-gray-700 font-playfair italic">
                Our email open rates were abysmal before working with Emily. After implementing her email sequence, we saw a 40% increase in opens and a 15% increase in sales.
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/67.jpg" 
                    alt="Client" 
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-copywriter-navy">Marcus Johnson</p>
                  <p className="text-gray-600">Marketing Director, FitLife Supplements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-copywriter-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your copy?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
            Contact me today to discuss your project and how we can work together to achieve your business goals.
          </p>
          <a href="/contact" className="btn-primary text-lg">
            Get in Touch
          </a>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Services;
