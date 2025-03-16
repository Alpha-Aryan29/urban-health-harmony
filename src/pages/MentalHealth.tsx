
import { Helmet } from "react-helmet";
import ChatBot from "@/components/mental-health/ChatBot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageSquare, BookOpen, HeartHandshake, Users, Phone } from "lucide-react";

const MentalHealth = () => {
  const resources = [
    {
      title: "24/7 Crisis Helpline",
      description: "Immediate support for mental health emergencies",
      icon: <Phone size={20} className="text-accent" />,
    },
    {
      title: "Support Groups",
      description: "Connect with others facing similar challenges",
      icon: <Users size={20} className="text-primary" />,
    },
    {
      title: "Self-Help Resources",
      description: "Articles, guides, and tools for self-care",
      icon: <BookOpen size={20} className="text-health-teal" />,
    },
    {
      title: "Professional Counseling",
      description: "Find licensed therapists in your area",
      icon: <HeartHandshake size={20} className="text-health-blue" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-primary/5 dark:from-slate-900 dark:to-primary/10">
      <Helmet>
        <title>Mental Health Assistant | Health Resilience Portal</title>
        <meta name="description" content="AI-powered mental health support and resources for Mumbai residents." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-2 bg-accent/10 rounded-full mb-3">
              <Brain size={30} className="text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">Mental Health Assistant</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Get AI-powered mental health support and resources. All conversations are private and confidential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {resources.map((resource, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{resource.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border-none shadow-lg overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                <CardTitle>Chat with our AI Assistant</CardTitle>
              </div>
              <CardDescription>
                Talk about your feelings, get coping strategies, or find resources
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ChatBot />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;
