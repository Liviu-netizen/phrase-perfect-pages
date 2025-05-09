
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to track page views
export const trackPageView = async (page: string) => {
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
  }
};
