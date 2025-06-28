"use client";

import React, { useState, useEffect } from "react";
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
  SortDesc,
  Loader2,
  RefreshCw,
  UserPlus,
  UserMinus,
  X
} from "lucide-react";
import { startupAPI, followAPI, authAPI, handleApiError, type Startup, type User } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
// import { motion, AnimatePresence } from "framer-motion";

interface StartupData {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  followers: number;
  // Enhanced UI fields (will be shown as defaults if not provided by backend)
  logo?: string;
  industry?: string[];
  stage?: string;
  location?: string;
  foundedYear?: number;
  fundingNeeded?: string;
  equityOffered?: string;
  currentValuation?: string;
  previousRounds?: string[];
  teamSize?: number;
  revenue?: string;
  growth?: string;
  customers?: number;
  website?: string;
  businessModel?: string;
  targetMarket?: string;
  verified?: boolean;
  featured?: boolean;
  trending?: boolean;
  lastActive?: string;
  responseRate?: number;
  views?: number;
  interests?: number;
  bookmarks?: number;
  totalRatings?: number;
  following?: boolean;
}

interface StartupDiscoveryGridProps {
  onViewStartup: (startupId: number) => void;
  onExpressInterest: (startupId: number) => void;
  onBookmarkStartup: (startupId: number) => void;
  onRateStartup?: (startupId: number) => void;
}

const mockStartups: StartupData[] = [
  {
    id: 1,
    name: "TechFlow Solutions",
    description: "AI-powered workflow automation platform that helps enterprise clients reduce operational costs by 40% while improving efficiency across departments.",
    category: "SaaS",
    followers: 45,
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
    bookmarks: 45,
    rating: 4.5,
    totalRatings: 127
  },
  {
    id: 2,
    name: "GreenEnergy Innovations",
    description: "Revolutionary solar panel technology with 40% higher efficiency than traditional panels, making renewable energy more accessible and cost-effective.",
    category: "CleanTech",
    followers: 28,
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
    bookmarks: 28,
    rating: 4.2,
    totalRatings: 83
  },
  {
    id: 3,
    name: "HealthAI Diagnostics",
    description: "AI-powered medical diagnostic platform that improves diagnostic accuracy by 40% and reduces time to diagnosis from days to minutes.",
    category: "HealthTech",
    followers: 67,
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
    bookmarks: 67,
    rating: 4.7,
    totalRatings: 256
  }
];

