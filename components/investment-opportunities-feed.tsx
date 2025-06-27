"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  Clock,
  Star,
  Heart,
  Eye,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Users,
  DollarSign,
  BarChart3,
  Calendar,
  MapPin,
  Filter,
  Bell,
  Sparkles,
  Activity,
  ArrowRight,
  Flame,
  Award,
  Building
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OpportunityFeedItem {
  id: number;
  type: "new_startup" | "funding_round" | "milestone" | "match_suggestion" | "industry_trend";
  timestamp: string;
  priority: "high" | "medium" | "low";
  
  // Startup info
  startupId?: number;
  startupName?: string;
  startupLogo?: string;
  industry?: string[];
  stage?: string;
  location?: string;
  
  // Opportunity details
  title: string;
  description: string;
  fundingAmount?: string;
  valuation?: string;
  
  // Metadata
  isNew: boolean;
  isPersonalized: boolean;
  matchScore?: number;
  
  // Engagement
  views: number;
  interests: number;
  saved: boolean;
  
  // Action items
  actionText?: string;
  actionUrl?: string;
}

interface InvestmentOpportunitiesFeedProps {
  opportunities: OpportunityFeedItem[];
  onViewOpportunity: (opportunityId: number) => void;
  onExpressInterest: (opportunityId: number) => void;
  onSaveOpportunity: (opportunityId: number) => void;
  onMarkAsRead: (opportunityId: number) => void;
}

const mockOpportunities: OpportunityFeedItem[] = [
  {
    id: 1,
    type: "match_suggestion",
    timestamp: "2024-01-20T10:30:00Z",
    priority: "high",
    startupId: 1,
    startupName: "TechFlow Solutions",
    industry: ["SaaS", "AI/ML", "Enterprise"],
    stage: "Series A",
    location: "San Francisco, CA",
    title: "95% Match: AI Workflow Automation",
    description: "This startup perfectly matches your investment criteria in enterprise SaaS with proven traction and experienced team.",
    fundingAmount: "$2M",
    valuation: "$12M",
    isNew: true,
    isPersonalized: true,
    matchScore: 95,
    views: 45,
    interests: 8,
    saved: false,
    actionText: "View Details"
  },
  {
    id: 2,
    type: "new_startup",
    timestamp: "2024-01-20T09:15:00Z",
    priority: "medium",
    startupId: 2,
    startupName: "HealthAI Diagnostics",
    industry: ["HealthTech", "AI/ML"],
    stage: "Seed",
    location: "Boston, MA",
    title: "New Startup: AI Medical Diagnostics",
    description: "Revolutionary AI platform improving diagnostic accuracy by 40%. Just launched their funding round.",
    fundingAmount: "$1.5M",
    valuation: "$8M",
    isNew: true,
    isPersonalized: false,
    views: 127,
    interests: 23,
    saved: true,
    actionText: "Express Interest"
  },
  {
    id: 3,
    type: "funding_round",
    timestamp: "2024-01-20T08:45:00Z",
    priority: "high",
    startupId: 3,
    startupName: "GreenEnergy Innovations",
    industry: ["CleanTech", "Energy"],
    stage: "Series A",
    location: "Austin, TX",
    title: "Series A Round Opening",
    description: "CleanTech startup with breakthrough solar technology opening Series A. 40% higher efficiency than competitors.",
    fundingAmount: "$5M",
    valuation: "$25M",
    isNew: false,
    isPersonalized: true,
    matchScore: 82,
    views: 89,
    interests: 15,
    saved: false,
    actionText: "Learn More"
  },
  {
    id: 4,
    type: "milestone",
    timestamp: "2024-01-19T16:20:00Z",
    priority: "medium",
    startupId: 4,
    startupName: "EduTech Platform",
    industry: ["EdTech", "SaaS"],
    stage: "Seed",
    location: "New York, NY",
    title: "Major Milestone: 10K Users Achieved",
    description: "EdTech startup just hit 10,000 active users with 200% month-over-month growth. Strong product-market fit.",
    isNew: false,
    isPersonalized: false,
    views: 156,
    interests: 31,
    saved: false,
    actionText: "View Progress"
  },
  {
    id: 5,
    type: "industry_trend",
    timestamp: "2024-01-19T14:10:00Z",
    priority: "low",
    title: "AI/ML Sector Heating Up",
    description: "AI/ML startups are seeing 150% increase in funding this quarter. 23 new opportunities in your preferred sectors.",
    isNew: false,
    isPersonalized: true,
    views: 234,
    interests: 45,
    saved: false,
    actionText: "Browse AI Startups"
  }
];

