
import { useNavigate } from 'react-router-dom';
import { FileText, Globe, Mail } from 'lucide-react';

const ServiceBox = ({ 
  icon, 
  title, 
  description, 
  link 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Extract the hash from the link (e.g., "#website" from "/services#website")
    const hash = link.split('#')[1];
    
    // Navigate to services page first
    navigate('/services');
    
    // Then scroll to the specific section after a short delay to ensure the page has loaded
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl group cursor-pointer" onClick={handleClick}>
      <div className="mb-6 text-copywriter-navy group-hover:text-copywriter-yellow transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-copywriter-navy">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>
      <div className="inline-flex items-center text-copywriter-navy font-bold group-hover:text-copywriter-yellow transition-colors">
        Learn More
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>
      </div>
    </div>
  );
};

const ServicesPreview = () => {
  const services = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Website Copy",
      description: "Persuasive landing pages and website content that converts visitors into customers.",
      link: "/services#website",
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: "Email Campaigns",
      description: "Engaging email sequences that nurture leads and drive sales.",
      link: "/services#email",
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Content Writing",
      description: "SEO-optimized blog posts and articles that establish your authority.",
      link: "/services#content",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-copywriter-navy">
            How I Can Help
          </h2>
          <div className="h-1 w-24 bg-copywriter-yellow mx-auto mb-8"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            I offer a range of copywriting services to help your business communicate effectively and convert more customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceBox 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
