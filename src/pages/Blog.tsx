import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Write Website Copy That Actually Converts Visitors into Customers",
    category: "SEO & Strategy",
    excerpt: "Discover the proven strategies and techniques that turn casual browsers into paying customers through compelling website copy.",
    readTime: "8 min read",
    date: "Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "The 7 Most Common Copywriting Mistakes (And How to Fix Them)",
    category: "SEO & Strategy",
    excerpt: "Learn about the critical copywriting errors that could be costing you sales and how to avoid them.",
    readTime: "6 min read",
    date: "Dec 18, 2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "SEO Copywriting: Writing for Google and Humans at the Same Time",
    category: "SEO & Strategy",
    excerpt: "Master the art of creating content that ranks high in search engines while engaging your human audience.",
    readTime: "10 min read",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Why Your Business Needs a Content Strategy (And How to Build One)",
    category: "SEO & Strategy",
    excerpt: "Understand the importance of strategic content planning and get a step-by-step guide to building your own.",
    readTime: "12 min read",
    date: "Dec 12, 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    title: "From Bounce to Buy: Optimizing Landing Page Copy for Maximum Conversions",
    category: "SEO & Strategy",
    excerpt: "Transform your landing pages into conversion machines with these proven copywriting techniques.",
    readTime: "9 min read",
    date: "Dec 10, 2024",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    title: "What Makes a Good Copywriter Different from a Great One?",
    category: "Client-Focused",
    excerpt: "Explore the key characteristics and skills that separate exceptional copywriters from the rest.",
    readTime: "7 min read",
    date: "Dec 8, 2024",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop"
  },
  {
    id: 7,
    title: "Copywriting vs. Content Writing: What's the Real Difference?",
    category: "Client-Focused",
    excerpt: "Understand the distinct roles and purposes of copywriting versus content writing in your marketing strategy.",
    readTime: "5 min read",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
  },
  {
    id: 8,
    title: "How to Brief a Copywriter So They Deliver Exactly What You Need",
    category: "Client-Focused",
    excerpt: "Learn how to communicate your vision effectively to get the best results from your copywriting projects.",
    readTime: "6 min read",
    date: "Dec 3, 2024",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop"
  },
  {
    id: 9,
    title: "The ROI of Professional Copywriting: Why It's Worth the Investment",
    category: "Client-Focused",
    excerpt: "Discover the measurable impact professional copywriting can have on your business bottom line.",
    readTime: "8 min read",
    date: "Nov 30, 2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
  },
  {
    id: 10,
    title: "How Long Should Your Website Copy Be? A Guide by Industry",
    category: "Client-Focused",
    excerpt: "Get industry-specific guidelines for optimal copy length that balances thoroughness with readability.",
    readTime: "7 min read",
    date: "Nov 28, 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  },
  {
    id: 11,
    title: "The Psychology Behind Click-Worthy Headlines",
    category: "Psychology",
    excerpt: "Dive into the psychological triggers that make headlines irresistible and drive higher click-through rates.",
    readTime: "9 min read",
    date: "Nov 25, 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
  },
  {
    id: 12,
    title: "How to Use Emotional Triggers in Your Sales Copy",
    category: "Psychology",
    excerpt: "Master the art of emotional copywriting to create deeper connections and drive more conversions.",
    readTime: "10 min read",
    date: "Nov 22, 2024",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"
  },
  {
    id: 13,
    title: "FOMO, Scarcity, and Urgency: Copywriting Techniques That Work",
    category: "Psychology",
    excerpt: "Learn how to ethically leverage psychological principles to motivate action in your marketing copy.",
    readTime: "8 min read",
    date: "Nov 20, 2024",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop"
  },
  {
    id: 14,
    title: "Storytelling in Marketing: How to Turn Features into Feelings",
    category: "Psychology",
    excerpt: "Transform dry product features into compelling narratives that resonate with your audience emotionally.",
    readTime: "11 min read",
    date: "Nov 18, 2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
  },
  {
    id: 15,
    title: "Using Social Proof in Your Copy to Boost Trust and Sales",
    category: "Psychology",
    excerpt: "Harness the power of social validation to build credibility and increase conversion rates.",
    readTime: "7 min read",
    date: "Nov 15, 2024",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop"
  },
  {
    id: 16,
    title: "How to Structure a High-Converting Product Description",
    category: "Practical Tips",
    excerpt: "Get the proven framework for writing product descriptions that sell and convert browsers into buyers.",
    readTime: "9 min read",
    date: "Nov 12, 2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
  },
  {
    id: 17,
    title: "A Step-by-Step Framework for Writing Better Email Campaigns",
    category: "Practical Tips",
    excerpt: "Follow this comprehensive guide to create email campaigns that engage subscribers and drive results.",
    readTime: "12 min read",
    date: "Nov 10, 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  },
  {
    id: 18,
    title: "How to Write a Compelling 'About Us' Page That Converts",
    category: "Practical Tips",
    excerpt: "Transform your About page from a boring biography into a powerful conversion tool.",
    readTime: "8 min read",
    date: "Nov 8, 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
  },
  {
    id: 19,
    title: "Writing CTAs That Don't Suck: A Copywriter's Guide",
    category: "Practical Tips",
    excerpt: "Create call-to-action buttons and phrases that actually motivate people to take the next step.",
    readTime: "6 min read",
    date: "Nov 5, 2024",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop"
  },
  {
    id: 20,
    title: "How to Edit Your Own Copy Like a Pro (Even If You're Not One)",
    category: "Practical Tips",
    excerpt: "Learn the professional editing techniques that will elevate your writing and catch errors before they go live.",
    readTime: "10 min read",
    date: "Nov 3, 2024",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop"
  },
  {
    id: 21,
    title: "Freelancer or Agency? How to Position Yourself as a Premium Copywriter",
    category: "Business Growth",
    excerpt: "Strategic advice for positioning yourself in the market to attract higher-paying clients and projects.",
    readTime: "11 min read",
    date: "Nov 1, 2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
  },
  {
    id: 22,
    title: "Pricing Your Copywriting Services: Value-Based vs. Hourly Models",
    category: "Business Growth",
    excerpt: "Understand different pricing strategies and choose the model that maximizes your earning potential.",
    readTime: "9 min read",
    date: "Oct 30, 2024",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop"
  },
  {
    id: 23,
    title: "How to Land High-Paying Copywriting Clients Without Cold Pitching",
    category: "Business Growth",
    excerpt: "Discover proven strategies for attracting premium clients through value-driven marketing approaches.",
    readTime: "10 min read",
    date: "Oct 28, 2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop"
  },
  {
    id: 24,
    title: "Building a Portfolio That Attracts Real Clients (Not Just Friends)",
    category: "Business Growth",
    excerpt: "Create a professional portfolio that showcases your skills and attracts serious business inquiries.",
    readTime: "8 min read",
    date: "Oct 25, 2024",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
  },
  {
    id: 25,
    title: "Why Investing in Your Personal Brand Will Skyrocket Your Copywriting Career",
    category: "Business Growth",
    excerpt: "Learn how building a strong personal brand can differentiate you and command premium rates.",
    readTime: "12 min read",
    date: "Oct 22, 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
  }
];

const categoryColors = {
  "SEO & Strategy": "bg-blue-100 text-blue-800",
  "Client-Focused": "bg-green-100 text-green-800",
  "Psychology": "bg-purple-100 text-purple-800",
  "Practical Tips": "bg-orange-100 text-orange-800",
  "Business Growth": "bg-red-100 text-red-800"
};

const Blog = () => {
  console.log("Rendering Blog page");
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-copywriter-navy to-gray-800 text-white py-20 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Copywriting Insights & Strategies
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Expert advice, proven techniques, and practical tips to elevate your copywriting game
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge 
                      className={`absolute top-3 left-3 ${categoryColors[post.category as keyof typeof categoryColors]}`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Liviu M.C.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-copywriter-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest copywriting tips, strategies, and insights delivered straight to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
