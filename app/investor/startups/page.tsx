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
  Rocket
} from "lucide-react";

// Mock data for startup discovery
const mockStartups = [
  {
    id: 1,
    name: "AI Analytics Pro",
    description: "Advanced AI-powered business analytics platform for enterprise clients.",
    industry: "SaaS",
    stage: "Series A",
    location: "San Francisco, CA",
    founded: 2022,
    teamSize: 25,
    fundingGoal: "$5M",
    currentRaise: "$3.2M",
    valuation: "$25M",
    revenue: "$2M ARR",
    growth: "+180% YoY",
    investors: ["Sequoia Capital", "a16z"],
    tags: ["AI", "B2B", "Analytics"],
    metrics: {
      users: "10K+",
      retention: "95%",
      nps: "72"
    }
  },
  {
    id: 2,
    name: "GreenTech Solutions",
    description: "Renewable energy optimization software for commercial buildings.",
    industry: "CleanTech",
    stage: "Seed",
    location: "Austin, TX",
    founded: 2023,
    teamSize: 12,
    fundingGoal: "$2M",
    currentRaise: "$1.5M",
    valuation: "$8M",
    revenue: "$500K ARR",
    growth: "+250% YoY",
    investors: ["First Round", "GV"],
    tags: ["CleanTech", "B2B", "IoT"],
    metrics: {
      users: "500+",
      retention: "88%",
      nps: "68"
    }
  },
  {
    id: 3,
    name: "HealthStream",
    description: "Telemedicine platform connecting patients with specialized healthcare providers.",
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
    investors: ["NEA", "Bessemer", "Kleiner Perkins"],
    tags: ["HealthTech", "B2C", "Mobile"],
    metrics: {
      users: "50K+",
      retention: "92%",
      nps: "78"
    }
  }
];

export default function InvestorStartupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || startup.stage.toLowerCase().includes(activeTab.toLowerCase());
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <Search className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Startup Discovery</h1>
          <p className="text-slate-600 dark:text-slate-400">Discover and analyze high-potential investment opportunities</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search startups, industries, or technologies..."
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
            <TabsTrigger value="all">All Startups</TabsTrigger>
            <TabsTrigger value="seed">Seed Stage</TabsTrigger>
            <TabsTrigger value="series-a">Series A</TabsTrigger>
            <TabsTrigger value="series-b">Series B+</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Startups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStartups.length}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available opportunities</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Valuation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$37M</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Across all stages</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Raises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Currently fundraising</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Hot Sectors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AI/ML</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Most active sector</p>
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
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{startup.industry}</Badge>
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          {startup.stage}
                        </Badge>
                        {startup.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-green-500 to-teal-600">
                      <Target className="h-4 w-4 mr-2" />
                      Express Interest
                    </Button>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {startup.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{startup.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Founded {startup.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{startup.teamSize} employees</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{startup.valuation} valuation</span>
                    </div>
                  </div>

                  {/* Notable Investors */}
                  {startup.investors.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Notable Investors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {startup.investors.map((investor) => (
                          <Badge key={investor} variant="outline" className="text-xs">
                            {investor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Metrics & Funding */}
                <div className="lg:w-80 space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Funding Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Goal:</span>
                        <span className="font-medium">{startup.fundingGoal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Raised:</span>
                        <span className="font-medium text-green-600">{startup.currentRaise}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-600 rounded-full h-2"
                          style={{
                            width: `${(parseFloat(startup.currentRaise.replace('$', '').replace('M', '')) / 
                                     parseFloat(startup.fundingGoal.replace('$', '').replace('M', ''))) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Key Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Revenue: <strong>{startup.revenue}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Growth: <strong>{startup.growth}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Users: <strong>{startup.metrics.users}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">Retention: <strong>{startup.metrics.retention}</strong></span>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Request Deck
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredStartups.length === 0 && (
        <div className="text-center py-12">
          <Rocket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Startups Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
} 