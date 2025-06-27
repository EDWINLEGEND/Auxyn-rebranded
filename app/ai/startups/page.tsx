"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar,
  DollarSign,
  BarChart3,
  Target,
  Building,
  Rocket,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Star,
  Plus
} from "lucide-react";
import Link from "next/link";

// Mock data for startup ideas and companies
const mockStartups = [
  {
    id: 1,
    name: "AI Analytics Pro",
    title: "AI-powered Resume Analyzer",
    description: "Advanced AI-powered business analytics platform that analyzes resumes and provides personalized feedback to job seekers.",
    category: "SaaS",
    industry: "HR Tech",
    stage: "Series A",
    location: "San Francisco, CA",
    founded: 2022,
    teamSize: 25,
    fundingGoal: "$5M",
    currentRaise: "$3.2M",
    valuation: "$25M",
    revenue: "$2M ARR",
    growth: "+180% YoY",
    creator: "Alex Morgan",
    createdAt: "2023-10-15",
    upvotes: 145,
    downvotes: 12,
    comments: 24,
    tags: ["AI", "Career", "Job Search"],
    metrics: {
      users: "10K+",
      retention: "95%",
      nps: "72"
    }
  },
  {
    id: 2,
    name: "GreenTech Solutions",
    title: "Local Food Marketplace",
    description: "A platform connecting consumers directly with local farmers and food producers, reducing food miles and supporting local economies.",
    category: "Marketplace",
    industry: "Food",
    stage: "Seed",
    location: "Austin, TX",
    founded: 2023,
    teamSize: 12,
    fundingGoal: "$2M",
    currentRaise: "$1.5M",
    valuation: "$8M",
    revenue: "$500K ARR",
    growth: "+250% YoY",
    creator: "Jamie Oliver",
    createdAt: "2023-08-03",
    upvotes: 98,
    downvotes: 7,
    comments: 16,
    tags: ["Sustainability", "Local Economy", "Food"],
    metrics: {
      users: "500+",
      retention: "88%",
      nps: "68"
    }
  },
  {
    id: 3,
    name: "HealthStream",
    title: "Remote Team Collaboration App",
    description: "Telemedicine platform connecting patients with specialized healthcare providers and remote team collaboration tools.",
    category: "SaaS",
    industry: "HealthTech",
    stage: "Series B",
    location: "Boston, MA",
    founded: 2021,
    teamSize: 45,
    fundingGoal: "$15M",
    currentRaise: "$12M",
    valuation: "$80M",
    revenue: "$8M ARR",
    growth: "+120% YoY",
    creator: "Sarah Kim",
    createdAt: "2024-01-20",
    upvotes: 173,
    downvotes: 15,
    comments: 32,
    tags: ["Remote Work", "Collaboration", "HealthTech"],
    metrics: {
      users: "50K+",
      retention: "92%",
      nps: "78"
    }
  }
];

export default function StartupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [votedIdeas, setVotedIdeas] = useState<Record<number, "up" | "down" | null>>({});

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || startup.stage.toLowerCase().includes(activeTab.toLowerCase());
    
    return matchesSearch && matchesTab;
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
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <Rocket className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Startup Community</h1>
          <p className="text-slate-600 dark:text-slate-400">Discover, share, and connect with innovative startup ideas</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search startup ideas, industries, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Ideas</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="discussed">Most Discussed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStartups.length}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Community submissions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Votes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">139</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Per startup idea</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Comments this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hot Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SaaS</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Most popular category</p>
          </CardContent>
        </Card>
      </div>

      {/* Startup Cards */}
      <div className="space-y-6">
        {filteredStartups.map((startup) => (
          <Card key={startup.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">{startup.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{startup.category}</Badge>
                        <Badge variant="outline">{startup.industry}</Badge>
                        <Badge variant="outline">{startup.stage}</Badge>
                        {startup.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant={votedIdeas[startup.id] === "up" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleVote(startup.id, "up")}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {startup.upvotes}
                      </Button>
                      <Button
                        variant={votedIdeas[startup.id] === "down" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => handleVote(startup.id, "down")}
                        className="flex items-center gap-1"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        {startup.downvotes}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Location</div>
                      <div className="font-semibold flex items-center justify-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {startup.location}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Team Size</div>
                      <div className="font-semibold flex items-center justify-center gap-1">
                        <Users className="h-3 w-3" />
                        {startup.teamSize}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Founded</div>
                      <div className="font-semibold flex items-center justify-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {startup.founded}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Revenue</div>
                      <div className="font-semibold text-green-600">{startup.revenue}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      By {startup.creator} • {startup.createdAt}
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {startup.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Metrics Sidebar */}
                <div className="lg:w-64 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Key Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Users</span>
                      <span className="font-semibold">{startup.metrics.users}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Retention</span>
                      <span className="font-semibold text-green-600">{startup.metrics.retention}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">NPS Score</span>
                      <span className="font-semibold">{startup.metrics.nps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Growth</span>
                      <span className="font-semibold text-blue-600">{startup.growth}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Fundraising</span>
                      <span className="text-sm font-medium">{startup.currentRaise} / {startup.fundingGoal}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 rounded-full h-2"
                        style={{ 
                          width: `${(parseFloat(startup.currentRaise.replace('$', '').replace('M', '')) / parseFloat(startup.fundingGoal.replace('$', '').replace('M', ''))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button className="w-full" size="sm">
                      <Target className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="p-8">
          <div className="max-w-2xl mx-auto">
            <Rocket className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-2xl font-semibold mb-4">Share Your Startup Idea</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Join our community of entrepreneurs and get feedback on your startup concept. 
              Share your idea and connect with like-minded founders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Generate New Idea
                </Button>
              </Link>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Submit Existing Idea
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 