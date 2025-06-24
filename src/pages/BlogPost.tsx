
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Write Website Copy That Actually Converts Visitors into Customers",
    category: "SEO & Strategy",
    excerpt: "Discover the proven strategies and techniques that turn casual browsers into paying customers through compelling website copy.",
    readTime: "8 min read",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=400&fit=crop",
    content: `
      <h2>The Foundation: Understanding Your Audience</h2>
      <p>Before you write a single word, you need to understand who you're writing for. The most converting copy speaks directly to your audience's pain points, desires, and motivations.</p>
      
      <h3>Research Your Ideal Customer</h3>
      <p>Start by creating detailed buyer personas. What keeps your customers awake at night? What are their goals? What language do they use when describing their problems?</p>
      
      <h2>The AIDA Framework</h2>
      <p>Use the proven AIDA formula to structure your copy:</p>
      <ul>
        <li><strong>Attention:</strong> Grab their attention with a compelling headline</li>
        <li><strong>Interest:</strong> Keep them engaged with relevant benefits</li>
        <li><strong>Desire:</strong> Build desire by showing transformation</li>
        <li><strong>Action:</strong> Guide them to take the next step</li>
      </ul>
      
      <h2>Write Headlines That Hook</h2>
      <p>Your headline is the first thing visitors see. Make it count by:</p>
      <ul>
        <li>Leading with a clear benefit</li>
        <li>Using numbers and specifics</li>
        <li>Creating urgency or curiosity</li>
        <li>Speaking your audience's language</li>
      </ul>
      
      <h2>Focus on Benefits, Not Features</h2>
      <p>Don't just tell people what your product does—tell them what it will do for them. Transform features into benefits by asking "so what?" after every feature you list.</p>
      
      <h2>Use Social Proof</h2>
      <p>Include testimonials, reviews, case studies, and logos of well-known clients to build trust and credibility.</p>
      
      <h2>Create Urgency</h2>
      <p>Give people a reason to act now rather than later. Use limited-time offers, scarcity, or emphasize the cost of inaction.</p>
      
      <h2>Test and Optimize</h2>
      <p>The best copy is always tested. Use A/B testing to continuously improve your conversion rates.</p>
    `
  },
  {
    id: 2,
    title: "The 7 Most Common Copywriting Mistakes (And How to Fix Them)",
    category: "SEO & Strategy",
    excerpt: "Learn about the critical copywriting errors that could be costing you sales and how to avoid them.",
    readTime: "6 min read",
    date: "Dec 18, 2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    content: `
      <h2>Mistake #1: Writing About Features Instead of Benefits</h2>
      <p>The biggest mistake copywriters make is focusing on what their product does instead of what it does for the customer.</p>
      <p><strong>How to fix it:</strong> For every feature, ask "So what?" until you get to the real benefit.</p>
      
      <h2>Mistake #2: Using Industry Jargon</h2>
      <p>Your customers don't speak your internal language. Avoid technical terms and industry jargon that confuse rather than clarify.</p>
      <p><strong>How to fix it:</strong> Write like you're explaining to a friend. Use simple, clear language.</p>
      
      <h2>Mistake #3: Weak Headlines</h2>
      <p>Your headline is your first impression. If it doesn't grab attention, nothing else matters.</p>
      <p><strong>How to fix it:</strong> Write 10 headlines for every piece of copy, then pick the strongest one.</p>
      
      <h2>Mistake #4: No Clear Call-to-Action</h2>
      <p>If you don't tell people what to do next, they won't do anything.</p>
      <p><strong>How to fix it:</strong> Include one clear, specific call-to-action per page.</p>
      
      <h2>Mistake #5: Writing for Everyone</h2>
      <p>When you try to appeal to everyone, you appeal to no one.</p>
      <p><strong>How to fix it:</strong> Define your ideal customer and write specifically for them.</p>
      
      <h2>Mistake #6: Ignoring the Customer's Journey</h2>
      <p>Different stages of awareness require different types of copy.</p>
      <p><strong>How to fix it:</strong> Match your message to where your customer is in their buying journey.</p>
      
      <h2>Mistake #7: Not Testing</h2>
      <p>Good copy can always become great copy through testing.</p>
      <p><strong>How to fix it:</strong> Set up A/B tests for headlines, CTAs, and key messages.</p>
    `
  }
  // Add more blog posts with full content as needed
];

const categoryColors = {
  "SEO & Strategy": "bg-blue-100 text-blue-800",
  "Client-Focused": "bg-green-100 text-green-800",
  "Psychology": "bg-purple-100 text-purple-800",
  "Practical Tips": "bg-orange-100 text-orange-800",
  "Business Growth": "bg-red-100 text-red-800"
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const blogPost = blogPosts.find(post => post.id === parseInt(id || ''));
  
  if (!blogPost) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gray-50 py-12 mt-16">
          <div className="container mx-auto px-4">
            <Button 
              onClick={() => navigate('/blog')}
              variant="ghost" 
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            
            <div className="max-w-4xl mx-auto">
              <Badge className={`mb-4 ${categoryColors[blogPost.category as keyof typeof categoryColors]}`}>
                {blogPost.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {blogPost.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Liviu M.C.</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
              
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
              
              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-copywriter-navy rounded-full flex items-center justify-center text-white font-bold text-xl">
                    LMC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Liviu M.C.</h3>
                    <p className="text-gray-600">
                      Professional copywriter specializing in conversion-focused content. 
                      I help businesses transform their messaging to drive more sales and engagement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