const industries = ["All", "SaaS", "AI/ML", "HealthTech", "FinTech", "CleanTech", "EdTech", "E-commerce", "Enterprise", "Hardware"];
const stages = ["All", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"];
const locations = ["All", "San Francisco, CA", "New York, NY", "Boston, MA", "Austin, TX", "Seattle, WA", "Los Angeles, CA"];

export const StartupDiscoveryGrid: React.FC<StartupDiscoveryGridProps> = ({
  onViewStartup,
  onExpressInterest,
  onBookmarkStartup,
  onRateStartup,
}) => {
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followingStartups, setFollowingStartups] = useState<Set<number>>(new Set());
  const [loadingActions, setLoadingActions] = useState<Set<number>>(new Set());
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"trending" | "recent" | "funding" | "traction">("trending");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load startups from backend
  useEffect(() => {
    loadStartups();
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      if (authAPI.isAuthenticated()) {
        const userData = authAPI.getCurrentUser();
        setCurrentUser(userData);
      }
    } catch (error) {
      console.error('Failed to load current user:', error);
    }
  };

  const loadStartups = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const startupsData = await startupAPI.getAll();
      
      // Transform backend data to match UI interface
      const transformedStartups: StartupData[] = startupsData.map(startup => ({
        ...startup,
        industry: [startup.category], // Convert category to industry array
        stage: "Seed", // Default stage
        location: "San Francisco, CA", // Default location
        foundedYear: 2022, // Default year
        fundingNeeded: "$1M", // Default funding
        equityOffered: "10%", // Default equity
        currentValuation: "$5M", // Default valuation
        teamSize: 8, // Default team size
        revenue: "Pre-revenue", // Default revenue
        growth: "N/A", // Default growth
        customers: 0, // Default customers
        businessModel: "SaaS", // Default business model
        targetMarket: "Enterprise", // Default target market
        verified: true, // Default verified
        featured: false, // Default featured
        trending: Math.random() > 0.5, // Random trending
        lastActive: "2 hours ago", // Default last active
        responseRate: Math.floor(Math.random() * 40) + 60, // Random response rate 60-100%
        views: Math.floor(Math.random() * 1000) + 100, // Random views 100-1100
        interests: Math.floor(Math.random() * 50) + 10, // Random interests 10-60
        bookmarks: Math.floor(Math.random() * 30) + 5, // Random bookmarks 5-35
        totalRatings: startup.rating ? Math.floor(Math.random() * 200) + 50 : 0, // Random total ratings if rated
        following: false // Will be updated based on user's follow status
      }));

      setStartups(transformedStartups);
    } catch (error) {
      setError(handleApiError(error));
      console.error('Failed to load startups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (startupId: number) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to follow startups.",
        variant: "destructive",
      });
      return;
    }

    if (currentUser.user_type !== 'investor') {
      toast({
        title: "Investor Only",
        description: "Only investors can follow startups.",
        variant: "destructive",
      });
      return;
    }

    setLoadingActions(prev => new Set(prev).add(startupId));
    
    try {
      const isCurrentlyFollowing = followingStartups.has(startupId);
      
      if (isCurrentlyFollowing) {
        await followAPI.unfollowStartup(startupId);
        setFollowingStartups(prev => {
          const newSet = new Set(prev);
          newSet.delete(startupId);
          return newSet;
        });
        toast({
          title: "Unfollowed",
          description: "You have unfollowed this startup.",
        });
      } else {
        await followAPI.followStartup(startupId);
        setFollowingStartups(prev => new Set(prev).add(startupId));
        toast({
          title: "Following",
          description: "You are now following this startup.",
        });
      }

      // Update follower count in startups list
      setStartups(prev => prev.map(startup => 
        startup.id === startupId 
          ? { 
              ...startup, 
              followers: isCurrentlyFollowing ? startup.followers - 1 : startup.followers + 1,
              following: !isCurrentlyFollowing
            }
          : startup
      ));
      
    } catch (error) {
      toast({
        title: "Error",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setLoadingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(startupId);
        return newSet;
      });
    }
  };

  const handleRefresh = () => {
    loadStartups();
  };
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (startup.industry && startup.industry.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()))) ||
                         startup.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === "All" || 
                           (startup.industry && startup.industry.includes(selectedIndustry)) ||
                           startup.category === selectedIndustry;
    const matchesStage = selectedStage === "All" || (startup.stage && startup.stage === selectedStage);
    const matchesLocation = selectedLocation === "All" || (startup.location && startup.location === selectedLocation);

    return matchesSearch && matchesIndustry && matchesStage && matchesLocation;
  });

  const sortedStartups = [...filteredStartups].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "trending":
        comparison = ((b.views || 0) + (b.interests || 0) * 10) - ((a.views || 0) + (a.interests || 0) * 10);
        break;
      case "recent":
        // Use rating as fallback for recent activity since lastActive is just a default string
        comparison = b.rating - a.rating;
        break;
      case "funding":
        // Use follower count as fallback for funding amount
        comparison = b.followers - a.followers;
        break;
      case "traction":
        comparison = (b.customers || 0) - (a.customers || 0);
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

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-3 w-3 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`} 
          />
        ))}
        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const renderStartupCard = (startup: StartupData, index: number) => (
    <div key={startup.id}>
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

        {/* Follow button */}
        {currentUser?.user_type === 'investor' && (
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFollow(startup.id)}
              disabled={loadingActions.has(startup.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
            >
              {loadingActions.has(startup.id) ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : followingStartups.has(startup.id) ? (
                <UserMinus className="h-4 w-4 text-red-500" />
              ) : (
                <UserPlus className="h-4 w-4 text-blue-500" />
              )}
            </Button>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg line-clamp-1">{startup.name}</CardTitle>
                {startup.verified && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              
              <div className="mb-2">
                {renderStarRating(startup.rating)}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                {startup.stage && (
                  <Badge className={getStageColor(startup.stage)}>
                    {startup.stage}
                  </Badge>
                )}
                {startup.fundingNeeded && (
                  <Badge variant="outline" className="text-xs">
                    {startup.fundingNeeded}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {startup.followers} followers
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
            {startup.industry ? (
              <>
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
              </>
            ) : (
              <Badge variant="secondary" className="text-xs">
                {startup.category}
              </Badge>
            )}
          </div>

          {/* Key metrics */}
          <div className="space-y-2">
            {startup.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{startup.location}</span>
              </div>
            )}
            
            {startup.teamSize && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-blue-400" />
                <span>{startup.teamSize} team members</span>
              </div>
            )}
            
            {startup.revenue && (
              <div className="flex items-center gap-2 text-sm">
                <BarChart3 className="h-4 w-4 text-green-400" />
                <span>{startup.revenue}</span>
                {startup.growth && startup.growth !== "N/A" && (
                  <Badge variant="outline" className="text-xs text-green-600">
                    {startup.growth}
                  </Badge>
                )}
              </div>
            )}
            
            {startup.foundedYear && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Founded {startup.foundedYear}</span>
              </div>
            )}
          </div>

          {/* Engagement metrics */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <div className="flex items-center gap-3">
              {startup.views && (
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {startup.views}
                </span>
              )}
              {startup.interests && (
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {startup.interests}
                </span>
              )}
              {startup.responseRate && (
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {startup.responseRate}%
                </span>
              )}
            </div>
            {startup.lastActive && (
              <span>Active {startup.lastActive}</span>
            )}
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
            
            {onRateStartup && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRateStartup(startup.id)}
                className="flex-1"
              >
                <Star className="h-4 w-4 mr-1" />
                Rate
              </Button>
            )}
            
            <Button
              size="sm"
              onClick={() => onExpressInterest(startup.id)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <Heart className="h-4 w-4 mr-1" />
              Express Interest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Discover Startups
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Loading startups...
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <X className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Failed to load startups
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {error}
                </p>
                <Button onClick={handleRefresh} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            onClick={handleRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
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
        {showFilters && (
        <div>
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
        </div>
        )}

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