"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Eye,
  Heart,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  Zap,
  BarChart3,
  Target,
  Globe,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StartupData {
  id: number;
  name: string;
  description: string;
  logo?: string;
  industry: string[];
  stage: string;
  location: string;
  foundedYear: number;
  
  // Funding info
  fundingNeeded: string;
  equityOffered: string;
  currentValuation: string;
  previousRounds?: string[];
  
  // Team & traction
  teamSize: number;
  revenue: string;
  growth: string;
  customers: number;
  
  // Additional info
  website?: string;
  businessModel: string;
  targetMarket: string;
  
  // Metadata
  verified: boolean;
  featured: boolean;
  trending: boolean;
  lastActive: string;
  responseRate: number;
  
  // Metrics
  views: number;
  interests: number;
  bookmarks: number;
}

interface StartupDiscoveryGridProps {
  startups: StartupData[];
  onViewStartup: (startupId: number) => void;
  onExpressInterest: (startupId: number) => void;
  onBookmarkStartup: (startupId: number) => void;
  savedStartups?: number[];
  interestedStartups?: number[];
}

const mockStartups: StartupData[] = [
  {
    id: 1,
    name: "TechFlow Solutions",
    description: "AI-powered workflow automation platform that helps enterprise clients reduce operational costs by 40% while improving efficiency across departments.",
    industry: ["SaaS", "AI/ML", "Enterprise"],
    stage: "Series A",
    location: "San Francisco, CA",
    foundedYear: 2022,
    fundingNeeded: "$2M",
    equityOffered: "15%",
    currentValuation: "$12M",
    previousRounds: ["Pre-seed: $500K", "Seed: $1.5M"],
    teamSize: 12,
    revenue: "$500K ARR",
    growth: "+200% YoY",
    customers: 45,
    website: "https://techflow.com",
    businessModel: "SaaS Subscription",
    targetMarket: "Enterprise companies with 500+ employees",
    verified: true,
    featured: true,
    trending: true,
    lastActive: "2 hours ago",
    responseRate: 85,
    views: 1250,
    interests: 23,
    bookmarks: 45
  },
  {
    id: 2,
    name: "GreenEnergy Innovations",
    description: "Revolutionary solar panel technology with 40% higher efficiency than traditional panels, making renewable energy more accessible and cost-effective.",
    industry: ["CleanTech", "Hardware", "Energy"],
    stage: "Seed",
    location: "Austin, TX",
    foundedYear: 2021,
    fundingNeeded: "$1.5M",
    equityOffered: "20%",
    currentValuation: "$8M",
    previousRounds: ["Pre-seed: $300K"],
    teamSize: 8,
    revenue: "Pre-revenue",
    growth: "N/A",
    customers: 0,
    website: "https://greenenergy.com",
    businessModel: "Hardware Sales + Licensing",
    targetMarket: "Residential and commercial solar installers",
    verified: true,
    featured: false,
    trending: false,
    lastActive: "1 day ago",
    responseRate: 72,
    views: 890,
    interests: 15,
    bookmarks: 28
  },
  {
    id: 3,
    name: "HealthAI Diagnostics",
    description: "AI-powered medical diagnostic platform that improves diagnostic accuracy by 40% and reduces time to diagnosis from days to minutes.",
    industry: ["HealthTech", "AI/ML", "Medical"],
    stage: "Series A",
    location: "Boston, MA",
    foundedYear: 2020,
    fundingNeeded: "$3M",
    equityOffered: "12%",
    currentValuation: "$25M",
    previousRounds: ["Seed: $2M", "Series A: $5M"],
    teamSize: 15,
    revenue: "$1.2M ARR",
    growth: "+150% YoY",
    customers: 25,
    website: "https://healthai.com",
    businessModel: "SaaS + Per-diagnosis fees",
    targetMarket: "Hospitals and diagnostic centers",
    verified: true,
    featured: true,
    trending: false,
    lastActive: "5 hours ago",
    responseRate: 78,
    views: 2100,
    interests: 38,
    bookmarks: 67
  }
];

