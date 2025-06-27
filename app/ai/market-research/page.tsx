"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart2, 
  PieChart, 
  Search, 
  Building, 
  Users, 
  TrendingUp, 
  Filter, 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  Lightbulb,
  Download,
  Share2,
  LineChart,
  CheckCircle2,
  AlertCircle,
  Clipboard,
  Plus
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for market segments
const marketSegments = [
  {
    id: 1,
    name: "Small Business Owners",
    size: "35.4M",
    growth: "+4.2%",
    preferences: ["Cost-effective solutions", "Easy-to-use tools", "Time-saving automation"],
    challenges: ["Limited resources", "Competing with larger businesses", "Managing cash flow"],
    opportunities: ["Personalized services", "Local targeting features", "Simplified compliance tools"],
  },
  {
    id: 2,
    name: "Remote Professionals",
    size: "28.6M",
    growth: "+12.8%",
    preferences: ["Seamless collaboration", "Location independence", "Productivity tools"],
    challenges: ["Communication barriers", "Work-life balance", "Managing time zones"],
    opportunities: ["Virtual team building", "Asynchronous workflow solutions", "Digital well-being features"],
  },
  {
    id: 3,
    name: "Tech Startups",
    size: "5.2M",
    growth: "+8.6%",
    preferences: ["Scalable infrastructure", "Integration capabilities", "Data-driven insights"],
    challenges: ["Securing funding", "Talent acquisition", "Rapid market changes"],
    opportunities: ["AI-powered analytics", "No-code development tools", "Founder community resources"],
  },
  {
    id: 4,
    name: "Healthcare Providers",
    size: "9.7M",
    growth: "+6.3%",
    preferences: ["HIPAA compliance", "Patient-focused solutions", "Interoperability"],
    challenges: ["Regulatory compliance", "Legacy system integration", "Data security"],
    opportunities: ["Telehealth solutions", "Patient engagement tools", "Preventative care analytics"],
  },
];

// Mock data for competitors
const competitors = [
  {
    id: 1,
    name: "TechVenture Pro",
    category: "SaaS Platform",
    founded: "2019",
    fundingStage: "Series B ($45M)",
    marketShare: "12%",
    userBase: "210,000",
    pricing: "$39-$299/month",
    strengths: ["Strong brand recognition", "Comprehensive feature set", "Enterprise integrations"],
    weaknesses: ["Complex user interface", "High pricing for small businesses", "Slow customer support"],
    targetMarket: "Mid to large enterprises"
  },
  {
    id: 2,
    name: "LaunchPad",
    category: "Startup Tool Suite",
    founded: "2021",
    fundingStage: "Seed ($3.5M)",
    marketShare: "4%",
    userBase: "42,000",
    pricing: "$15-$99/month",
    strengths: ["Modern UI/UX", "Affordable pricing", "Fast innovation cycle"],
    weaknesses: ["Limited feature set", "No enterprise options", "Small support team"],
    targetMarket: "Early-stage startups"
  },
  {
    id: 3,
    name: "Enterprise Innovations",
    category: "Business Solutions Platform",
    founded: "2014",
    fundingStage: "Public (Market Cap: $2.8B)",
    marketShare: "28%",
    userBase: "485,000",
    pricing: "$199-$999/month",
    strengths: ["Market leader status", "Advanced security features", "24/7 dedicated support"],
    weaknesses: ["Outdated interface", "Slow to adopt new technologies", "Rigid contract terms"],
    targetMarket: "Fortune 1000 companies"
  },
  {
    id: 4,
    name: "Agile Solutions",
    category: "Project Management Platform",
    founded: "2018",
    fundingStage: "Series A ($12M)",
    marketShare: "8%",
    userBase: "150,000",
    pricing: "$19-$149/month",
    strengths: ["Industry-leading UI", "Flexible implementation", "Strong mobile experience"],
    weaknesses: ["Limited integrations", "Growing reliability issues", "Feature bloat"],
    targetMarket: "Mid-sized businesses"
  },
];

