"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3,
  TrendingUp,
  Target,
  Users,
  Star,
  Heart,
  Eye,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Zap,
  Award,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Info,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { motion } from "framer-motion";

interface MatchInsight {
  id: number;
  type: "compatibility" | "industry" | "stage" | "geographic" | "success_rate";
  title: string;
  description: string;
  value: number;
  trend: "up" | "down" | "stable";
  trendValue: number;
  category: string;
  details: string[];
}

interface MatchAnalytics {
  totalMatches: number;
  averageCompatibility: number;
  topIndustries: { name: string; count: number; percentage: number }[];
  stageDistribution: { stage: string; count: number; percentage: number }[];
  geographicDistribution: { region: string; count: number; percentage: number }[];
  successMetrics: {
    expressedInterest: number;
    responses: number;
    meetings: number;
    conversions: number;
  };
  timeMetrics: {
    averageResponseTime: number;
    peakActivity: string;
    bestPerformingDay: string;
  };
}

interface MatchInsightsDashboardProps {
  userType: "startup" | "investor";
  analytics: MatchAnalytics;
  insights: MatchInsight[];
  onRefreshData: () => void;
  onExportData: () => void;
}

const mockAnalytics: MatchAnalytics = {
  totalMatches: 147,
  averageCompatibility: 78.5,
  topIndustries: [
    { name: "SaaS", count: 45, percentage: 30.6 },
    { name: "AI/ML", count: 38, percentage: 25.9 },
    { name: "HealthTech", count: 25, percentage: 17.0 },
    { name: "FinTech", count: 20, percentage: 13.6 },
    { name: "CleanTech", count: 19, percentage: 12.9 }
  ],
  stageDistribution: [
    { stage: "Seed", count: 52, percentage: 35.4 },
    { stage: "Series A", count: 41, percentage: 27.9 },
    { stage: "Pre-Seed", count: 28, percentage: 19.0 },
    { stage: "Series B", count: 15, percentage: 10.2 },
    { stage: "Growth", count: 11, percentage: 7.5 }
  ],
  geographicDistribution: [
    { region: "San Francisco Bay Area", count: 45, percentage: 30.6 },
    { region: "New York", count: 32, percentage: 21.8 },
    { region: "Boston", count: 25, percentage: 17.0 },
    { region: "Austin", count: 20, percentage: 13.6 },
    { region: "Los Angeles", count: 25, percentage: 17.0 }
  ],
  successMetrics: {
    expressedInterest: 89,
    responses: 67,
    meetings: 23,
    conversions: 8
  },
  timeMetrics: {
    averageResponseTime: 18,
    peakActivity: "Tuesday 2-4 PM",
    bestPerformingDay: "Wednesday"
  }
};

const mockInsights: MatchInsight[] = [
  {
    id: 1,
    type: "compatibility",
    title: "Match Quality Improving",
    description: "Your average compatibility score has increased by 12% this month",
    value: 78.5,
    trend: "up",
    trendValue: 12,
    category: "Performance",
    details: [
      "Industry alignment improved by 15%",
      "Stage preference matching up 8%",
      "Geographic preferences better aligned"
    ]
  },
  {
    id: 2,
    type: "industry",
    title: "SaaS Dominance",
    description: "SaaS startups represent 31% of your matches, showing strong sector focus",
    value: 30.6,
    trend: "up",
    trendValue: 5,
    category: "Industry Focus",
    details: [
      "Enterprise SaaS showing highest compatibility",
      "B2B SaaS has 85% average match score",
      "Consumer SaaS growing at 20% monthly"
    ]
  },
  {
    id: 3,
    type: "success_rate",
    title: "Response Rate Excellent",
    description: "75% of your expressed interests receive responses",
    value: 75,
    trend: "up",
    trendValue: 8,
    category: "Engagement",
    details: [
      "Above industry average of 65%",
      "Best performance in HealthTech sector",
      "Tuesday-Thursday show highest response rates"
    ]
  },
  {
    id: 4,
    type: "stage",
    title: "Seed Stage Focus",
    description: "35% of matches are Seed stage, aligning with your preferences",
    value: 35.4,
    trend: "stable",
    trendValue: 0,
    category: "Investment Stage",
    details: [
      "Seed stage shows 82% average compatibility",
      "Series A following closely at 27%",
      "Pre-seed opportunities growing"
    ]
  }
];