const industries = ["All", "SaaS", "AI/ML", "HealthTech", "FinTech", "CleanTech", "EdTech", "E-commerce", "Enterprise", "Hardware"];
const stages = ["All", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"];
const locations = ["All", "San Francisco, CA", "New York, NY", "Boston, MA", "Austin, TX", "Seattle, WA", "Los Angeles, CA"];

export const StartupDiscoveryGrid: React.FC<StartupDiscoveryGridProps> = ({
  startups = mockStartups,
  onViewStartup,
  onExpressInterest,
  onBookmarkStartup,
  savedStartups = [],
  interestedStartups = []
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "funding" | "traction">("trending");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.industry.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === "All" || startup.industry.includes(selectedIndustry);
    const matchesStage = selectedStage === "All" || startup.stage === selectedStage;
    const matchesLocation = selectedLocation === "All" || startup.location === selectedLocation;

    return matchesSearch && matchesIndustry && matchesStage && matchesLocation;
  });

  const sortedStartups = [...filteredStartups].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "trending":
        comparison = (b.views + b.interests * 10) - (a.views + a.interests * 10);
        break;
      case "recent":
        const aHours = a.lastActive.includes("hour") ? parseInt(a.lastActive) : parseInt(a.lastActive) * 24;
        const bHours = b.lastActive.includes("hour") ? parseInt(b.lastActive) : parseInt(b.lastActive) * 24;
        comparison = aHours - bHours;
        break;
      case "funding":
        const aFunding = parseFloat(a.fundingNeeded.replace(/[$MK]/g, '')) * (a.fundingNeeded.includes('M') ? 1000000 : 1000);
        const bFunding = parseFloat(b.fundingNeeded.replace(/[$MK]/g, '')) * (b.fundingNeeded.includes('M') ? 1000000 : 1000);
        comparison = aFunding - bFunding;
        break;
      case "traction":
        const aTraction = a.revenue === "Pre-revenue" ? 0 : parseFloat(a.revenue.replace(/[$MK]/g, '')) * (a.revenue.includes('M') ? 1000000 : 1000);
        const bTraction = b.revenue === "Pre-revenue" ? 0 : parseFloat(b.revenue.replace(/[$MK]/g, '')) * (b.revenue.includes('M') ? 1000000 : 1000);
        comparison = aTraction - bTraction;
        break;
    }
    
    return sortOrder === "desc" ? -comparison : comparison;
  });

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'pre-seed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'seed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'series a': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'series b': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'series c+': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'growth': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const renderStartupCard = (startup: StartupData, index: number) => (
    <motion.div
      key={startup.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
        {/* Featured/Trending badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {startup.featured && (
            <Badge className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {startup.trending && (
            <Badge className="bg-red-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Bookmark button */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBookmarkStartup(startup.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          >
            {savedStartups.includes(startup.id) ? (
              <BookmarkCheck className="h-4 w-4 text-blue-500" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg line-clamp-1">{startup.name}</CardTitle>
                {startup.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStageColor(startup.stage)}>
                  {startup.stage}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {startup.fundingNeeded}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {startup.description}
          </p>

          {/* Industries */}
          <div className="flex flex-wrap gap-1">
            {startup.industry.slice(0, 3).map(ind => (
              <Badge key={ind} variant="secondary" className="text-xs">
                {ind}
              </Badge>
            ))}
            {startup.industry.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{startup.industry.length - 3}
              </Badge>
            )}
          </div>

          {/* Key metrics */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{startup.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-blue-400" />
              <span>{startup.teamSize} team members</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <BarChart3 className="h-4 w-4 text-green-400" />
              <span>{startup.revenue}</span>
              {startup.growth !== "N/A" && (
                <Badge variant="outline" className="text-xs text-green-600">
                  {startup.growth}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Founded {startup.foundedYear}</span>
            </div>
          </div>

          {/* Engagement metrics */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {startup.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {startup.interests}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {startup.responseRate}%
              </span>
            </div>
            <span>Active {startup.lastActive}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewStartup(startup.id)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            
            {!interestedStartups.includes(startup.id) ? (
              <Button
                size="sm"
                onClick={() => onExpressInterest(startup.id)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <Heart className="h-4 w-4 mr-1" />
                Express Interest
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-green-500 text-green-600"
                disabled
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Interest Sent
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Discover Startups
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your next investment opportunity from {startups.length} startups
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {sortedStartups.length} results
          </Badge>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search startups by name, description, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              >
                <option value="trending">Trending</option>
                <option value="recent">Recent Activity</option>
                <option value="funding">Funding Amount</option>
                <option value="traction">Traction</option>
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="p-2"
              >
                {sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filter Startups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Industry</label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    >
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Stage</label>
                    <select
                      value={selectedStage}
                      onChange={(e) => setSelectedStage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedIndustry("All");
                      setSelectedStage("All");
                      setSelectedLocation("All");
                      setSearchTerm("");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Grid */}
      {sortedStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedStartups.map((startup, index) => renderStartupCard(startup, index))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No startups found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search criteria or filters to find more startups.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedIndustry("All");
                    setSelectedStage("All");
                    setSelectedLocation("All");
                    setSearchTerm("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load More Button */}
      {sortedStartups.length > 0 && sortedStartups.length >= 9 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Startups
          </Button>
        </div>
      )}
    </div>
  );
}; 