export const InvestmentOpportunitiesFeed: React.FC<InvestmentOpportunitiesFeedProps> = ({
  opportunities = mockOpportunities,
  onViewOpportunity,
  onExpressInterest,
  onSaveOpportunity,
  onMarkAsRead
}) => {
  const [filter, setFilter] = useState<"all" | "personalized" | "new" | "high_priority">("all");
  const [savedItems, setSavedItems] = useState<number[]>(
    opportunities.filter(opp => opp.saved).map(opp => opp.id)
  );

  const filteredOpportunities = opportunities.filter(opp => {
    switch (filter) {
      case "personalized":
        return opp.isPersonalized;
      case "new":
        return opp.isNew;
      case "high_priority":
        return opp.priority === "high";
      default:
        return true;
    }
  });

  const handleSaveOpportunity = (opportunityId: number) => {
    setSavedItems(prev => 
      prev.includes(opportunityId)
        ? prev.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    );
    onSaveOpportunity(opportunityId);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "match_suggestion":
        return <Target className="h-5 w-5 text-blue-500" />;
      case "new_startup":
        return <Sparkles className="h-5 w-5 text-green-500" />;
      case "funding_round":
        return <DollarSign className="h-5 w-5 text-purple-500" />;
      case "milestone":
        return <Award className="h-5 w-5 text-orange-500" />;
      case "industry_trend":
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "match_suggestion":
        return "Smart Match";
      case "new_startup":
        return "New Startup";
      case "funding_round":
        return "Funding Round";
      case "milestone":
        return "Milestone";
      case "industry_trend":
        return "Industry Trend";
      default:
        return "Update";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/10";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10";
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/10";
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/10";
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-500" />
            Investment Feed
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Personalized investment opportunities and market updates
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {filteredOpportunities.filter(opp => opp.isNew).length} new
          </Badge>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Customize Feed
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: "All Updates", count: opportunities.length },
          { id: "personalized", label: "For You", count: opportunities.filter(o => o.isPersonalized).length },
          { id: "new", label: "New", count: opportunities.filter(o => o.isNew).length },
          { id: "high_priority", label: "High Priority", count: opportunities.filter(o => o.priority === "high").length }
        ].map(tab => (
          <Button
            key={tab.id}
            variant={filter === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(tab.id as any)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {tab.label}
            <Badge variant="secondary" className="text-xs">
              {tab.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Feed Items */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className={`border-l-4 hover:shadow-md transition-all duration-200 ${getPriorityColor(opportunity.priority)} ${
                  opportunity.isNew ? 'ring-1 ring-blue-200 dark:ring-blue-800' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getTypeIcon(opportunity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(opportunity.type)}
                          </Badge>
                          {opportunity.isPersonalized && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              For You
                            </Badge>
                          )}
                          {opportunity.matchScore && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 text-xs">
                              {opportunity.matchScore}% Match
                            </Badge>
                          )}
                          {opportunity.isNew && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 text-xs">
                              <Flame className="h-3 w-3 mr-1" />
                              New
                            </Badge>
                          )}
                        </div>
                        
                        <CardTitle className="text-lg mb-1">
                          {opportunity.title}
                        </CardTitle>
                        
                        {opportunity.startupName && (
                          <div className="flex items-center gap-2 mb-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">{opportunity.startupName}</span>
                            {opportunity.stage && (
                              <Badge variant="secondary" className="text-xs">
                                {opportunity.stage}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveOpportunity(opportunity.id)}
                      >
                        {savedItems.includes(opportunity.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(opportunity.timestamp)}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {opportunity.description}
                  </p>

                  {/* Startup Details */}
                  {opportunity.startupId && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      {opportunity.industry && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Industry</div>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.industry.slice(0, 2).map(ind => (
                              <Badge key={ind} variant="secondary" className="text-xs">
                                {ind}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {opportunity.location && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Location</div>
                          <div className="text-sm flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {opportunity.location}
                          </div>
                        </div>
                      )}
                      
                      {opportunity.fundingAmount && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Funding</div>
                          <div className="text-sm font-medium text-green-600">
                            {opportunity.fundingAmount}
                          </div>
                        </div>
                      )}
                      
                      {opportunity.valuation && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Valuation</div>
                          <div className="text-sm font-medium text-blue-600">
                            {opportunity.valuation}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {opportunity.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {opportunity.interests} interested
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {opportunity.startupId && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewOpportunity(opportunity.id)}
                        >
                          View Details
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        onClick={() => onExpressInterest(opportunity.id)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600"
                      >
                        {opportunity.actionText || "Express Interest"}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No opportunities found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filter or check back later for new opportunities.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilter("all")}
                >
                  View All Updates
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      {filteredOpportunities.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Opportunities
          </Button>
        </div>
      )}

      {/* Feed Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Feed Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {opportunities.filter(o => o.isPersonalized).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Personalized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {opportunities.filter(o => o.type === "match_suggestion").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Smart Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {opportunities.filter(o => o.type === "new_startup").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">New Startups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {savedItems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 