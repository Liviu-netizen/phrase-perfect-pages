
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Error", 
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      // Get existing subscribers or initialize empty array
      const existingSubscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
      
      // Check if email already exists
      if (existingSubscribers.find((subscriber: any) => subscriber.email === email)) {
        toast({
          title: "Already subscribed",
          description: "This email is already subscribed to our newsletter",
          variant: "destructive",
        });
        setIsSubscribing(false);
        return;
      }

      // Add new subscriber
      const newSubscriber = {
        id: Date.now(),
        email,
        subscribedAt: new Date().toISOString(),
      };

      existingSubscribers.push(newSubscriber);
      localStorage.setItem('newsletterSubscribers', JSON.stringify(existingSubscribers));

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });

      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
      <Input 
        type="email" 
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg text-gray-900"
        disabled={isSubscribing}
      />
      <Button 
        type="submit" 
        className="btn-primary"
        disabled={isSubscribing}
      >
        {isSubscribing ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default NewsletterSubscribe;
