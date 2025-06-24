
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  content?: string;
}

const categoryColors = {
  "SEO & Strategy": "bg-blue-100 text-blue-800",
  "Client-Focused": "bg-green-100 text-green-800",
  "Psychology": "bg-purple-100 text-purple-800",
  "Practical Tips": "bg-orange-100 text-orange-800",
  "Business Growth": "bg-red-100 text-red-800"
};

const categories = Object.keys(categoryColors);

const BlogAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simple access key - in production, this should be more secure
  const ADMIN_ACCESS_KEY = "blogadmin2024";

  useEffect(() => {
    // Load initial blog posts data
    const initialPosts: BlogPost[] = [
      {
        id: 1,
        title: "How to Write Website Copy That Actually Converts Visitors into Customers",
        category: "SEO & Strategy",
        excerpt: "Discover the proven strategies and techniques that turn casual browsers into paying customers through compelling website copy.",
        readTime: "8 min read",
        date: "Dec 20, 2024",
        image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop",
        content: "Sample content for blog post 1..."
      },
      {
        id: 2,
        title: "The 7 Most Common Copywriting Mistakes (And How to Fix Them)",
        category: "SEO & Strategy",
        excerpt: "Learn about the critical copywriting errors that could be costing you sales and how to avoid them.",
        readTime: "6 min read",
        date: "Dec 18, 2024",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop",
        content: "Sample content for blog post 2..."
      }
      // Add more posts as needed
    ];
    
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('blogPosts', JSON.stringify(initialPosts));
    }
  }, []);

  const handleLogin = () => {
    if (accessKey === ADMIN_ACCESS_KEY) {
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "Welcome to the blog admin panel.",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Invalid access key. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSavePost = () => {
    if (!editingPost) return;

    const updatedPosts = editingPost.id === 0 
      ? [...posts, { ...editingPost, id: Math.max(...posts.map(p => p.id)) + 1 }]
      : posts.map(post => post.id === editingPost.id ? editingPost : post);

    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setEditingPost(null);
    setIsDrawerOpen(false);
    
    toast({
      title: "Post saved",
      description: editingPost.id === 0 ? "New blog post created successfully." : "Blog post updated successfully.",
    });
  };

  const handleDeletePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    toast({
      title: "Post deleted",
      description: "Blog post has been removed.",
    });
  };

  const handleNewPost = () => {
    setEditingPost({
      id: 0,
      title: "",
      category: "SEO & Strategy",
      excerpt: "",
      readTime: "",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      image: "",
      content: ""
    });
    setIsDrawerOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsDrawerOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Blog Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter access key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Access Admin Panel
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Admin Panel</h1>
          <div className="space-x-2">
            <Button onClick={handleNewPost}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Read Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>
                      <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>{post.readTime}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditPost(post)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit/Create Post Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>
                {editingPost?.id === 0 ? 'Create New Post' : 'Edit Post'}
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-6 space-y-4 overflow-y-auto">
              {editingPost && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      placeholder="Enter post title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        value={editingPost.category}
                        onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Read Time</label>
                      <Input
                        value={editingPost.readTime}
                        onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <Input
                      value={editingPost.image}
                      onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <Textarea
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      placeholder="Brief description of the post"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Content (HTML)</label>
                    <Textarea
                      value={editingPost.content || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      placeholder="Enter the full blog post content in HTML format"
                      rows={10}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setEditingPost(null);
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSavePost}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Post
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default BlogAdmin;
