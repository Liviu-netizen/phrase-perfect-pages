
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with fallbacks for missing env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create the client if credentials are available
export const supabase = supabaseUrl && supabaseKey ? 
  createClient(supabaseUrl, supabaseKey) : 
  null;

// Function to track page views
export const trackPageView = async (page: string) => {
  // Skip tracking if Supabase isn't initialized
  if (!supabase) {
    console.log('Supabase not initialized, skipping page view tracking');
    return;
  }
  
  try {
    const { error } = await supabase
      .from('page_views')
      .insert([
        { 
          page, 
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          timestamp: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error tracking page view:', error);
    }
  } catch (err) {
    console.error('Failed to track page view:', err);
    // Don't let tracking errors break the app
  }
};