// Mock data for industry trends
const industryTrends = [
  {
    id: 1,
    name: "AI-powered Automation",
    impact: "High",
    adoptionRate: "62%",
    timeframe: "Current",
    description: "Integration of artificial intelligence to automate routine tasks, enhance decision-making, and personalize user experiences.",
    opportunities: ["Predictive analytics features", "Natural language interfaces", "Automated workflow optimization"],
    threats: ["Rapid technological obsolescence", "Increasing development costs", "Talent shortage"],
  },
  {
    id: 2,
    name: "Remote Work Revolution",
    impact: "High",
    adoptionRate: "78%",
    timeframe: "Current",
    description: "Permanent shift toward flexible work arrangements and distributed teams, driving demand for collaboration and productivity tools.",
    opportunities: ["Virtual office solutions", "Asynchronous collaboration tools", "Remote team management features"],
    threats: ["Market saturation", "Commoditization of basic features", "Security challenges"],
  },
  {
    id: 3,
    name: "Low-Code/No-Code Development",
    impact: "Medium",
    adoptionRate: "44%",
    timeframe: "1-2 Years",
    description: "Democratization of software development through visual interfaces and pre-built components requiring minimal coding.",
    opportunities: ["Citizen developer tools", "Template marketplaces", "Integration ecosystems"],
    threats: ["Eroding technical differentiation", "Price pressure", "Scalability limitations"],
  },
  {
    id: 4,
    name: "Sustainability Focus",
    impact: "Medium",
    adoptionRate: "36%",
    timeframe: "2-3 Years",
    description: "Growing emphasis on environmental impact and corporate responsibility throughout business operations and software development.",
    opportunities: ["Carbon footprint tracking", "Sustainable business metrics", "ESG reporting tools"],
    threats: ["Regulatory compliance costs", "Measurement standardization", "Greenwashing concerns"],
  },
  {
    id: 5,
    name: "Web3 and Decentralization",
    impact: "Medium-High",
    adoptionRate: "23%",
    timeframe: "3-5 Years",
    description: "Blockchain-based technologies enabling decentralized applications, ownership, and value exchange without traditional intermediaries.",
    opportunities: ["Tokenized reward systems", "Decentralized identity verification", "Smart contract automation"],
    threats: ["Regulatory uncertainty", "Technical complexity", "Mainstream adoption barriers"],
  },
];

// Add market segment images
const segmentImages = {
  "Small Business Owners": "/images/small-business-owners.jpg",
  "Remote Professionals": "/images/remote-professionals.jpg",
  "Tech Startups": "/images/tech-startups.jpg", 
  "Healthcare Providers": "/images/healthcare-providers.jpg"
};

// Add competitor logos
const competitorLogos = {
  "TechVenture Pro": "/images/logos/techventure-pro.png",
  "LaunchPad": "/images/logos/launchpad.png",
  "Enterprise Innovations": "/images/logos/enterprise-innovations.png",
  "Agile Solutions": "/images/logos/agile-solutions.png"
};

// Add trend images
const trendImages = {
  "AI-powered Automation": "/images/trends/ai-automation.jpg",
  "Remote Work Revolution": "/images/trends/remote-work.jpg",
  "Low-Code/No-Code Development": "/images/trends/low-code.jpg",
  "Sustainability Focus": "/images/trends/sustainability.jpg",
  "Web3 and Decentralization": "/images/trends/web3.jpg"
};

