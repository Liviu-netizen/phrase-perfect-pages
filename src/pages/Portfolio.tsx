
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  category: string[];
  brief: string;
  description: string;
  challenges: string;
  solution: string;
  results: string;
  image: string;
}

const Portfolio = () => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "E-commerce Website Relaunch",
      client: "Urban Botanics",
      category: ["Website", "E-commerce"],
      brief: "Rewrite product descriptions and homepage copy to increase conversions.",
      description: "Urban Botanics is a premium plant shop that needed to refresh their website copy to better connect with their target audience and improve conversion rates.",
      challenges: "The existing copy was too technical and failed to evoke the emotional connection that plants can bring to people's homes and lives.",
      solution: "I created warm, inviting copy that emphasized the benefits of bringing nature indoors, while maintaining the brand's premium positioning and incorporating key selling points.",
      results: "30% increase in conversion rate and 25% increase in average order value within three months of launching the new copy.",
      image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Lead Generation Email Sequence",
      client: "Pinnacle Financial Advisors",
      category: ["Email", "Finance"],
      brief: "Create a 5-part email sequence to nurture leads from webinar registrations.",
      description: "Pinnacle Financial Advisors needed an email sequence that would convert webinar attendees into consultation bookings.",
      challenges: "The financial planning industry is highly competitive, and potential clients are often skeptical of financial advisors.",
      solution: "I developed a value-packed 5-part email sequence that educated prospects about retirement planning while establishing Pinnacle's expertise and trustworthiness.",
      results: "22% of webinar attendees booked a consultation, up from 8% with their previous email approach.",
      image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "SaaS Landing Page",
      client: "TaskFlow",
      category: ["Website", "SaaS", "Tech"],
      brief: "Write converting copy for a new project management tool's landing page.",
      description: "TaskFlow was launching a new project management tool and needed a landing page that would clearly communicate its value proposition and drive sign-ups.",
      challenges: "The project management software market is saturated, making it difficult to stand out from competitors.",
      solution: "I focused on TaskFlow's unique features and created benefit-driven copy that highlighted how it solved specific pain points for the target audience.",
      results: "The landing page achieved a 15% free trial sign-up rate, exceeding the industry average of 8%.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80"
    },
    {
      id: 4,
      title: "Blog Content Strategy",
      client: "Wellness Revolution",
      category: ["Content", "Health"],
      brief: "Develop and implement a 6-month blog content strategy to increase organic traffic.",
      description: "Wellness Revolution, a health coaching company, needed to establish thought leadership and increase organic traffic through strategic blog content.",
      challenges: "The wellness industry is crowded with content, making it difficult to rank for valuable keywords and stand out from competitors.",
      solution: "I conducted keyword research to identify underserved topics, created a 6-month editorial calendar, and wrote pillar content pieces that established authority.",
      results: "Organic traffic increased by 150% over 6 months, and email sign-ups from blog posts grew by 200%.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
    },
    {
      id: 5,
      title: "Product Launch Campaign",
      client: "Elevate Fitness",
      category: ["Email", "Launch", "Health"],
      brief: "Create a product launch campaign for a new fitness app, including emails and sales page.",
      description: "Elevate Fitness was launching a premium fitness app and needed a comprehensive copy strategy for their launch campaign.",
      challenges: "The fitness app market is highly competitive, with many free alternatives available.",
      solution: "I created a story-driven launch campaign that focused on transformation and results, emphasizing the app's unique features and community aspects.",
      results: "The launch exceeded sales projections by 35%, with a 4.8% conversion rate from email to purchase.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 6,
      title: "Brand Voice Guidelines",
      client: "Seafarer Apparel",
      category: ["Branding", "Fashion"],
      brief: "Develop brand voice guidelines and sample copy for a sustainable clothing brand.",
      description: "Seafarer Apparel, a sustainable clothing brand, needed to establish a consistent brand voice across all communications.",
      challenges: "The brand needed to balance its commitment to sustainability with an approachable, non-preachy tone that would appeal to mainstream consumers.",
      solution: "I developed comprehensive brand voice guidelines that included personality traits, dos and don'ts, word choices, and sample copy for different contexts.",
      results: "The guidelines helped unify communications across their team and freelancers, creating a consistent brand experience that resonated with their target audience.",
      image: "https://images.unsplash.com/photo-1508599589920-14cfa1c1fe4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
    }
  ];

  // Get all unique categories
  const allCategories = ["all", ...new Set(portfolioItems.flatMap(item => item.category))];

  // Filter portfolio items based on selected category
  const filteredItems = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category.includes(filter));

  // Handle opening the modal with a specific item
  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      
      {/* Portfolio Header */}
      <section className="pt-32 pb-16 bg-copywriter-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio</h1>
          <div className="h-1 w-24 bg-copywriter-yellow mx-auto mb-8"></div>
          <p className="text-xl max-w-3xl mx-auto">
            A showcase of my copywriting projects across various industries and platforms.
          </p>
        </div>
      </section>
      
      {/* Portfolio Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-copywriter-navy">Client Success Stories</h2>
            <p className="text-lg mb-6 text-gray-700">
              Browse through a selection of my past projects to see how strategic copywriting has helped businesses connect with their audiences and achieve their goals.
            </p>
            <p className="text-lg text-gray-700">
              Each project represents a unique challenge and a tailored solution designed to deliver results.
            </p>
          </div>
        </div>
      </section>
      
      {/* Portfolio Grid */}
      <section className="py-16 bg-copywriter-gray">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {allCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  filter === category
                    ? 'bg-copywriter-navy text-white'
                    : 'bg-white text-copywriter-navy hover:bg-copywriter-yellow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Portfolio Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => openModal(item)}
              >
                <div className="relative overflow-hidden h-60">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-copywriter-navy bg-opacity-0 group-hover:bg-opacity-70 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.category.map((cat, index) => (
                      <span 
                        key={index}
                        className="bg-copywriter-beige text-copywriter-navy px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-copywriter-navy">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.client}</p>
                  <p className="text-gray-700">{item.brief}</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-copywriter-navy">No projects found</h3>
              <p className="text-gray-700 mt-2">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Portfolio Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <div className="p-4">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-copywriter-navy">{selectedItem.title}</h2>
                  <p className="text-gray-600">{selectedItem.client}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-copywriter-navy"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-copywriter-navy">Project Overview</h3>
                  <p className="text-gray-700 mb-6">{selectedItem.description}</p>
                  
                  <h3 className="text-xl font-bold mb-3 text-copywriter-navy">Challenges</h3>
                  <p className="text-gray-700">{selectedItem.challenges}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3 text-copywriter-navy">Solution</h3>
                  <p className="text-gray-700 mb-6">{selectedItem.solution}</p>
                  
                  <h3 className="text-xl font-bold mb-3 text-copywriter-navy">Results</h3>
                  <p className="text-gray-700">{selectedItem.results}</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <a 
                  href="/contact" 
                  className="btn-primary"
                >
                  Discuss Your Project
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* CTA */}
      <section className="py-16 bg-copywriter-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to create your success story?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-300">
            Let's work together to craft copy that connects with your audience and drives results for your business.
          </p>
          <a href="/contact" className="btn-primary text-lg">
            Start Your Project
          </a>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Portfolio;
