
import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Flag, 
  PlusCircle,
  TrendingUp,
  Clock,
  UserPlus,
  Award,
  ShieldAlert,
  Droplets,
  Leaf,
  BarChart4,
  Activity
} from "lucide-react";

// Define types
type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
};

type Category = {
  id: string;
  name: string;
  icon: JSX.Element;
  postCount: number;
};

const Community = () => {
  // Sample community forum data
  const categories: Category[] = [
    { id: "dengue", name: "Dengue Prevention", icon: <Droplets size={16} />, postCount: 24 },
    { id: "mental", name: "Mental Health", icon: <Brain size={16} />, postCount: 18 },
    { id: "community", name: "Community Action", icon: <UserPlus size={16} />, postCount: 32 },
    { id: "wellness", name: "Wellness", icon: <Heart size={16} />, postCount: 15 },
    { id: "environment", name: "Environmental Health", icon: <Leaf size={16} />, postCount: 22 },
    { id: "statistics", name: "Health Statistics", icon: <BarChart4 size={16} />, postCount: 11 },
    { id: "emergency", name: "Emergency Response", icon: <ShieldAlert size={16} />, postCount: 8 },
    { id: "fitness", name: "Fitness", icon: <Activity size={16} />, postCount: 19 }
  ];

  const allPosts: Post[] = [
    {
      id: "1",
      title: "Tips for preventing dengue during monsoon season",
      content: "I've noticed an increase in mosquitoes in my area. Here are some preventive measures I'm taking: clearing stagnant water, using mosquito nets and repellents, and wearing full-sleeve clothes. What else can we do as a community?",
      author: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=36",
      date: "2 days ago",
      category: "dengue",
      likes: 45,
      comments: 12,
      isLiked: false
    },
    {
      id: "2",
      title: "Mental health resources available in Andheri West",
      content: "I'm looking for affordable mental health counseling in Andheri West. I've found a few options but would appreciate recommendations from anyone who has had positive experiences with therapists in this area.",
      author: "Rahul Patel",
      avatar: "https://i.pravatar.cc/150?img=68",
      date: "3 days ago",
      category: "mental",
      likes: 32,
      comments: 8,
      isLiked: false
    },
    {
      id: "3",
      title: "Organizing a community cleanup in Dharavi",
      content: "I'm planning to organize a community cleanup this weekend to address some of the sanitation issues in our area. Looking for volunteers and any suggestions on what we should focus on first.",
      author: "Aditya Kumar",
      avatar: "https://i.pravatar.cc/150?img=12",
      date: "1 week ago",
      category: "community",
      likes: 76,
      comments: 24,
      isLiked: true
    },
    {
      id: "4",
      title: "Weekly yoga sessions at Juhu Beach",
      content: "I'm starting free yoga sessions every Sunday morning at Juhu Beach to promote physical and mental wellbeing. All levels welcome! We'll focus on breathing techniques that can help with stress and anxiety.",
      author: "Neha Gupta",
      avatar: "https://i.pravatar.cc/150?img=45",
      date: "5 days ago",
      category: "wellness",
      likes: 52,
      comments: 15,
      isLiked: false
    },
    {
      id: "5",
      title: "Air quality concerns in Powai area",
      content: "Has anyone else noticed the declining air quality in Powai? I've been experiencing more respiratory issues lately and wondering if others are facing similar problems. Are there any community initiatives addressing this?",
      author: "Vikram Desai",
      avatar: "https://i.pravatar.cc/150?img=22",
      date: "3 days ago",
      category: "environment",
      likes: 38,
      comments: 21,
      isLiked: false
    },
    {
      id: "6",
      title: "COVID-19 vaccination drives in South Mumbai",
      content: "I'm organizing a vaccination drive for senior citizens in South Mumbai next month. We need volunteers to help with registration and logistics. Please comment if you're interested in helping out.",
      author: "Anjali Mehta",
      avatar: "https://i.pravatar.cc/150?img=32",
      date: "1 day ago",
      category: "community",
      likes: 65,
      comments: 31,
      isLiked: false
    },
    {
      id: "7",
      title: "Latest dengue statistics in Mumbai suburbs",
      content: "According to the latest BMC report, there's been a 30% increase in dengue cases in the suburbs. Has anyone noticed any preventive measures being taken by local authorities?",
      author: "Rohan Kapur",
      avatar: "https://i.pravatar.cc/150?img=60",
      date: "4 days ago",
      category: "statistics",
      likes: 42,
      comments: 18,
      isLiked: false
    },
    {
      id: "8",
      title: "Guided meditation for stress management",
      content: "I'm a certified meditation instructor offering free guided sessions for stress management every Wednesday evening online. Sessions are 30 minutes and perfect for beginners.",
      author: "Maya Shah",
      avatar: "https://i.pravatar.cc/150?img=55",
      date: "6 days ago",
      category: "mental",
      likes: 48,
      comments: 23,
      isLiked: false
    }
  ];

  const [posts, setPosts] = useState<Post[]>(allPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on selected category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery.trim() === "" ? true : 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Toggle like on a post
  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Unselect if already selected
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <Helmet>
        <title>Community Forum | Health Resilience Portal</title>
        <meta name="description" content="Connect with the Mumbai community to discuss health concerns, share resources, and organize initiatives." />
      </Helmet>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
            Community Health Forum
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Connect with others, share experiences, and contribute to making Mumbai a healthier city
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-6 sticky top-24">
              <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-4">
                  <CardTitle>Discussion Categories</CardTitle>
                  <CardDescription>
                    Browse topics by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div 
                        key={category.id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md cursor-pointer transition-all",
                          selectedCategory === category.id 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center",
                            selectedCategory === category.id
                              ? "bg-primary/20 text-primary"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          )}>
                            {category.icon}
                          </div>
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                          {category.postCount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gradient-to-r from-primary/5 to-accent/5 pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedCategory(null)}
                  >
                    View All Categories
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-4">
                  <CardTitle>Start a Discussion</CardTitle>
                  <CardDescription>
                    Share your thoughts or questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                    <PlusCircle size={16} />
                    New Discussion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main content - Posts */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    {selectedCategory ? (
                      <>
                        {categories.find(c => c.id === selectedCategory)?.icon}
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </>
                    ) : (
                      'Community Discussions'
                    )}
                  </CardTitle>
                  <div className="w-full md:w-auto">
                    <Input 
                      placeholder="Search discussions..." 
                      className="w-full md:max-w-[220px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="popular" className="w-full">
                  <TabsList className="mb-4 w-full md:w-auto">
                    <TabsTrigger value="popular" className="flex items-center gap-1 flex-1 md:flex-none">
                      <TrendingUp size={14} />
                      Popular
                    </TabsTrigger>
                    <TabsTrigger value="recent" className="flex items-center gap-1 flex-1 md:flex-none">
                      <Clock size={14} />
                      Recent
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="popular" className="space-y-4">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.sort((a, b) => b.likes - a.likes).map((post) => (
                        <PostCard 
                          key={post.id} 
                          post={post} 
                          onLike={() => toggleLike(post.id)}
                          categoryName={categories.find(c => c.id === post.category)?.name || post.category}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-500">No discussions found. Try a different category or search term.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="recent" className="space-y-4">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <PostCard 
                          key={post.id} 
                          post={post} 
                          onLike={() => toggleLike(post.id)}
                          categoryName={categories.find(c => c.id === post.category)?.name || post.category}
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-500">No discussions found. Try a different category or search term.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-center border-t bg-gradient-to-r from-primary/5 to-accent/5 pt-4">
                <Button variant="outline">Load More</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PostCardProps {
  post: Post;
  onLike: () => void;
  categoryName: string;
}

const PostCard = ({ post, onLike, categoryName }: PostCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={post.avatar} alt={post.author} />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author}</div>
            <div className="text-xs text-slate-500">{post.date}</div>
          </div>
          <div className="ml-auto px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {categoryName}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">{post.content}</p>
        
        <div className="flex items-center justify-between border-t pt-3 mt-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={onLike}
              className={`flex items-center gap-1 text-sm ${post.isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}
            >
              <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
              {post.likes}
            </button>
            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary">
              <MessageSquare size={18} />
              {post.comments}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-slate-500 hover:text-primary">
              <Share2 size={18} />
            </button>
            <button className="p-1 text-slate-500 hover:text-red-500">
              <Flag size={18} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Community;
