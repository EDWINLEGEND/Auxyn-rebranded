"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Target,
  Lightbulb,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  Send,
  Filter,
  SortDesc,
  Eye,
  Heart,
  Award,
  Zap,
  Calendar,
  FileText,
  Download,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackData {
  id: number;
  investorName: string;
  investorTitle: string;
  investorCompany: string;
  investorAvatar?: string;
  date: string;
  
  // Ratings (1-5 scale)
  overallRating: number;
  businessModelRating: number;
  marketOpportunityRating: number;
  teamRating: number;
  technologyRating: number;
  financialsRating: number;
  
  // Feedback
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  generalComments: string;
  
  // Interest Level
  interestLevel: "high" | "medium" | "low" | "not-interested";
  nextSteps?: string;
  
  // Metadata
  helpful: number;
  pitchVersion: number;
  responseTime: number; // hours
}

interface PitchVersion {
  id: number;
  version: number;
  title: string;
  createdDate: string;
  feedbackCount: number;
  averageRating: number;
  improvements: string[];
}

interface PitchFeedbackInterfaceProps {
  pitchId: number;
  feedbacks: FeedbackData[];
  pitchVersions: PitchVersion[];
  currentVersion: number;
  onSubmitFeedback?: (feedback: Partial<FeedbackData>) => void;
  onMarkHelpful?: (feedbackId: number) => void;
  onRequestMeeting?: (feedbackId: number) => void;
  userType: "startup" | "investor";
}

const mockFeedbacks: FeedbackData[] = [
  {
    id: 1,
    investorName: "Sarah Chen",
    investorTitle: "Managing Partner",
    investorCompany: "TechVentures Capital",
    date: "2024-01-15",
    overallRating: 4,
    businessModelRating: 4,
    marketOpportunityRating: 5,
    teamRating: 4,
    technologyRating: 3,
    financialsRating: 3,
    strengths: [
      "Strong market opportunity with clear TAM",
      "Experienced team with relevant background",
      "Clear value proposition for enterprise clients"
    ],
    weaknesses: [
      "Technology differentiation could be clearer",
      "Financial projections seem optimistic",
      "Go-to-market strategy needs more detail"
    ],
    suggestions: [
      "Include more technical details about your AI algorithms",
      "Provide more conservative financial scenarios",
      "Add case studies from pilot customers"
    ],
    generalComments: "Interesting opportunity in a growing market. The team has good experience but I'd like to see more traction metrics and clearer differentiation from competitors.",
    interestLevel: "medium",
    nextSteps: "Would like to see updated financials and customer validation data",
    helpful: 8,
    pitchVersion: 2,
    responseTime: 24
  },
  {
    id: 2,
    investorName: "Michael Rodriguez",
    investorTitle: "Investment Director",
    investorCompany: "Growth Capital Partners",
    date: "2024-01-12",
    overallRating: 5,
    businessModelRating: 5,
    marketOpportunityRating: 4,
    teamRating: 5,
    technologyRating: 4,
    financialsRating: 4,
    strengths: [
      "Exceptional team with proven track record",
      "Solid business model with multiple revenue streams",
      "Strong early traction and customer feedback"
    ],
    weaknesses: [
      "Market competition is intense",
      "Customer acquisition costs might be high"
    ],
    suggestions: [
      "Consider partnerships to reduce CAC",
      "Explore international expansion opportunities",
      "Develop more defensible moats"
    ],
    generalComments: "Very impressed with the team and execution so far. This is exactly the type of opportunity we look for. Would love to discuss next steps.",
    interestLevel: "high",
    nextSteps: "Ready to move to due diligence phase",
    helpful: 12,
    pitchVersion: 2,
    responseTime: 6
  }
];

