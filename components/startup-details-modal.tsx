"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building, 
  Globe,
  CheckCircle,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  UserPlus,
  UserMinus,
  Eye,
  ThumbsUp,
  MoreHorizontal,
  Send
} from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface StartupPost {
  id: number;
  type: "update" | "milestone" | "hiring" | "funding" | "announcement";
  title: string;
  content: string;
  author: string;
  authorRole: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  images?: string[];
}

interface StartupDetailsData {
  id: number;
  name: string;
  description: string;
  logo?: string;
  industry: string[];
  stage: string;
  location: string;
  foundedYear: number;
  website?: string;
  
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
  
  // Additional details
  businessModel: string;
  targetMarket: string;
  competitiveAdvantage: string;
  useOfFunds: string;
  
  // Metrics & social
  verified: boolean;
  rating: number;
  totalRatings: number;
  followers: number;
  following: boolean;
  
  // Posts
  posts: StartupPost[];
}

interface StartupDetailsModalProps {
  startup: StartupDetailsData | null;
  isOpen: boolean;
  onClose: () => void;
  onFollow: (startupId: number) => void;
  onUnfollow: (startupId: number) => void;
  onExpressInterest: (startupId: number) => void;
}

export const StartupDetailsModal: React.FC<StartupDetailsModalProps> = ({
  startup,
  isOpen,
  onClose,
  onFollow,
  onUnfollow,
  onExpressInterest
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "posts" | "team" | "financials">("overview");
  const [newComment, setNewComment] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  console.log("StartupDetailsModal render", { isOpen, startup: startup?.name });

  if (!isOpen) {
    console.log("Modal not rendering because isOpen is false");
    return null;
  }

  if (!startup) {
    console.log("Modal not rendering because no startup data");
    return (
      <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white p-8 rounded-lg">
          <p>No startup data available</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
        </div>
      </div>
    );
  }

  const handleFollow = () => {
    if (startup.following) {
      onUnfollow(startup.id);
    } else {
      onFollow(startup.id);
    }
  };

  const handleLikePost = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`} 
          />
        ))}
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
          {rating.toFixed(1)} ({startup.totalRatings} reviews)
        </span>
      </div>
    );
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "milestone": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "funding": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "hiring": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "announcement": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Team Size</span>
          </div>
          <p className="text-2xl font-bold">{startup.teamSize}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Revenue</span>
          </div>
          <p className="text-2xl font-bold">{startup.revenue}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Growth</span>
          </div>
          <p className="text-2xl font-bold">{startup.growth}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Customers</span>
          </div>
          <p className="text-2xl font-bold">{startup.customers.toLocaleString()}</p>
        </Card>
      </div>

      {/* Business Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Model</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">{startup.businessModel}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Target Market</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">{startup.targetMarket}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Competitive Advantage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">{startup.competitiveAdvantage}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Use of Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">{startup.useOfFunds}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPostsTab = () => (
    <div className="space-y-4">
      {startup.posts.map((post) => (
        <Card key={post.id} className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {post.author.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{post.author}</span>
                <span className="text-sm text-gray-500">• {post.authorRole}</span>
                <Badge className={getPostTypeColor(post.type)} variant="secondary">
                  {post.type}
                </Badge>
                <span className="text-sm text-gray-500">• {post.timestamp}</span>
              </div>
              
              <h3 className="font-medium mb-2">{post.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button 
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1 hover:text-blue-600 ${
                    likedPosts.includes(post.id) ? 'text-blue-600' : ''
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
                
                <button className="flex items-center gap-1 hover:text-green-600">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments}
                </button>
                
                <button className="flex items-center gap-1 hover:text-purple-600">
                  <Share2 className="h-4 w-4" />
                  {post.shares}
                </button>
                
                <button className="flex items-center gap-1 hover:text-orange-600 ml-auto">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {startup.posts.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No posts yet. Follow this startup to see their updates!</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
          <Card className="h-full flex flex-col">
            {/* Header */}
            <CardHeader className="border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{startup.name}</CardTitle>
                    {startup.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    {renderStarRating(startup.rating)}
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {startup.followers.toLocaleString()} followers
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                      {startup.stage}
                    </Badge>
                    {startup.industry.map((ind) => (
                      <Badge key={ind} variant="secondary" className="text-xs">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                  
                  <CardDescription className="text-base mb-4">
                    {startup.description}
                  </CardDescription>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {startup.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Founded {startup.foundedYear}
                    </div>
                    {startup.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <a href={startup.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleFollow}
                    variant={startup.following ? "outline" : "default"}
                    className={startup.following 
                      ? "border-red-500 text-red-600 hover:bg-red-50" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                    }
                  >
                    {startup.following ? (
                      <>
                        <UserMinus className="h-4 w-4 mr-2" />
                        Unfollow
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => onExpressInterest(startup.id)}
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Express Interest
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Tabs */}
            <div className="flex-1 overflow-hidden">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="h-full flex flex-col">
                <TabsList className="mx-6 mt-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="posts">Updates ({startup.posts.length})</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                </TabsList>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <TabsContent value="overview" className="mt-0">
                    {renderOverviewTab()}
                  </TabsContent>
                  
                  <TabsContent value="posts" className="mt-0">
                    {renderPostsTab()}
                  </TabsContent>
                  
                  <TabsContent value="team" className="mt-0">
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Team information will be available soon.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="financials" className="mt-0">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Funding Status</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span>Seeking:</span>
                                <span className="font-semibold">{startup.fundingNeeded}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Equity Offered:</span>
                                <span className="font-semibold">{startup.equityOffered}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Valuation:</span>
                                <span className="font-semibold">{startup.currentValuation}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Previous Rounds</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {startup.previousRounds && startup.previousRounds.length > 0 ? (
                              <div className="space-y-2">
                                {startup.previousRounds.map((round, index) => (
                                  <div key={index} className="text-sm">
                                    {round}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">No previous funding rounds</p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </Card>
      </div>
    </div>
  );
};