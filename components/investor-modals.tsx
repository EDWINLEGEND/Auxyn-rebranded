"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Target,
  Globe,
  BookOpen,
  Briefcase,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  Calendar,
  Star,
  Shield,
  Zap,
  Eye,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Base Modal Component
const BaseModal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string; icon: React.ReactNode }> = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  icon 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                {icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Due Diligence Guides Modal
export const DueDiligenceGuidesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const guides = [
    {
      title: "Startup Evaluation Framework",
      description: "Comprehensive 50-point checklist for evaluating early-stage startups",
      category: "Framework",
      readTime: "15 min",
      difficulty: "Beginner",
      topics: ["Team Assessment", "Market Analysis", "Product Validation", "Financial Review"]
    },
    {
      title: "Financial Due Diligence Guide",
      description: "Deep dive into financial statements, projections, and key metrics",
      category: "Financial",
      readTime: "25 min",
      difficulty: "Advanced",
      topics: ["Revenue Models", "Unit Economics", "Cash Flow", "Burn Rate"]
    },
    {
      title: "Technical Due Diligence",
      description: "Evaluating technology stack, IP, and technical risks",
      category: "Technical",
      readTime: "20 min",
      difficulty: "Intermediate",
      topics: ["Code Quality", "Scalability", "Security", "IP Protection"]
    },
    {
      title: "Market & Competitive Analysis",
      description: "Assessing market size, competition, and growth potential",
      category: "Market",
      readTime: "18 min",
      difficulty: "Beginner",
      topics: ["TAM/SAM/SOM", "Competitive Landscape", "Market Trends", "Customer Validation"]
    }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Due Diligence Guides" 
      icon={<BookOpen className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Comprehensive guides to help you make informed investment decisions with confidence.
        </p>
        
        <div className="grid gap-4">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{guide.category}</Badge>
                      <Badge variant="outline">{guide.difficulty}</Badge>
                      <span className="text-sm text-gray-500">{guide.readTime}</span>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription className="mt-1">{guide.description}</CardDescription>
                  </div>
                  <Button size="sm" className="ml-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {guide.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Pro Tip</h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Start with the Startup Evaluation Framework for a systematic approach, then dive deeper with specialized guides based on your investment focus.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

// Investor Network Modal
export const InvestorNetworkModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("discover");
  
  const investors = [
    {
      name: "Sarah Chen",
      title: "Partner at TechVentures",
      location: "San Francisco, CA",
      focus: ["SaaS", "AI/ML", "Enterprise"],
      portfolio: 45,
      rating: 4.8,
      verified: true
    },
    {
      name: "Michael Rodriguez",
      title: "Angel Investor",
      location: "New York, NY", 
      focus: ["FinTech", "Healthcare", "CleanTech"],
      portfolio: 28,
      rating: 4.9,
      verified: true
    },
    {
      name: "Emily Johnson",
      title: "Managing Director, Growth Capital",
      location: "Boston, MA",
      focus: ["B2B SaaS", "EdTech", "Infrastructure"],
      portfolio: 67,
      rating: 4.7,
      verified: true
    }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Investor Network" 
      icon={<Users className="h-5 w-5 text-white" />}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="network">My Network</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover" className="space-y-4">
          <div className="flex gap-4 mb-6">
            <Input placeholder="Search investors..." className="flex-1" />
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          
          {investors.map((investor, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {investor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{investor.name}</h3>
                        {investor.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-600">{investor.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{investor.title}</p>
                      <p className="text-gray-500 text-sm mb-3">{investor.location} • {investor.portfolio} investments</p>
                      <div className="flex gap-2">
                        {investor.focus.map((focus, focusIndex) => (
                          <Badge key={focusIndex} variant="secondary" className="text-xs">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Connect</Button>
                    <Button size="sm">Message</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="network" className="space-y-4">
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Build Your Network
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connect with other investors to share insights and opportunities.
            </p>
            <Button>Start Connecting</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-4">
          <div className="grid gap-4">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">SaaS Investors Circle</h3>
                    <p className="text-gray-600 text-sm mb-2">1,247 members • 45 new posts this week</p>
                    <Badge variant="secondary">SaaS</Badge>
                  </div>
                  <Button variant="outline">Join</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">AI/ML Investment Hub</h3>
                    <p className="text-gray-600 text-sm mb-2">892 members • 28 new posts this week</p>
                    <Badge variant="secondary">AI/ML</Badge>
                  </div>
                  <Button variant="outline">Join</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
};

// Market Intelligence Modal
export const MarketIntelligenceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const marketData = [
    {
      sector: "SaaS",
      growth: "+23.5%",
      funding: "$45.2B",
      deals: 1247,
      trend: "up",
      color: "text-green-600"
    },
    {
      sector: "FinTech",
      growth: "+18.2%",
      funding: "$32.8B",
      deals: 892,
      trend: "up",
      color: "text-green-600"
    },
    {
      sector: "HealthTech",
      growth: "+15.7%",
      funding: "$28.4B",
      deals: 634,
      trend: "up",
      color: "text-green-600"
    },
    {
      sector: "CleanTech",
      growth: "-2.3%",
      funding: "$19.6B",
      deals: 445,
      trend: "down",
      color: "text-red-600"
    }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Market Intelligence" 
      icon={<TrendingUp className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</p>
                  <p className="text-2xl font-bold">$2.4T</p>
                  <p className="text-sm text-green-600">+12.3% YoY</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Deals</p>
                  <p className="text-2xl font-bold">3,218</p>
                  <p className="text-sm text-green-600">+8.7% this month</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sector Performance</CardTitle>
            <CardDescription>Real-time market data by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.map((sector, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
                    <div>
                      <h3 className="font-semibold">{sector.sector}</h3>
                      <p className="text-sm text-gray-600">{sector.deals} deals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{sector.funding}</p>
                    <p className={`text-sm ${sector.color}`}>{sector.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-4">
          <Button className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            Full Market Report
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

// Portfolio Performance Modal
export const PortfolioPerformanceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const performanceData = [
    { name: "TechFlow Solutions", value: "+35%", amount: "$250K", status: "Outperforming" },
    { name: "GreenEnergy Innovations", value: "+120%", amount: "$100K", status: "Exceptional" },
    { name: "HealthTech Analytics", value: "+85%", amount: "$500K", status: "Strong" },
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Portfolio Performance" 
      icon={<BarChart3 className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">+67.3%</p>
              <p className="text-sm text-gray-600">Total ROI</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">$850K</p>
              <p className="text-sm text-gray-600">Total Invested</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-sm text-gray-600">Active Investments</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
            <CardDescription>Individual investment returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((investment, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h3 className="font-semibold">{investment.name}</h3>
                    <p className="text-sm text-gray-600">Investment: {investment.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{investment.value}</p>
                    <Badge variant="secondary">{investment.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseModal>
  );
};

// Risk Assessment Modal
export const RiskAssessmentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const riskFactors = [
    { factor: "Market Risk", level: "Medium", score: 6.2, description: "Competitive market with established players" },
    { factor: "Technology Risk", level: "Low", score: 3.1, description: "Proven technology stack with strong IP protection" },
    { factor: "Team Risk", level: "Low", score: 2.8, description: "Experienced team with relevant industry background" },
    { factor: "Financial Risk", level: "High", score: 8.4, description: "High burn rate with limited runway" },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "High": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Risk Assessment" 
      icon={<Shield className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">5.1</p>
              <p className="text-sm text-gray-600">Overall Risk Score</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">Medium</p>
              <p className="text-sm text-gray-600">Risk Level</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Risk Breakdown</CardTitle>
            <CardDescription>Detailed risk analysis by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((risk, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{risk.factor}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{risk.score}/10</span>
                      <Badge className={getRiskColor(risk.level)}>
                        {risk.level}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{risk.description}</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        risk.level === "Low" ? "bg-green-500" :
                        risk.level === "Medium" ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${risk.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚠️ Recommendation</h3>
          <p className="text-amber-800 dark:text-amber-200 text-sm">
            Consider reducing position size due to high financial risk. Monitor burn rate closely and ensure adequate runway for next milestones.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

// Company Research Modal
export const CompanyResearchModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Company Research" 
      icon={<Search className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <Input placeholder="Enter company name or domain..." className="flex-1" />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Research
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Founded</Label>
                    <p className="font-medium">2022</p>
                  </div>
                  <div>
                    <Label>Employees</Label>
                    <p className="font-medium">12-50</p>
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <p className="font-medium">SaaS, AI/ML</p>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Revenue (ARR)</span>
                    <span className="font-medium">$500K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth Rate</span>
                    <span className="font-medium text-green-600">+200% YoY</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Burn Rate</span>
                    <span className="font-medium">$50K/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Runway</span>
                    <span className="font-medium">18 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leadership Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      JS
                    </div>
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-gray-600">CEO & Co-founder</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="market" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>TAM</span>
                    <span className="font-medium">$50B</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SAM</span>
                    <span className="font-medium">$5B</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SOM</span>
                    <span className="font-medium">$500M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BaseModal>
  );
};

// Legal Templates Modal
export const LegalTemplatesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const templates = [
    {
      title: "Term Sheet Template",
      description: "Standard term sheet for early-stage investments",
      category: "Investment",
      size: "2.4 MB",
      format: "PDF",
      downloads: 1247
    },
    {
      title: "SAFE Agreement",
      description: "Simple Agreement for Future Equity template",
      category: "Investment", 
      size: "1.8 MB",
      format: "PDF",
      downloads: 2156
    },
    {
      title: "Due Diligence Checklist",
      description: "Comprehensive 50-point due diligence checklist",
      category: "Due Diligence",
      size: "856 KB",
      format: "PDF",
      downloads: 892
    },
    {
      title: "Investment Agreement",
      description: "Standard investment agreement template",
      category: "Legal",
      size: "3.2 MB", 
      format: "DOCX",
      downloads: 634
    }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Legal Templates" 
      icon={<FileText className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Download professionally drafted legal templates to streamline your investment process.
        </p>
        
        <div className="grid gap-4">
          {templates.map((template, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{template.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{template.description}</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{template.category}</Badge>
                        <Badge variant="outline">{template.format}</Badge>
                        <span className="text-xs text-gray-500">{template.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">{template.downloads} downloads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">⚖️ Legal Disclaimer</h3>
          <p className="text-orange-800 dark:text-orange-200 text-sm">
            These templates are for informational purposes only. Always consult with qualified legal counsel before using any legal documents.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

// Portfolio Tools Modal
export const PortfolioToolsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const tools = [
    {
      name: "Portfolio Tracker",
      description: "Track all your investments in one place",
      features: ["Real-time valuations", "Performance analytics", "ROI calculations"],
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Due Diligence Manager",
      description: "Organize and manage your due diligence process",
      features: ["Document management", "Checklist tracking", "Team collaboration"],
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      color: "from-green-500 to-teal-600"
    },
    {
      name: "Deal Flow Tracker",
      description: "Manage your investment pipeline",
      features: ["Opportunity tracking", "Stage management", "Decision logging"],
      icon: <Target className="h-6 w-6 text-white" />,
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Communication Hub",
      description: "Stay connected with your portfolio companies",
      features: ["Founder updates", "Board meeting notes", "Milestone tracking"],
      icon: <Users className="h-6 w-6 text-white" />,
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Portfolio Management Tools" 
      icon={<Briefcase className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Comprehensive tools to manage and track your investment portfolio effectively.
        </p>
        
        <div className="grid gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color}`}>
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Key Features:</h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button>
                    <Zap className="h-4 w-4 mr-2" />
                    Launch Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🚀 Pro Tip</h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Start with the Portfolio Tracker to get a comprehensive view of your investments, then use specialized tools as needed.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

// Global Opportunities Modal
export const GlobalOpportunitiesModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const regions = [
    {
      name: "North America",
      opportunities: 1247,
      avgDealSize: "$2.5M",
      topSectors: ["SaaS", "FinTech", "HealthTech"],
      growth: "+15%"
    },
    {
      name: "Europe",
      opportunities: 892,
      avgDealSize: "$1.8M", 
      topSectors: ["CleanTech", "AI/ML", "Enterprise"],
      growth: "+22%"
    },
    {
      name: "Asia Pacific",
      opportunities: 634,
      avgDealSize: "$3.2M",
      topSectors: ["E-commerce", "Gaming", "EdTech"],
      growth: "+35%"
    },
    {
      name: "Latin America",
      opportunities: 445,
      avgDealSize: "$1.2M",
      topSectors: ["FinTech", "AgTech", "Logistics"],
      growth: "+28%"
    }
  ];

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Global Investment Opportunities" 
      icon={<Globe className="h-5 w-5 text-white" />}
    >
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover investment opportunities across global markets and emerging ecosystems.
        </p>
        
        <div className="grid gap-4">
          {regions.map((region, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{region.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Opportunities</p>
                        <p className="font-medium">{region.opportunities}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg Deal Size</p>
                        <p className="font-medium">{region.avgDealSize}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      {region.topSectors.map((sector, sectorIndex) => (
                        <Badge key={sectorIndex} variant="secondary" className="text-xs">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">Growth</span>
                      <p className="text-lg font-bold text-green-600">{region.growth}</p>
                    </div>
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">🌍 Global Insights</h3>
          <p className="text-teal-800 dark:text-teal-200 text-sm">
            Asia Pacific shows the highest growth rate, while North America maintains the largest deal volume. Consider diversifying across regions for optimal portfolio balance.
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

// Export all modals
export {
  BaseModal
}; 