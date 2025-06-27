"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Heart,
  X,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  Eye,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MatchData {
  id: number;
  name: string;
  description: string;
  type: "startup" | "investor";
  compatibilityScore: number;
  matchReasons: string[];
  
  // Common fields
  location: string;
  industry: string[];
  stage?: string;
  
  // Startup specific
  fundingNeeded?: string;
  teamSize?: number;
  revenue?: string;
  
  // Investor specific
  investmentRange?: string;
  portfolioSize?: number;
  expertise?: string[];
  
  // Metadata
  lastActive: string;
  verified: boolean;
  premium: boolean;
  responseRate?: number;
}

interface SmartMatchingDashboardProps {
  userType: "startup" | "investor";
  matches: MatchData[];
  onExpressInterest: (matchId: number) => void;
  onSaveMatch: (matchId: number) => void;
  onViewDetails: (matchId: number) => void;
  onStartConversation: (matchId: number) => void;
}

const mockMatches: MatchData[] = [
  {
    id: 1,
    name: "TechFlow Solutions",
    description: "AI-powered workflow automation platform for enterprise clients with focus on reducing operational costs.",
    type: "startup",
    compatibilityScore: 95,
    matchReasons: ["Industry alignment: Enterprise SaaS", "Funding stage match", "High growth potential", "Strong team background"],
    location: "San Francisco, CA",
    industry: ["SaaS", "AI/ML", "Enterprise"],
    stage: "Series A",
    fundingNeeded: "$2M",
    teamSize: 12,
    revenue: "$500K ARR",
    lastActive: "2 hours ago",
    verified: true,
    premium: true,
    responseRate: 85
  },
  {
    id: 2,
    name: "GreenTech Ventures",
    description: "Leading investor in sustainable technology startups with $500M+ AUM focused on climate solutions.",
    type: "investor",
    compatibilityScore: 88,
    matchReasons: ["Investment range alignment", "CleanTech expertise", "Stage preference match", "Geographic focus"],
    location: "London, UK",
    industry: ["CleanTech", "Energy", "Sustainability"],
    investmentRange: "$500K - $5M",
    portfolioSize: 45,
    expertise: ["Product Development", "Go-to-Market", "International Expansion"],
    lastActive: "1 day ago",
    verified: true,
    premium: false,
    responseRate: 72
  },
  {
    id: 3,
    name: "HealthAI Diagnostics",
    description: "Revolutionary AI-powered medical diagnostic platform improving accuracy by 40% while reducing costs.",
    type: "startup",
    compatibilityScore: 82,
    matchReasons: ["HealthTech focus", "AI technology match", "Series A stage", "Strong market opportunity"],
    location: "Boston, MA",
    industry: ["HealthTech", "AI/ML", "Medical"],
    stage: "Series A",
    fundingNeeded: "$3M",
    teamSize: 8,
    revenue: "Pre-revenue",
    lastActive: "5 hours ago",
    verified: true,
    premium: false,
    responseRate: 78
  }
];