const mockPitchVersions: PitchVersion[] = [
  {
    id: 1,
    version: 1,
    title: "Initial Pitch Deck",
    createdDate: "2024-01-05",
    feedbackCount: 3,
    averageRating: 3.2,
    improvements: []
  },
  {
    id: 2,
    version: 2,
    title: "Updated with Market Analysis",
    createdDate: "2024-01-10",
    feedbackCount: 5,
    averageRating: 4.1,
    improvements: [
      "Added detailed market analysis",
      "Included customer testimonials",
      "Updated financial projections"
    ]
  },
  {
    id: 3,
    version: 3,
    title: "Current Version",
    createdDate: "2024-01-18",
    feedbackCount: 2,
    averageRating: 4.5,
    improvements: [
      "Enhanced technology section",
      "Added competitive analysis",
      "Improved use of funds breakdown"
    ]
  }
];

export const PitchFeedbackInterface: React.FC<PitchFeedbackInterfaceProps> = ({
  pitchId,
  feedbacks = mockFeedbacks,
  pitchVersions = mockPitchVersions,
  currentVersion = 3,
  onSubmitFeedback,
  onMarkHelpful,
  onRequestMeeting,
  userType
}) => {
  const [activeTab, setActiveTab] = useState<"feedback" | "analytics" | "versions" | "give-feedback">("feedback");
  const [filterBy, setFilterBy] = useState<"all" | "high" | "medium" | "low">("all");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("recent");
  
  // New feedback form state
  const [newFeedback, setNewFeedback] = useState({
    overallRating: 0,
    businessModelRating: 0,
    marketOpportunityRating: 0,
    teamRating: 0,
    technologyRating: 0,
    financialsRating: 0,
    strengths: "",
    weaknesses: "",
    suggestions: "",
    generalComments: "",
    interestLevel: "medium" as "high" | "medium" | "low" | "not-interested",
    nextSteps: ""
  });

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filterBy === "all") return true;
    return feedback.interestLevel === filterBy;
  });

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.overallRating - a.overallRating;
      case "helpful":
        return b.helpful - a.helpful;
      case "recent":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const averageRating = feedbacks.length > 0 
    ? feedbacks.reduce((sum, f) => sum + f.overallRating, 0) / feedbacks.length 
    : 0;

  const interestDistribution = {
    high: feedbacks.filter(f => f.interestLevel === "high").length,
    medium: feedbacks.filter(f => f.interestLevel === "medium").length,
    low: feedbacks.filter(f => f.interestLevel === "low").length,
    notInterested: feedbacks.filter(f => f.interestLevel === "not-interested").length
  };

  const StarRating: React.FC<{ rating: number; onRate?: (rating: number) => void; readonly?: boolean }> = ({ 
    rating, 
    onRate, 
    readonly = false 
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => !readonly && onRate?.(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );

  const getInterestLevelColor = (level: string) => {
    switch (level) {
      case "high": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "low": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      case "not-interested": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const renderFeedbackTab = () => (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            >
              <option value="all">All Interest Levels</option>
              <option value="high">High Interest</option>
              <option value="medium">Medium Interest</option>
              <option value="low">Low Interest</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <SortDesc className="h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>
        
        <Badge variant="secondary">
          {sortedFeedbacks.length} feedback{sortedFeedbacks.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {sortedFeedbacks.map(feedback => (
          <Card key={feedback.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feedback.investorName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feedback.investorTitle} at {feedback.investorCompany}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getInterestLevelColor(feedback.interestLevel)}>
                    {feedback.interestLevel.replace('-', ' ')}
                  </Badge>
                  <span className="text-sm text-gray-500">{feedback.date}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Overall Rating */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Overall Rating:</span>
                <StarRating rating={feedback.overallRating} readonly />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({feedback.overallRating}/5)
                </span>
              </div>

              {/* Detailed Ratings */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-[20px]">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Business Model</div>
                  <StarRating rating={feedback.businessModelRating} readonly />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Opportunity</div>
                  <StarRating rating={feedback.marketOpportunityRating} readonly />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Team</div>
                  <StarRating rating={feedback.teamRating} readonly />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Technology</div>
                  <StarRating rating={feedback.technologyRating} readonly />
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Financials</div>
                  <StarRating rating={feedback.financialsRating} readonly />
                </div>
              </div>

              {/* Strengths */}
              {feedback.strengths.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {feedback.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weaknesses */}
              {feedback.weaknesses.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-1">
                    {feedback.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <AlertCircle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {feedback.suggestions.length > 0 && (
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Suggestions
                  </h4>
                  <ul className="space-y-1">
                    {feedback.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                        <Lightbulb className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* General Comments */}
              {feedback.generalComments && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    General Comments
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-[20px]">
                    {feedback.generalComments}
                  </p>
                </div>
              )}

              {/* Next Steps */}
              {feedback.nextSteps && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Next Steps
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-[20px]">
                    {feedback.nextSteps}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onMarkHelpful?.(feedback.id)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({feedback.helpful})
                  </button>
                  <span className="text-sm text-gray-500">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Responded in {feedback.responseTime}h
                  </span>
                </div>
                
                {feedback.interestLevel === "high" && (
                  <Button
                    size="sm"
                    onClick={() => onRequestMeeting?.(feedback.id)}
                    className="bg-gradient-to-r from-green-500 to-teal-600"
                  >
                    Request Meeting
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedFeedbacks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No feedback yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Share your pitch with investors to start receiving feedback.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{feedbacks.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{interestDistribution.high}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">High Interest</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {feedbacks.length > 0 ? Math.round(feedbacks.reduce((sum, f) => sum + f.responseTime, 0) / feedbacks.length) : 0}h
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Interest Level Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Interest Level Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(interestDistribution).map(([level, count]) => (
              <div key={level} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getInterestLevelColor(level.replace('notInterested', 'not-interested'))}>
                    {level.replace('notInterested', 'Not Interested').replace(/([A-Z])/g, ' $1').trim()}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Rating Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { key: 'businessModelRating', label: 'Business Model' },
              { key: 'marketOpportunityRating', label: 'Market Opportunity' },
              { key: 'teamRating', label: 'Team' },
              { key: 'technologyRating', label: 'Technology' },
              { key: 'financialsRating', label: 'Financials' },
              { key: 'overallRating', label: 'Overall' }
            ].map(({ key, label }) => {
              const avg = feedbacks.length > 0 
                ? feedbacks.reduce((sum, f) => sum + (f as any)[key], 0) / feedbacks.length 
                : 0;
              return (
                <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-[20px]">
                  <div className="text-lg font-bold text-blue-600">{avg.toFixed(1)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</div>
                  <StarRating rating={Math.round(avg)} readonly />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVersionsTab = () => (
    <div className="space-y-4">
      {pitchVersions.map(version => (
        <Card key={version.id} className={version.version === currentVersion ? "ring-2 ring-blue-500" : ""}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Version {version.version}: {version.title}
                  {version.version === currentVersion && (
                    <Badge variant="default">Current</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Created on {version.createdDate} • {version.feedbackCount} feedback • {version.averageRating.toFixed(1)}★ average
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {version.improvements.length > 0 && (
            <CardContent>
              <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">
                Improvements Made:
              </h4>
              <ul className="space-y-1">
                {version.improvements.map((improvement, idx) => (
                  <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );

  const renderGiveFeedbackTab = () => {
    if (userType !== "investor") {
      return (
        <Card className="text-center py-12">
          <CardContent>
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Investor Access Only
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Only investors can provide feedback on pitches.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Provide Feedback</CardTitle>
          <CardDescription>
            Help this startup improve their pitch with your detailed feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Overall Rating</Label>
              <StarRating 
                rating={newFeedback.overallRating} 
                onRate={(rating) => setNewFeedback(prev => ({ ...prev, overallRating: rating }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Business Model</Label>
              <StarRating 
                rating={newFeedback.businessModelRating} 
                onRate={(rating) => setNewFeedback(prev => ({ ...prev, businessModelRating: rating }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Market Opportunity</Label>
              <StarRating 
                rating={newFeedback.marketOpportunityRating} 
                onRate={(rating) => setNewFeedback(prev => ({ ...prev, marketOpportunityRating: rating }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Team</Label>
              <StarRating 
                rating={newFeedback.teamRating} 
                onRate={(rating) => setNewFeedback(prev => ({ ...prev, teamRating: rating }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Technology</Label>
              <StarRating 
                rating={newFeedback.technologyRating} 
                onRate={(rating) => setNewFeedback(prev => ({ ...prev, technologyRating: rating }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Financials</Label>
              <StarRating 
                rating={newFeedback.financialsRating} 
                onRate={(rating) => setNewFeedback(prev => ({ ...prev, financialsRating: rating }))}
              />
            </div>
          </div>

          {/* Text Feedback */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="strengths">Strengths (one per line)</Label>
              <textarea
                id="strengths"
                value={newFeedback.strengths}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, strengths: e.target.value }))}
                placeholder="List the key strengths of this pitch..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="weaknesses">Areas for Improvement (one per line)</Label>
              <textarea
                id="weaknesses"
                value={newFeedback.weaknesses}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, weaknesses: e.target.value }))}
                placeholder="List areas that could be improved..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="suggestions">Suggestions (one per line)</Label>
              <textarea
                id="suggestions"
                value={newFeedback.suggestions}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, suggestions: e.target.value }))}
                placeholder="Provide specific suggestions for improvement..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="generalComments">General Comments</Label>
              <textarea
                id="generalComments"
                value={newFeedback.generalComments}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, generalComments: e.target.value }))}
                placeholder="Share your overall thoughts and feedback..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Interest Level */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Interest Level</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { value: "high", label: "High Interest", color: "green" },
                { value: "medium", label: "Medium Interest", color: "yellow" },
                { value: "low", label: "Low Interest", color: "orange" },
                { value: "not-interested", label: "Not Interested", color: "red" }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setNewFeedback(prev => ({ ...prev, interestLevel: option.value as any }))}
                  className={`p-3 rounded-[20px] border-2 transition-all ${
                    newFeedback.interestLevel === option.value
                      ? `border-${option.color}-500 bg-${option.color}-50 dark:bg-${option.color}-900/20`
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          {newFeedback.interestLevel === "high" && (
            <div>
              <Label htmlFor="nextSteps">Next Steps</Label>
              <Input
                id="nextSteps"
                value={newFeedback.nextSteps}
                onChange={(e) => setNewFeedback(prev => ({ ...prev, nextSteps: e.target.value }))}
                placeholder="What would you like to see next from this startup?"
              />
            </div>
          )}

          {/* Submit Button */}
          <Button 
            onClick={() => onSubmitFeedback?.({
              ...newFeedback,
              strengths: newFeedback.strengths.split('\n').filter(s => s.trim()),
              weaknesses: newFeedback.weaknesses.split('\n').filter(s => s.trim()),
              suggestions: newFeedback.suggestions.split('\n').filter(s => s.trim())
            })}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
            disabled={newFeedback.overallRating === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pitch Feedback
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {userType === "startup" 
            ? "Review feedback from investors and track your pitch improvements"
            : "Provide detailed feedback to help startups improve their pitches"
          }
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {[
          { id: "feedback", label: "Feedback", icon: MessageSquare },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "versions", label: "Versions", icon: FileText },
          ...(userType === "investor" ? [{ id: "give-feedback", label: "Give Feedback", icon: Send }] : [])
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "feedback" && renderFeedbackTab()}
          {activeTab === "analytics" && renderAnalyticsTab()}
          {activeTab === "versions" && renderVersionsTab()}
          {activeTab === "give-feedback" && renderGiveFeedbackTab()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 