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
  Star,
  CheckCircle,
  UserPlus,
  UserMinus,
  Heart
} from "lucide-react";
import { StartupDetailsModal } from "@/components/startup-details-modal";
import { StartupRatingModal } from "@/components/startup-rating-modal";

// Mock data for startup discovery
const mockStartups = [
  {
    id: 1,
    name: "AI Analytics Pro",
    description: "Advanced AI-powered business analytics platform for enterprise clients.",
    industry: ["SaaS", "AI/ML", "Enterprise"],
    stage: "Series A",
    location: "San Francisco, CA",
    founded: 2022,
    foundedYear: 2022,
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
    },
    // New fields for modal
    rating: 4.5,
    totalRatings: 127,
    followers: 1834,
    following: false,
    verified: true,
    website: "https://aianalyticspro.com",
    businessModel: "B2B SaaS with tiered subscription pricing starting at $99/month per user",
    targetMarket: "Enterprise companies with 1000+ employees needing advanced analytics capabilities",
    competitiveAdvantage: "Our proprietary AI algorithms provide 40% more accurate predictions than competitors",
    useOfFunds: "70% product development, 20% marketing & sales, 10% operations",
    fundingNeeded: "$5M",
    equityOffered: "12%",
    currentValuation: "$25M",
    previousRounds: ["Pre-seed: $500K", "Seed: $2M"],
    customers: 125,
    posts: [
      {
        id: 1,
        type: "milestone" as const,
        title: "🎉 We just reached 10,000+ active users!",
        content: "Incredible milestone for our team! Thanks to all our customers who've trusted us with their analytics needs. This growth validates our vision of making AI-powered analytics accessible to every enterprise.",
        author: "Sarah Chen",
        authorRole: "CEO & Co-founder",
        timestamp: "2 days ago",
        likes: 45,
        comments: 12,
        shares: 8,
        liked: false
      },
      {
        id: 2,
        type: "funding" as const,
        title: "Series A Round Progress Update",
        content: "We're excited to share that we've raised $3.2M of our $5M Series A round! The funding will accelerate our product development and expand our engineering team. Looking for strategic investors to join us.",
        author: "Michael Rodriguez",
        authorRole: "COO",
        timestamp: "1 week ago",
        likes: 89,
        comments: 24,
        shares: 15,
        liked: false
      }
    ]
  },
  {
    id: 2,
    name: "GreenTech Solutions",
    description: "Renewable energy optimization software for commercial buildings.",
    industry: ["CleanTech", "IoT", "Enterprise"],
    stage: "Seed",
    location: "Austin, TX",
    founded: 2023,
    foundedYear: 2023,
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
    },
    // New fields for modal
    rating: 4.2,
    totalRatings: 83,
    followers: 892,
    following: true,
    verified: true,
    website: "https://greentechsolutions.com",
    businessModel: "SaaS subscription model with hardware integration partnerships",
    targetMarket: "Commercial real estate owners and facility managers",
    competitiveAdvantage: "First-to-market IoT solution specifically designed for legacy building systems",
    useOfFunds: "60% product development, 25% customer acquisition, 15% team expansion",
    fundingNeeded: "$2M",
    equityOffered: "18%",
    currentValuation: "$8M",
    previousRounds: ["Pre-seed: $300K"],
    customers: 78,
    posts: [
      {
        id: 3,
        type: "announcement" as const,
        title: "Partnership with BuildingTech Corp",
        content: "Proud to announce our strategic partnership with BuildingTech Corp, the largest facility management company in Texas. This partnership will help us deploy our solution to 500+ commercial buildings.",
        author: "Emma Thompson",
        authorRole: "CEO",
        timestamp: "3 days ago",
        likes: 67,
        comments: 18,
        shares: 22,
        liked: false
      }
    ]
  },
  {
    id: 3,
    name: "HealthStream",
    description: "Telemedicine platform connecting patients with specialized healthcare providers.",
    industry: ["HealthTech", "Mobile", "B2C"],
    stage: "Series B",
    location: "Boston, MA",
    founded: 2021,
    foundedYear: 2021,
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
    },
    // New fields for modal
    rating: 4.7,
    totalRatings: 256,
    followers: 3241,
    following: false,
    verified: true,
    website: "https://healthstream.com",
    businessModel: "Subscription-based telemedicine platform with per-consultation fees",
    targetMarket: "Patients seeking specialized healthcare consultations and healthcare providers",
    competitiveAdvantage: "Specialized provider network and AI-powered matching for optimal patient-doctor pairing",
    useOfFunds: "50% technology development, 30% provider acquisition, 20% regulatory compliance",
    fundingNeeded: "$15M",
    equityOffered: "8%",
    currentValuation: "$80M",
    previousRounds: ["Seed: $2M", "Series A: $8M"],
    customers: 50000,
    posts: [
      {
        id: 4,
        type: "milestone" as const,
        title: "FDA Approval Milestone Achieved!",
        content: "We're thrilled to announce that HealthStream has received FDA approval for our AI diagnostic assistance feature. This is a game-changer for our platform and will significantly improve patient outcomes.",
        author: "Dr. James Park",
        authorRole: "Chief Medical Officer",
        timestamp: "1 day ago",
        likes: 234,
        comments: 56,
        shares: 89,
        liked: false
      },
      {
        id: 5,
        type: "hiring" as const,
        title: "We're hiring! Join our mission to revolutionize healthcare",
        content: "Looking for talented engineers, healthcare professionals, and product managers to join our growing team. We're building the future of telemedicine. Check out our careers page!",
        author: "Lisa Wang",
        authorRole: "Head of People",
        timestamp: "4 days ago",
        likes: 78,
        comments: 23,
        shares: 45,
        liked: false
      }
    ]
  }
];

