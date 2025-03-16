
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Layers, AlertTriangle, Info, RefreshCw, Calendar, Filter } from "lucide-react";

const DengueMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("weekly");
  const [severity, setSeverity] = useState("all");
  const [visualizationMode, setVisualizationMode] = useState("heatmap");
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mock data for the stats
  const stats = [
    { label: "Active Cases", value: "2,847", change: "+12%", trend: "up" },
    { label: "High-Risk Zones", value: "32", change: "+3", trend: "up" },
    { label: "Recovery Rate", value: "76%", change: "+2%", trend: "up" },
    { label: "Alert Level", value: "Moderate", trend: "neutral" }
  ];
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Mumbai Dengue Outbreak Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time visualization of dengue-affected areas, infection density, and outbreak trends across Mumbai.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, i) => (
            <Card key={i} className={`backdrop-blur-sm ${i === 3 && stat.trend === 'up' ? 'border-destructive/50 bg-destructive/5' : 'glass-panel-sm'}`}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.change && (
                    <div className={`text-xs font-medium flex items-center ${
                      stat.trend === 'up' 
                        ? i === 2 ? 'text-green-500' : 'text-red-500' 
                        : stat.trend === 'down' 
                          ? i === 2 ? 'text-red-500' : 'text-green-500'
                          : 'text-yellow-500'
                    }`}>
                      {stat.trend === 'up' && <span className="mr-1">↑</span>}
                      {stat.trend === 'down' && <span className="mr-1">↓</span>}
                      {stat.trend === 'neutral' && <AlertTriangle size={12} className="mr-1" />}
                      {stat.change}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Last card with refresh */}
          <Card className="glass-panel-sm">
            <CardHeader className="pb-2">
              <CardDescription className="flex justify-between">
                <span>Last Updated</span>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <RefreshCw size={12} />
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">Today, 3:45 PM</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls panel */}
          <Card className="glass-panel-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Map Controls</CardTitle>
              <CardDescription>
                Filter and customize the dengue outbreak visualization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Calendar size={14} />
                  Time Period
                </label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <AlertTriangle size={14} />
                  Severity Level
                </label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High Risk Only</SelectItem>
                    <SelectItem value="moderate">Moderate & High</SelectItem>
                    <SelectItem value="low">Low Risk Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Layers size={14} />
                  Visualization Mode
                </label>
                <Tabs value={visualizationMode} onValueChange={setVisualizationMode} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                    <TabsTrigger value="markers">Markers</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <Filter size={14} />
                  Intensity Threshold
                </label>
                <Slider defaultValue={[65]} max={100} step={5} className="py-4" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Reset Filters
              </Button>
            </CardFooter>
          </Card>
          
          {/* Map area */}
          <Card className="glass-panel h-[600px] lg:col-span-3 relative overflow-hidden">
            <CardContent className="absolute inset-0 p-0">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mb-3" />
                    <p className="text-sm font-medium">Loading map data...</p>
                  </div>
                </div>
              ) : (
                <div 
                  ref={mapRef} 
                  className="h-full w-full bg-slate-100 dark:bg-slate-800 relative"
                >
                  {/* Placeholder for actual map implementation */}
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=19.0760,72.8777&zoom=11&size=800x800&scale=2&maptype=roadmap&style=feature:all|element:labels|visibility:off&key=YOUR_API_KEY')] bg-cover bg-center opacity-70" />
                  
                  {/* Heatmap overlay simulation */}
                  <div className="absolute inset-0">
                    {/* These would be replaced by actual heatmap visualization */}
                    <div className="absolute h-32 w-32 rounded-full bg-red-500/30 blur-xl top-1/4 left-1/4" />
                    <div className="absolute h-48 w-48 rounded-full bg-red-500/40 blur-xl top-1/3 left-1/3" />
                    <div className="absolute h-40 w-40 rounded-full bg-red-500/30 blur-xl bottom-1/4 right-1/3" />
                    <div className="absolute h-24 w-24 rounded-full bg-orange-500/30 blur-xl top-1/2 right-1/4" />
                    <div className="absolute h-36 w-36 rounded-full bg-yellow-500/30 blur-xl bottom-1/3 left-1/4" />
                  </div>
                  
                  {/* Info button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute top-3 right-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm"
                  >
                    <Info size={16} className="mr-1" />
                    Legend
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 glass-panel-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Prevention Measures</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Steps to protect yourself and your community from dengue
              </p>
            </div>
            <Button className="text-white bg-health-teal hover:bg-health-teal/90">
              Download Prevention Guide
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Eliminate standing water where mosquitoes breed",
              "Use mosquito repellent on exposed skin",
              "Wear long-sleeved shirts and long pants",
              "Install window and door screens",
              "Use mosquito nets while sleeping",
              "Apply insecticides in dark corners of the house"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DengueMap;
