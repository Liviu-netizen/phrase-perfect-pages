
-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  read_time TEXT NOT NULL,
  date TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts (publicly readable, no auth required for reading)
CREATE POLICY "Blog posts are publicly readable" 
  ON public.blog_posts 
  FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Anyone can manage blog posts" 
  ON public.blog_posts 
  FOR ALL 
  TO public 
  USING (true);

-- Create policies for newsletter_subscribers (publicly readable for admin, anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscribers 
  FOR INSERT 
  TO public 
  WITH CHECK (true);

CREATE POLICY "Newsletter subscribers are publicly readable" 
  ON public.newsletter_subscribers 
  FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Anyone can manage newsletter subscribers" 
  ON public.newsletter_subscribers 
  FOR ALL 
  TO public 
  USING (true);

-- Insert initial blog posts
INSERT INTO public.blog_posts (title, category, excerpt, read_time, date, image, content) VALUES 
(
  'How to Write Website Copy That Actually Converts Visitors into Customers',
  'SEO & Strategy',
  'Discover the proven strategies and techniques that turn casual browsers into paying customers through compelling website copy.',
  '8 min read',
  'Dec 20, 2024',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop',
  '<p>Writing website copy that converts is both an art and a science. It requires understanding your audience, crafting compelling messages, and strategically placing calls-to-action throughout your content.</p><p>Here are the key principles every copywriter should master...</p>'
),
(
  'The 7 Most Common Copywriting Mistakes (And How to Fix Them)',
  'SEO & Strategy', 
  'Learn about the critical copywriting errors that could be costing you sales and how to avoid them.',
  '6 min read',
  'Dec 18, 2024',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop',
  '<p>Even experienced copywriters make mistakes that can significantly impact conversion rates. Understanding these common pitfalls is the first step to creating more effective copy.</p><p>Let''s explore the most frequent errors and their solutions...</p>'
);

-- Add trigger to update the updated_at column
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