export default function MarketResearchPage() {
  const [activeTab, setActiveTab] = useState("segments");
  const [currentSegment, setCurrentSegment] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompetitor, setSelectedCompetitor] = useState<number | null>(null);
  
  // Filter function for competitors search
  const filteredCompetitors = competitors.filter(competitor => 
    searchQuery === "" || 
    competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    competitor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    competitor.targetMarket.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <BarChart2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Market Research</h1>
          <p className="text-slate-600 dark:text-slate-400">Analyze your target market, competitors, and industry trends</p>
        </div>
      </div>
      
      <Tabs defaultValue="segments" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="segments" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Target Market Segments
          </TabsTrigger>
          <TabsTrigger value="competitors" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Competitor Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Industry Trends
          </TabsTrigger>
        </TabsList>
        
        {/* Target Market Segments Tab */}
        <TabsContent value="segments">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Market Segments</CardTitle>
                  <CardDescription>Analyze potential target audiences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {marketSegments.map((segment) => (
                    <Button
                      key={segment.id}
                      variant={currentSegment === segment.id ? "default" : "outline"}
                      className={`w-full justify-between text-left font-normal ${
                        currentSegment === segment.id ? "bg-gradient-primary" : ""
                      }`}
                      onClick={() => setCurrentSegment(segment.id)}
                    >
                      <span>{segment.name}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Define New Segment
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{marketSegments[currentSegment - 1].name}</CardTitle>
                      <CardDescription>Market size: {marketSegments[currentSegment - 1].size} • Growth: {marketSegments[currentSegment - 1].growth}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* Add segment image */}
                  <div className="mb-6 relative w-full h-40 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10 z-10"></div>
                    <Image 
                      src={segmentImages[marketSegments[currentSegment - 1].name as keyof typeof segmentImages] || "/images/default-segment.jpg"}
                      alt={marketSegments[currentSegment - 1].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Key Preferences</h3>
                      <ul className="space-y-1">
                        {marketSegments[currentSegment - 1].preferences.map((pref, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{pref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Challenges</h3>
                      <ul className="space-y-1">
                        {marketSegments[currentSegment - 1].challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Opportunities</h3>
                      <ul className="space-y-1">
                        {marketSegments[currentSegment - 1].opportunities.map((opp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-sky-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 border border-slate-200 dark:border-slate-700 rounded-md p-4 bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-medium mb-2">AI-Powered Recommendations</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Based on this market segment's preferences and challenges, consider developing features that address their specific pain points:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center">
                            <Users className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Positioning Strategy</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Focus on {marketSegments[currentSegment - 1].preferences[0].toLowerCase()} as your primary value proposition when targeting this segment.
                        </p>
                      </div>
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center">
                            <Lightbulb className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Feature Prioritization</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Prioritize building solutions that address "{marketSegments[currentSegment - 1].challenges[0]}" in your product roadmap.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Competitor Analysis Tab */}
        <TabsContent value="competitors">
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search competitors..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Competitor
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Competitors List */}
            <div className="lg:col-span-2 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium">Competitors</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Click on a competitor to view detailed analysis</p>
                </div>
                
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredCompetitors.length > 0 ? (
                    filteredCompetitors.map((competitor) => (
                      <div 
                        key={competitor.id}
                        className={`p-4 cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                          selectedCompetitor === competitor.id ? "bg-slate-100 dark:bg-slate-800" : ""
                        }`}
                        onClick={() => setSelectedCompetitor(competitor.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {/* Add competitor logo */}
                              <div className="h-8 w-8 relative rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
                                <Image
                                  src={competitorLogos[competitor.name as keyof typeof competitorLogos] || `/images/logos/default-logo.png`}
                                  alt={competitor.name}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <h4 className="font-medium">{competitor.name}</h4>
                            </div>
                            <div className="flex gap-2 text-xs">
                              <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                {competitor.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300">
                                {competitor.marketShare} Market Share
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-slate-500 dark:text-slate-400">No competitors found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Competitor Details */}
            <div className="lg:col-span-3">
              {selectedCompetitor ? (
                <Card>
                  <CardHeader className="border-b border-slate-200 dark:border-slate-700 pb-6">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-2xl">{competitors.find(c => c.id === selectedCompetitor)?.name}</CardTitle>
                        <CardDescription>{competitors.find(c => c.id === selectedCompetitor)?.category}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Clipboard className="mr-2 h-4 w-4" />
                        SWOT Analysis
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Company Overview</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Founded</span>
                              <span className="text-sm font-medium">{competitors.find(c => c.id === selectedCompetitor)?.founded}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Funding</span>
                              <span className="text-sm font-medium">{competitors.find(c => c.id === selectedCompetitor)?.fundingStage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Market Share</span>
                              <span className="text-sm font-medium">{competitors.find(c => c.id === selectedCompetitor)?.marketShare}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Users</span>
                              <span className="text-sm font-medium">{competitors.find(c => c.id === selectedCompetitor)?.userBase}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Pricing</span>
                              <span className="text-sm font-medium">{competitors.find(c => c.id === selectedCompetitor)?.pricing}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Target Market</span>
                              <span className="text-sm font-medium">{competitors.find(c => c.id === selectedCompetitor)?.targetMarket}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Strengths</h4>
                          <ul className="space-y-1">
                            {competitors.find(c => c.id === selectedCompetitor)?.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Weaknesses</h4>
                          <ul className="space-y-1">
                            {competitors.find(c => c.id === selectedCompetitor)?.weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 border border-slate-200 dark:border-slate-700 rounded-md p-4 bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-medium mb-2">Market Positioning Analysis</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Based on our analysis of {competitors.find(c => c.id === selectedCompetitor)?.name}, here are the key differentiation opportunities:
                      </p>
                      <div className="space-y-3">
                        {competitors.find(c => c.id === selectedCompetitor)?.weaknesses.map((weakness, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-primary text-white flex items-center justify-center text-xs">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium">Opportunity: Address their weakness in "{weakness}"</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Developing a superior solution for this pain point could attract customers away from this competitor.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center">
                  <div>
                    <Building className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select a Competitor</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Click on a competitor from the list to view detailed analysis and comparison.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Industry Trends Tab */}
        <TabsContent value="trends">
          <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-medium">Industry Trends Overview</h3>
                <p className="text-slate-600 dark:text-slate-400">Key trends shaping the market and potential impact on your business</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white dark:bg-slate-800">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Impact
                </Button>
                <Button variant="outline" className="bg-white dark:bg-slate-800">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="relative overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Trend</th>
                    <th className="px-4 py-3 font-medium">Impact</th>
                    <th className="px-4 py-3 font-medium">Adoption</th>
                    <th className="px-4 py-3 font-medium">Timeframe</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {industryTrends.map((trend) => (
                    <tr key={trend.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* Add trend image */}
                          <div className="h-10 w-10 relative rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                            <Image
                              src={trendImages[trend.name as keyof typeof trendImages] || "/images/trends/default-trend.jpg"}
                              alt={trend.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">{trend.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${trend.impact === "High" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" : 
                            trend.impact.includes("Medium") ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" :
                            "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"}
                        `}>
                          {trend.impact}
                        </span>
                      </td>
                      <td className="px-4 py-3">{trend.adoptionRate}</td>
                      <td className="px-4 py-3">{trend.timeframe}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industryTrends.slice(0, 2).map((trend) => (
              <Card key={trend.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{trend.name}</CardTitle>
                      <CardDescription>Impact: {trend.impact} • Adoption: {trend.adoptionRate}</CardDescription>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                      {trend.timeframe}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {trend.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Opportunities</h4>
                      <ul className="space-y-1">
                        {trend.opportunities.map((opp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Threats</h4>
                      <ul className="space-y-1">
                        {trend.threats.map((threat, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{threat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between w-full">
                    <Button variant="outline">
                      <Globe className="mr-2 h-4 w-4" />
                      Research
                    </Button>
                    <Button className="bg-gradient-primary">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Apply to Your Business
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-sky-100 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <LineChart className="h-10 w-10 text-sky-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium mb-2">AI-Powered Trend Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Based on current industry trends and your business model, our AI suggests focusing on these strategic priorities:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-emerald-500 font-medium mb-2">Short Term (0-6 months)</div>
                    <p className="text-sm">
                      Prioritize integrating basic AI automation features to stay competitive with the rapidly growing AI-powered automation trend.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-amber-500 font-medium mb-2">Medium Term (6-18 months)</div>
                    <p className="text-sm">
                      Develop comprehensive remote collaboration tools to capitalize on the ongoing remote work revolution.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-sky-500 font-medium mb-2">Long Term (18+ months)</div>
                    <p className="text-sm">
                      Explore no-code integration capabilities to position your product ahead of the low-code/no-code development trend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 