export default function InvestorStartupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followedStartups, setFollowedStartups] = useState<number[]>([2]); // GreenTech is pre-followed
  const [interestedStartups, setInterestedStartups] = useState<number[]>([]);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [startupToRate, setStartupToRate] = useState<any>(null);
  const [ratingModalDefaultTab, setRatingModalDefaultTab] = useState<"rate" | "reviews">("rate");

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.industry.some((ind: string) => ind.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTab = activeTab === "all" || startup.stage.toLowerCase().includes(activeTab.toLowerCase());
    
    return matchesSearch && matchesTab;
  });

  const handleViewDetails = (startup: any) => {
    console.log("handleViewDetails called", startup);
    const startupWithFollowingStatus = {
      ...startup,
      following: followedStartups.includes(startup.id)
    };
    setSelectedStartup(startupWithFollowingStatus);
    setIsModalOpen(true);
    console.log("Modal state set to true", { selectedStartup: startupWithFollowingStatus, isModalOpen: true });
  };

  const handleFollow = (startupId: number) => {
    setFollowedStartups(prev => [...prev, startupId]);
    if (selectedStartup && selectedStartup.id === startupId) {
      setSelectedStartup((prev: any) => ({ ...prev, following: true, followers: prev.followers + 1 }));
    }
  };

  const handleUnfollow = (startupId: number) => {
    setFollowedStartups(prev => prev.filter(id => id !== startupId));
    if (selectedStartup && selectedStartup.id === startupId) {
      setSelectedStartup((prev: any) => ({ ...prev, following: false, followers: prev.followers - 1 }));
    }
  };

  const handleExpressInterest = (startupId: number) => {
    setInterestedStartups(prev => [...prev, startupId]);
  };

  const handleOpenRatingModal = (startup: any, defaultTab: "rate" | "reviews" = "rate") => {
    setStartupToRate(startup);
    setRatingModalDefaultTab(defaultTab);
    setIsRatingModalOpen(true);
  };

  const handleSubmitRating = (rating: number, review: string) => {
    console.log("New rating submitted:", { startupId: startupToRate?.id, rating, review });
    // In a real app, you would send this data to your backend
    // For now, we'll just log it and potentially update the local state
    
    // Update the startup's rating (simplified calculation)
    const updatedStartups = mockStartups.map(startup => {
      if (startup.id === startupToRate?.id) {
        const newTotalRatings = startup.totalRatings + 1;
        const newAverageRating = ((startup.rating * startup.totalRatings) + rating) / newTotalRatings;
        return {
          ...startup,
          rating: Math.round(newAverageRating * 10) / 10, // Round to 1 decimal
          totalRatings: newTotalRatings
        };
      }
      return startup;
    });
    
    alert(`Rating submitted successfully! New average rating: ${((startupToRate.rating * startupToRate.totalRatings + rating) / (startupToRate.totalRatings + 1)).toFixed(1)}`);
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
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

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
        <Button 
          onClick={() => {
            console.log("Test button clicked!");
            setSelectedStartup(mockStartups[0]);
            setIsModalOpen(true);
            console.log("Modal state should be true now");
          }} 
          className="ml-auto"
          variant="outline"
        >
          Test Modal
        </Button>
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
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{startup.name}</h3>
                        {startup.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      
                      <div className="mb-3 flex items-center gap-4">
                        {renderStarRating(startup.rating)}
                        <button 
                          onClick={() => handleOpenRatingModal(startup, "reviews")}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          ({startup.totalRatings} reviews)
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {startup.industry.map((ind: string) => (
                          <Badge key={ind} variant="outline">{ind}</Badge>
                        ))}
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
                    <div className="flex flex-col gap-2">
                      {followedStartups.includes(startup.id) ? (
                        <Button
                          variant="outline"
                          className="border-red-500 text-red-600 hover:bg-red-50"
                          onClick={() => handleUnfollow(startup.id)}
                        >
                          <UserMinus className="h-4 w-4 mr-2" />
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          onClick={() => handleFollow(startup.id)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Follow
                        </Button>
                      )}
                      <Button 
                        className="bg-gradient-to-r from-green-500 to-teal-600"
                        onClick={() => handleExpressInterest(startup.id)}
                        disabled={interestedStartups.includes(startup.id)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        {interestedStartups.includes(startup.id) ? "Interest Sent" : "Express Interest"}
                      </Button>
                    </div>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(startup)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleOpenRatingModal(startup)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Rate
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

      {/* Startup Details Modal */}
      <StartupDetailsModal
        startup={selectedStartup}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
        onExpressInterest={handleExpressInterest}
      />

      {/* Startup Rating Modal */}
      <StartupRatingModal
        startup={startupToRate}
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onSubmitRating={handleSubmitRating}
        defaultTab={ratingModalDefaultTab}
      />
    </div>  
  );
} 