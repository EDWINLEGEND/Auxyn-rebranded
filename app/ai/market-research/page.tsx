"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Globe,
  Target,
  ArrowUp,
  ArrowDown,
  Search,
  Download,
  PieChart,
  Building,
  Filter,
  ArrowRight,
  ChevronRight,
  Lightbulb,
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
];

export default function MarketResearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
          <BarChart2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Market Research</h1>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive market intelligence to validate your startup ideas</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search markets, competitors, or trends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
            <Search className="h-4 w-4 mr-2" />
            Research
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="segments">Target Segments</TabsTrigger>
          <TabsTrigger value="trends">Industry Trends</TabsTrigger>
          <TabsTrigger value="competitors">Competition</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Market Size</CardTitle>
                <CardDescription>Global startup ecosystem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3.2T</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +12% YoY
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Startups</CardTitle>
                <CardDescription>Globally registered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150K+</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +18% YoY
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Avg. Time to Market</CardTitle>
                <CardDescription>Product launch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.2 mo</div>
                <div className="flex items-center text-red-600 text-sm">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  -15% YoY
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Success Rate</CardTitle>
                <CardDescription>First-year survival</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +5% YoY
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hot Sectors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Startup Sectors</CardTitle>
              <CardDescription>Most active sectors by new ventures and market interest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { sector: "AI/Machine Learning", startups: 12400, funding: "$12.8B", growth: "+35%" },
                  { sector: "SaaS/B2B Tools", startups: 8900, funding: "$9.2B", growth: "+28%" },
                  { sector: "HealthTech", startups: 6200, funding: "$8.1B", growth: "+22%" },
                  { sector: "FinTech", startups: 5800, funding: "$6.4B", growth: "+18%" },
                  { sector: "E-commerce", startups: 4500, funding: "$4.2B", growth: "+12%" }
                ].map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{sector.sector}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{sector.startups.toLocaleString()} startups</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{sector.funding}</div>
                      <div className="text-green-600 text-sm">{sector.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-8">
          <div className="grid gap-6">
            {marketSegments.map((segment) => (
              <Card key={segment.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      {segment.name}
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{segment.size} people</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {segment.growth} growth
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Preferences
                      </h4>
                      <ul className="space-y-2">
                        {segment.preferences.map((pref, index) => (
                          <li key={index} className="text-sm text-slate-600 dark:text-slate-400">
                            • {pref}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Challenges
                      </h4>
                      <ul className="space-y-2">
                        {segment.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-slate-600 dark:text-slate-400">
                            • {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-500" />
                        Opportunities
                      </h4>
                      <ul className="space-y-2">
                        {segment.opportunities.map((opportunity, index) => (
                          <li key={index} className="text-sm text-slate-600 dark:text-slate-400">
                            • {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-8">
          <div className="grid gap-6">
            {industryTrends.map((trend) => (
              <Card key={trend.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5" />
                      {trend.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={trend.impact === "High" ? "default" : "secondary"}
                        className={trend.impact === "High" ? "bg-red-500" : ""}
                      >
                        {trend.impact} Impact
                      </Badge>
                      <Badge variant="outline">{trend.adoptionRate} adoption</Badge>
                      <Badge variant="outline">{trend.timeframe}</Badge>
                    </div>
                  </div>
                  <CardDescription>{trend.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-500" />
                        Opportunities
                      </h4>
                      <ul className="space-y-2">
                        {trend.opportunities.map((opportunity, index) => (
                          <li key={index} className="text-sm text-slate-600 dark:text-slate-400">
                            • {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        Threats
                      </h4>
                      <ul className="space-y-2">
                        {trend.threats.map((threat, index) => (
                          <li key={index} className="text-sm text-slate-600 dark:text-slate-400">
                            • {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Landscape</CardTitle>
              <CardDescription>Key players and market positioning analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {[
                  {
                    name: "TechVenture Pro",
                    category: "SaaS Platform",
                    marketShare: "12%",
                    userBase: "210K+",
                    pricing: "$39-$299/mo",
                    strengths: ["Strong brand", "Enterprise features", "Integrations"],
                    weaknesses: ["Complex UI", "High pricing", "Slow support"]
                  },
                  {
                    name: "LaunchPad",
                    category: "Startup Tools",
                    marketShare: "4%",
                    userBase: "42K+",
                    pricing: "$15-$99/mo",
                    strengths: ["Modern UI", "Affordable", "Fast updates"],
                    weaknesses: ["Limited features", "No enterprise", "Small team"]
                  },
                  {
                    name: "Enterprise Innovations",
                    category: "Business Platform",
                    marketShare: "28%",
                    userBase: "485K+",
                    pricing: "$199-$999/mo",
                    strengths: ["Market leader", "Security", "24/7 support"],
                    weaknesses: ["Outdated UI", "Slow innovation", "Rigid terms"]
                  }
                ].map((competitor, index) => (
                  <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{competitor.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{competitor.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{competitor.marketShare} market share</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{competitor.userBase} users</div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Pricing</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{competitor.pricing}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2 text-green-600">Strengths</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.strengths.map((strength, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-400">• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2 text-red-600">Weaknesses</h5>
                        <ul className="text-sm space-y-1">
                          {competitor.weaknesses.map((weakness, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-400">• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Generate Report
            </CardTitle>
            <CardDescription>Create a comprehensive market analysis report</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
              <Download className="mr-2 h-4 w-4" />
              Download Market Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              AI Insights
            </CardTitle>
            <CardDescription>Get personalized market recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/ai">
              <Button variant="outline" className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                Get AI Recommendations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 