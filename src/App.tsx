import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/supabase";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import ChatAdminPage from "./pages/ChatAdmin";
import ScrollToTop from "./components/ScrollToTop";
import FloatingChatbot from "./components/chat/FloatingChatbot";
import BlogAdmin from "./pages/BlogAdmin";
import NewsletterAdmin from "./pages/NewsletterAdmin";

// Analytics tracker component
const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    try {
      // Track page view when location changes
      trackPageView(location.pathname);
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }, [location]);
  
  return null;
};

// Create a new QueryClient instance with error handling options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log("Rendering App component");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/chat-admin" element={<ChatAdminPage />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingChatbot />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