export const MatchInsightsDashboard: React.FC<MatchInsightsDashboardProps> = ({
  userType,
  analytics = mockAnalytics,
  insights = mockInsights,
  onRefreshData,
  onExportData
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "performance" | "industry" | "engagement">("all");

  const filteredInsights = insights.filter(insight => {
    if (selectedCategory === "all") return true;
    return insight.category.toLowerCase().includes(selectedCategory);
  });

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "down":
        return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const conversionRate = ((analytics.successMetrics.conversions / analytics.successMetrics.expressedInterest) * 100).toFixed(1);
  const responseRate = ((analytics.successMetrics.responses / analytics.successMetrics.expressedInterest) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-500" />
            Match Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Understand your matching patterns and optimize your {userType === "startup" ? "investor" : "startup"} discovery
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onRefreshData}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" onClick={onExportData}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex gap-2">
        {[
          { id: "7d", label: "7 Days" },
          { id: "30d", label: "30 Days" },
          { id: "90d", label: "90 Days" },
          { id: "1y", label: "1 Year" }
        ].map(period => (
          <Button
            key={period.id}
            variant={selectedTimeframe === period.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeframe(period.id as any)}
          >
            {period.label}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Total Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {analytics.totalMatches}
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUp className="h-3 w-3" />
              +15% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Avg Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {analytics.averageCompatibility}%
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUp className="h-3 w-3" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-1">
              {responseRate}%
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUp className="h-3 w-3" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {conversionRate}%
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUp className="h-3 w-3" />
              +5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Success Funnel
          </CardTitle>
          <CardDescription>
            Track your journey from matches to successful {userType === "startup" ? "investments" : "partnerships"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {analytics.successMetrics.expressedInterest}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expressed Interest</div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {analytics.successMetrics.responses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Responses</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(analytics.successMetrics.responses / analytics.successMetrics.expressedInterest) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {analytics.successMetrics.meetings}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Meetings</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(analytics.successMetrics.meetings / analytics.successMetrics.expressedInterest) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {analytics.successMetrics.conversions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {userType === "startup" ? "Investments" : "Partnerships"}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(analytics.successMetrics.conversions / analytics.successMetrics.expressedInterest) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Industry Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.topIndustries.map((industry, index) => (
                <div key={industry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-blue-${500 + index * 100}`}></div>
                    <span className="text-sm font-medium">{industry.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${industry.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                      {industry.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Stage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.stageDistribution.map((stage, index) => (
                <div key={stage.stage} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-green-${400 + index * 100}`}></div>
                    <span className="text-sm font-medium">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                      {stage.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Key Insights
          </h2>
          <div className="flex gap-2">
            {["all", "performance", "industry", "engagement"].map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category as any)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{insight.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {insight.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(insight.trend)}
                      <Badge className={`text-xs ${getTrendColor(insight.trend)}`}>
                        {insight.trend === "stable" ? "Stable" : `${insight.trendValue}%`}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {insight.description}
                  </p>
                  
                  <div className="text-2xl font-bold text-blue-600">
                    {insight.value}%
                  </div>
                  
                  <div className="space-y-1">
                    {insight.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Time-based Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Time-based Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {analytics.timeMetrics.averageResponseTime}h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Response Time
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {analytics.timeMetrics.peakActivity}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Peak Activity Time
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {analytics.timeMetrics.bestPerformingDay}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Best Performing Day
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Optimize Your Profile
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Consider adding more details about your {userType === "startup" ? "technology stack and market traction" : "investment thesis and portfolio companies"} to improve match quality.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  Timing Strategy
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Your best response rates occur on {analytics.timeMetrics.bestPerformingDay}s. Consider timing your outreach accordingly.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                  Expand Your Reach
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Consider exploring {userType === "startup" ? "investors in" : "startups from"} {analytics.geographicDistribution[analytics.geographicDistribution.length - 1].region} for untapped opportunities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 