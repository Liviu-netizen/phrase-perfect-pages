
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Image, Search, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  public_url: string;
  created_at: string;
}

interface ImagePickerProps {
  selectedImage: string;
  onImageSelect: (url: string) => void;
}

const ImagePicker = ({ selectedImage, onImageSelect }: ImagePickerProps) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadMediaFiles();
    }
  }, [isOpen]);

  const loadMediaFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .ilike('file_type', 'image/%')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error) {
      console.error('Error loading media files:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.original_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageSelect = (url: string) => {
    onImageSelect(url);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full">
          <Image className="w-4 h-4 mr-2" />
          {selectedImage ? "Change Image" : "Select Image from Media"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Image from Media Library</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Current Selection */}
          {selectedImage && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Currently selected image</p>
                    <p className="text-xs text-gray-500 truncate">{selectedImage}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleImageSelect("")}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Grid */}
          {loading ? (
            <div className="text-center py-8">Loading images...</div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "No images found matching your search." : "No images uploaded yet."}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <Card 
                  key={file.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedImage === file.public_url ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleImageSelect(file.public_url)}
                >
                  <CardContent className="p-3">
                    <div className="relative">
                      <img 
                        src={file.public_url} 
                        alt={file.original_name}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      {selectedImage === file.public_url && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate">{file.original_name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePicker;
