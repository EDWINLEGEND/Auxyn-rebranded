"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Target,
  Users,
  BarChart3,
  MessageCircle,
  Star,
  TrendingUp,
  Zap,
  Award,
  Settings,
  Plus,
  Filter,
  Search,
  Bell,
  Heart,
  Eye,
  Bookmark
} from "lucide-react";
import { motion } from "framer-motion";

// Import all our components
import { StartupProfileForm } from "@/components/startup-profile-form";
import { InvestorProfileForm } from "@/components/investor-profile-form";
import { SmartMatchingDashboard } from "@/components/smart-matching-dashboard";
import { MatchDetailsModal } from "@/components/match-details-modal";
import { PitchFeedbackInterface } from "@/components/pitch-feedback-interface";
import { StartupDiscoveryGrid } from "@/components/startup-discovery-grid";
import { InvestmentOpportunitiesFeed } from "@/components/investment-opportunities-feed";
import { MatchInsightsDashboard } from "@/components/match-insights-dashboard";
import { CommunicationInterface } from "@/components/communication-interface";

export default function SmartMatchmakingPage() {
  const [userType, setUserType] = useState<"startup" | "investor">("startup");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [showMatchDetails, setShowMatchDetails] = useState(false);

  // Mock data and handlers
  const handleProfileSubmit = (data: any) => {
    console.log("Profile submitted:", data);
    setShowProfileForm(false);
  };

  const handleExpressInterest = (matchId: number) => {
    console.log("Express interest in:", matchId);
  };

  const handleSaveMatch = (matchId: number) => {
    console.log("Save match:", matchId);
  };

  const handleViewDetails = (matchId: number) => {
    setSelectedMatchId(matchId);
    setShowMatchDetails(true);
  };

  const handleStartConversation = (matchId: number) => {
    setActiveTab("communication");
  };

  const mockMatchDetails = selectedMatchId ? {
    id: selectedMatchId,
    name: "TechFlow Solutions",
    description: "AI-powered workflow automation platform for enterprise clients with focus on reducing operational costs.",
    type: "startup" as const,
    compatibilityScore: 95,
    matchReasons: [
      "Industry alignment: Enterprise SaaS",
      "Funding stage match",
      "High growth potential",
      "Strong team background"
    ],
    location: "San Francisco, CA",
    industry: ["SaaS", "AI/ML", "Enterprise"],
    stage: "Series A",
    foundedYear: 2022,
    website: "https://techflow.com",
    fundingNeeded: "$2M",
    equityOffered: "15%",
    teamSize: 12,
    revenue: "$500K ARR",
    businessModel: "SaaS Subscription",
    targetMarket: "Enterprise companies with 500+ employees",
    competitiveAdvantage: "Proprietary AI algorithms with 40% efficiency improvement",
    useOfFunds: "60% product development, 25% sales & marketing, 15% team expansion",
    lastActive: "2 hours ago",
    verified: true,
    premium: true,
    responseRate: 85
  } : null;

  const stats = {
    totalMatches: userType === "startup" ? 147 : 89,
    highCompatibility: userType === "startup" ? 23 : 15,
    expressedInterest: userType === "startup" ? 45 : 67,
    responses: userType === "startup" ? 34 : 52
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Smart Investment Matchmaking
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              AI-powered platform connecting {userType === "startup" ? "startups with investors" : "investors with startups"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Type Toggle */}
            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
              <Button
                variant={userType === "startup" ? "default" : "ghost"}
                size="sm"
                onClick={() => setUserType("startup")}
                className="rounded-md"
              >
                <Target className="h-4 w-4 mr-1" />
                Startup
              </Button>
              <Button
                variant={userType === "investor" ? "default" : "ghost"}
                size="sm"
                onClick={() => setUserType("investor")}
                className="rounded-md"
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Investor
              </Button>
            </div>
            
            <Button
              onClick={() => setShowProfileForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              {userType === "startup" ? "Create Startup Profile" : "Create Investor Profile"}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.totalMatches}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Matches</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.highCompatibility}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">High Compatibility</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.expressedInterest}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expressed Interest</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{stats.responses}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Responses</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Matches</span>
            </TabsTrigger>
            <TabsTrigger value="discovery" className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Discover</span>
            </TabsTrigger>
            <TabsTrigger value="feed" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Feed</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Smart Matching Dashboard
                </CardTitle>
                <CardDescription>
                  AI-powered matches based on your preferences and compatibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SmartMatchingDashboard
                  userType={userType}
                  matches={[]}
                  onExpressInterest={handleExpressInterest}
                  onSaveMatch={handleSaveMatch}
                  onViewDetails={handleViewDetails}
                  onStartConversation={handleStartConversation}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discovery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-green-500" />
                  {userType === "startup" ? "Investor Discovery" : "Startup Discovery"}
                </CardTitle>
                <CardDescription>
                  Browse and filter {userType === "startup" ? "investors" : "startups"} to find the perfect match
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userType === "investor" ? (
                  <StartupDiscoveryGrid
                    onViewStartup={handleViewDetails}
                    onExpressInterest={handleExpressInterest}
                    onBookmarkStartup={handleSaveMatch}
                  />
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Investor Discovery
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Browse investors that match your funding needs and industry focus
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-500" />
                  Investment Opportunities Feed
                </CardTitle>
                <CardDescription>
                  Personalized feed of investment opportunities and market updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InvestmentOpportunitiesFeed
                  opportunities={[]}
                  onViewOpportunity={handleViewDetails}
                  onExpressInterest={handleExpressInterest}
                  onSaveOpportunity={handleSaveMatch}
                  onMarkAsRead={() => {}}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Pitch Feedback System
                </CardTitle>
                <CardDescription>
                  {userType === "startup" 
                    ? "Review feedback from investors and improve your pitch"
                    : "Provide detailed feedback to help startups improve"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PitchFeedbackInterface
                  pitchId={1}
                  feedbacks={[]}
                  pitchVersions={[]}
                  currentVersion={1}
                  userType={userType}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  Match Insights & Analytics
                </CardTitle>
                <CardDescription>
                  Understand your matching patterns and optimize your strategy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MatchInsightsDashboard
                  userType={userType}
                  analytics={{
                    totalMatches: stats.totalMatches,
                    averageCompatibility: 78.5,
                    topIndustries: [],
                    stageDistribution: [],
                    geographicDistribution: [],
                    successMetrics: {
                      expressedInterest: stats.expressedInterest,
                      responses: stats.responses,
                      meetings: 12,
                      conversions: 5
                    },
                    timeMetrics: {
                      averageResponseTime: 18,
                      peakActivity: "Tuesday 2-4 PM",
                      bestPerformingDay: "Wednesday"
                    }
                  }}
                  insights={[]}
                  onRefreshData={() => {}}
                  onExportData={() => {}}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  Communication Hub
                </CardTitle>
                <CardDescription>
                  Connect with {userType === "startup" ? "investors" : "startups"} through messaging and video calls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommunicationInterface
                  currentUserId={1}
                  userType={userType}
                  conversations={[]}
                  onSendMessage={() => {}}
                  onStartVideoCall={() => {}}
                  onScheduleMeeting={() => {}}
                  onArchiveConversation={() => {}}
                  onPinConversation={() => {}}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Profile Form Modal */}
        {showProfileForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl"
              >
                {userType === "startup" ? (
                  <StartupProfileForm
                    onSubmit={handleProfileSubmit}
                  />
                ) : (
                  <InvestorProfileForm
                    onSubmit={handleProfileSubmit}
                  />
                )}
                <div className="p-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowProfileForm(false)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Match Details Modal */}
        {showMatchDetails && mockMatchDetails && (
          <MatchDetailsModal
            match={mockMatchDetails}
            isOpen={showMatchDetails}
            onClose={() => setShowMatchDetails(false)}
            onExpressInterest={handleExpressInterest}
            onSaveMatch={handleSaveMatch}
            onStartConversation={handleStartConversation}
            onShare={() => {}}
            userType={userType}
          />
        )}

        {/* Success Metrics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-500" />
              Platform Success Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">2,847</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Matches Made</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">89%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">$127M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Funding Facilitated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">156</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Successful Investments</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 