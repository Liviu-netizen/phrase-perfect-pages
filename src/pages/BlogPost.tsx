
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  read_time: string;
  date: string;
  image: string;
  content: string;
}

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
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      loadBlogPost(parseInt(id));
    }
  }, [id]);

  const loadBlogPost = async (postId: number) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;
      setBlogPost(data);
    } catch (error) {
      console.error('Error loading blog post:', error);
      setBlogPost(null);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                  <span>{blogPost.read_time}</span>
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
                dangerouslySetInnerHTML={{ __html: blogPost.content || blogPost.excerpt }}
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
