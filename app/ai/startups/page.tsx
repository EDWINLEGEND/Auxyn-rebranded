"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Rocket, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Filter, 
  Search,
  TrendingUp,
  Calendar,
  Users,
  Star,
  Plus
} from "lucide-react";
import Link from "next/link";

// Mock data for startup ideas
const mockStartups = [
  {
    id: 1,
    title: "AI-powered Resume Analyzer",
    description: "An AI tool that analyzes resumes and provides personalized feedback to job seekers, helping them improve their applications and stand out to employers.",
    category: "SaaS",
    industry: "HR Tech",
    creator: "Alex Morgan",
    createdAt: "2023-10-15",
    upvotes: 145,
    downvotes: 12,
    comments: 24,
    tags: ["AI", "Career", "Job Search"],
  },
  {
    id: 2,
    title: "Local Food Marketplace",
    description: "A platform connecting consumers directly with local farmers and food producers, reducing food miles and supporting local economies while providing fresh produce.",
    category: "Marketplace",
    industry: "Food",
    creator: "Jamie Oliver",
    createdAt: "2023-08-03",
    upvotes: 98,
    downvotes: 7,
    comments: 16,
    tags: ["Sustainability", "Local Economy", "Food"],
  },
  {
    id: 3,
    title: "Remote Team Collaboration App",
    description: "An all-in-one tool for remote teams to collaborate more effectively with virtual office spaces, synchronous and asynchronous communication, and AI-powered meeting summaries.",
    category: "SaaS",
    industry: "Productivity",
    creator: "Sarah Kim",
    createdAt: "2024-01-20",
    upvotes: 173,
    downvotes: 15,
    comments: 32,
    tags: ["Remote Work", "Collaboration", "Productivity"],
  },
  {
    id: 4,
    title: "Mental Health Chatbot",
    description: "An AI chatbot providing accessible mental health support and resources to users, offering coping strategies, meditation exercises, and connections to professional help when needed.",
    category: "HealthTech",
    industry: "Healthcare",
    creator: "Dr. Michael Chen",
    createdAt: "2023-12-05",
    upvotes: 211,
    downvotes: 8,
    comments: 47,
    tags: ["Mental Health", "AI", "Healthcare"],
  },
  {
    id: 5,
    title: "Sustainable Fashion Marketplace",
    description: "A platform for buying and selling sustainable and ethically produced fashion items, with transparency about supply chains and environmental impact.",
    category: "E-commerce",
    industry: "Fashion",
    creator: "Emma Garcia",
    createdAt: "2023-11-18",
    upvotes: 87,
    downvotes: 11,
    comments: 19,
    tags: ["Sustainability", "Fashion", "E-commerce"],
  },
  {
    id: 6,
    title: "Smart Home Energy Optimizer",
    description: "IoT device and app that automatically optimizes home energy usage based on occupancy patterns, weather, and electricity rates, reducing bills and carbon footprint.",
    category: "Hardware/IoT",
    industry: "Energy",
    creator: "David Wilson",
    createdAt: "2024-02-10",
    upvotes: 123,
    downvotes: 18,
    comments: 27,
    tags: ["IoT", "Energy", "Sustainability"],
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "SaaS",
  "Marketplace",
  "E-commerce",
  "HealthTech",
  "EdTech",
  "FinTech",
  "Hardware/IoT",
];

// Industries for filtering
const industries = [
  "All Industries",
  "HR Tech",
  "Food",
  "Productivity",
  "Healthcare",
  "Fashion",
  "Energy",
  "Education",
  "Finance",
];

export default function StartupsPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [votedIdeas, setVotedIdeas] = useState<Record<number, "up" | "down" | null>>({});
  
  // Filter startups based on search, category, and industry
  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = 
      searchQuery === "" || 
      startup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All Categories" || 
      startup.category === selectedCategory;
    
    const matchesIndustry = 
      selectedIndustry === "All Industries" || 
      startup.industry === selectedIndustry;
    
    return matchesSearch && matchesCategory && matchesIndustry;
  });
  
  // Sort startups based on active tab
  const sortedStartups = [...filteredStartups].sort((a, b) => {
    if (activeTab === "trending") {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    } else if (activeTab === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (activeTab === "discussed") {
      return b.comments - a.comments;
    }
    return 0;
  });
  
  const handleVote = (id: number, voteType: "up" | "down") => {
    setVotedIdeas(prev => {
      // If already voted the same way, remove the vote
      if (prev[id] === voteType) {
        const newVotes = {...prev};
        delete newVotes[id];
        return newVotes;
      }
      
      // Otherwise set or change the vote
      return {...prev, [id]: voteType};
    });
  };
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Rocket className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Startup Community</h1>
          <p className="text-slate-600 dark:text-slate-400">Discover, share, and vote on innovative startup ideas</p>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search startup ideas..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <select
              className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          
          <div className="relative w-full md:w-auto">
            <select
              className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Idea
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="newest" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Newest
          </TabsTrigger>
          <TabsTrigger value="discussed" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Most Discussed
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="space-y-6">
        {sortedStartups.length > 0 ? (
          sortedStartups.map((startup) => (
            <Card key={startup.id} className="overflow-hidden">
              <div className="flex">
                <div className="py-4 px-3 flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <button 
                    className={`p-1 rounded-md ${votedIdeas[startup.id] === "up" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "text-slate-500 hover:text-emerald-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"}`}
                    onClick={() => handleVote(startup.id, "up")}
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </button>
                  <span className="font-bold text-sm my-1">
                    {startup.upvotes - startup.downvotes + 
                      (votedIdeas[startup.id] === "up" ? 1 : 0) - 
                      (votedIdeas[startup.id] === "down" ? 1 : 0)}
                  </span>
                  <button 
                    className={`p-1 rounded-md ${votedIdeas[startup.id] === "down" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "text-slate-500 hover:text-red-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"}`}
                    onClick={() => handleVote(startup.id, "down")}
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{startup.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {startup.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                      {startup.category}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {startup.industry}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {startup.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-primary text-white flex items-center justify-center text-xs font-bold">
                        {startup.creator.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Posted by <span className="font-medium">{startup.creator}</span> on {new Date(startup.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
                        <MessageSquare className="h-4 w-4" />
                        <span>{startup.comments} Comments</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Rocket className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No startup ideas found</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
              Try adjusting your search or filters to find what you're looking for, or add your own idea to start the conversation.
            </p>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Your Startup Idea
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 