export const SmartMatchingDashboard: React.FC<SmartMatchingDashboardProps> = ({
  userType,
  matches = mockMatches,
  onExpressInterest,
  onSaveMatch,
  onViewDetails,
  onStartConversation
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [minCompatibility, setMinCompatibility] = useState(0);
  const [sortBy, setSortBy] = useState<"compatibility" | "recent" | "name">("compatibility");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [savedMatches, setSavedMatches] = useState<number[]>([]);
  const [interestedMatches, setInterestedMatches] = useState<number[]>([]);

  const industries = ["SaaS", "AI/ML", "HealthTech", "FinTech", "CleanTech", "EdTech", "E-commerce", "Enterprise"];
  const stages = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"];

  const filteredAndSortedMatches = useMemo(() => {
    let filtered = matches.filter(match => {
      const matchesSearch = match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           match.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = selectedIndustries.length === 0 || 
                             selectedIndustries.some(industry => match.industry.includes(industry));
      
      const matchesStage = selectedStages.length === 0 || 
                          (match.stage && selectedStages.includes(match.stage));
      
      const matchesCompatibility = match.compatibilityScore >= minCompatibility;

      return matchesSearch && matchesIndustry && matchesStage && matchesCompatibility;
    });

    // Sort matches
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "compatibility":
          comparison = a.compatibilityScore - b.compatibilityScore;
          break;
        case "recent":
          // Simple comparison based on "hours ago" or "days ago"
          const aHours = a.lastActive.includes("hour") ? parseInt(a.lastActive) : parseInt(a.lastActive) * 24;
          const bHours = b.lastActive.includes("hour") ? parseInt(b.lastActive) : parseInt(b.lastActive) * 24;
          comparison = aHours - bHours;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
      }
      
      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [matches, searchTerm, selectedIndustries, selectedStages, minCompatibility, sortBy, sortOrder]);

  const handleSaveMatch = (matchId: number) => {
    setSavedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
    onSaveMatch(matchId);
  };

  const handleExpressInterest = (matchId: number) => {
    setInterestedMatches(prev => [...prev, matchId]);
    onExpressInterest(matchId);
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100 dark:bg-green-900/20";
    if (score >= 80) return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
    if (score >= 70) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Great Match";
    if (score >= 70) return "Good Match";
    return "Potential Match";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Smart Matching Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover {userType === "startup" ? "investors" : "startups"} that match your criteria
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {filteredAndSortedMatches.length} matches found
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
                  placeholder={`Search ${userType === "startup" ? "investors" : "startups"}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Sort by:</Label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "compatibility" | "recent" | "name")}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              >
                <option value="compatibility">Compatibility</option>
                <option value="recent">Recent Activity</option>
                <option value="name">Name</option>
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
                <CardTitle className="text-lg">Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Industries</Label>
                    <div className="flex flex-wrap gap-2">
                      {industries.map(industry => (
                        <Button
                          key={industry}
                          variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSelectedIndustries(prev =>
                              prev.includes(industry)
                                ? prev.filter(i => i !== industry)
                                : [...prev, industry]
                            );
                          }}
                          className="text-xs"
                        >
                          {industry}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Stages</Label>
                    <div className="flex flex-wrap gap-2">
                      {stages.map(stage => (
                        <Button
                          key={stage}
                          variant={selectedStages.includes(stage) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSelectedStages(prev =>
                              prev.includes(stage)
                                ? prev.filter(s => s !== stage)
                                : [...prev, stage]
                            );
                          }}
                          className="text-xs"
                        >
                          {stage}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="compatibility" className="text-sm font-medium mb-2 block">
                      Minimum Compatibility: {minCompatibility}%
                    </Label>
                    <input
                      id="compatibility"
                      type="range"
                      min="0"
                      max="100"
                      value={minCompatibility}
                      onChange={(e) => setMinCompatibility(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedIndustries([]);
                      setSelectedStages([]);
                      setMinCompatibility(0);
                      setSearchTerm("");
                    }}
                  >
                    Clear All Filters
                  </Button>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {filteredAndSortedMatches.length} of {matches.length} matches
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAndSortedMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg line-clamp-1">{match.name}</CardTitle>
                        {match.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {match.premium && (
                          <Star className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs ${getCompatibilityColor(match.compatibilityScore)}`}>
                          {match.compatibilityScore}% {getCompatibilityLabel(match.compatibilityScore)}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSaveMatch(match.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {savedMatches.includes(match.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {match.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{match.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {match.industry.slice(0, 2).map(ind => (
                          <Badge key={ind} variant="secondary" className="text-xs">
                            {ind}
                          </Badge>
                        ))}
                        {match.industry.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{match.industry.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {match.type === "startup" && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span>Seeking: {match.fundingNeeded}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span>Team: {match.teamSize} members</span>
                        </div>
                      </>
                    )}

                    {match.type === "investor" && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span>Range: {match.investmentRange}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BarChart3 className="h-4 w-4 text-purple-400" />
                          <span>Portfolio: {match.portfolioSize} companies</span>
                        </div>
                      </>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Active {match.lastActive}</span>
                    </div>
                  </div>

                  {/* Match Reasons */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Target className="h-4 w-4 text-blue-500" />
                      Why this match?
                    </h4>
                    <div className="space-y-1">
                      {match.matchReasons.slice(0, 2).map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                      {match.matchReasons.length > 2 && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                          +{match.matchReasons.length - 2} more reasons
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Response Rate */}
                  {match.responseRate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span>{match.responseRate}% response rate</span>
                    </div>
                  )}
                </CardContent>

                <div className="p-4 pt-0">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(match.id)}
                      className="flex-1 flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                    
                    {!interestedMatches.includes(match.id) ? (
                      <Button
                        size="sm"
                        onClick={() => handleExpressInterest(match.id)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4" />
                        Express Interest
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => onStartConversation(match.id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Start Chat
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAndSortedMatches.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No matches found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search criteria or filters to find more matches.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedIndustries([]);
                    setSelectedStages([]);
                    setMinCompatibility(0);
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

      {/* Match Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Match Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {matches.filter(m => m.compatibilityScore >= 90).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Excellent Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {matches.filter(m => m.compatibilityScore >= 80).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Great Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {savedMatches.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {interestedMatches.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Interested</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 