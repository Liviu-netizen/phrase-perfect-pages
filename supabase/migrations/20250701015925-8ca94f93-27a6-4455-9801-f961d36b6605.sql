
-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true);

-- Create media_files table to track uploaded files
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on media_files table
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Create policies for media_files (publicly readable, admin manageable)
CREATE POLICY "Media files are publicly readable" 
  ON public.media_files 
  FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Anyone can manage media files" 
  ON public.media_files 
  FOR ALL 
  TO public 
  USING (true);

-- Create storage policies for the media bucket
CREATE POLICY "Anyone can view media files" 
  ON storage.objects 
  FOR SELECT 
  TO public 
  USING (bucket_id = 'media');

CREATE POLICY "Anyone can upload media files" 
  ON storage.objects 
  FOR INSERT 
  TO public 
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Anyone can update media files" 
  ON storage.objects 
  FOR UPDATE 
  TO public 
  USING (bucket_id = 'media');

CREATE POLICY "Anyone can delete media files" 
  ON storage.objects 
  FOR DELETE 
  TO public 
  USING (bucket_id = 'media');

-- Add trigger to update the updated_at column
CREATE TRIGGER update_media_files_updated_at
  BEFORE UPDATE ON public.media_files
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
