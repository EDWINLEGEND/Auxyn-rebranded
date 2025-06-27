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
  Download
} from "lucide-react";

export default function InvestorMarketResearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
          <BarChart2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Market Analysis</h1>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive market intelligence for informed investment decisions</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search markets, sectors, or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
            <Search className="h-4 w-4 mr-2" />
            Analyze
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
          <TabsTrigger value="trends">Investment Trends</TabsTrigger>
          <TabsTrigger value="reports">Research Reports</TabsTrigger>
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
                <CardTitle className="text-lg">Active Deals</CardTitle>
                <CardDescription>Q4 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +8% QoQ
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Avg. Valuation</CardTitle>
                <CardDescription>Series A rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42M</div>
                <div className="flex items-center text-red-600 text-sm">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  -5% YoY
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Success Rate</CardTitle>
                <CardDescription>Exit probability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18%</div>
                <div className="flex items-center text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +2% YoY
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hot Sectors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Investment Sectors</CardTitle>
              <CardDescription>Most active sectors by deal volume and funding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { sector: "AI/Machine Learning", deals: 342, funding: "$12.8B", growth: "+25%" },
                  { sector: "FinTech", deals: 298, funding: "$9.2B", growth: "+18%" },
                  { sector: "HealthTech", deals: 256, funding: "$8.1B", growth: "+22%" },
                  { sector: "CleanTech", deals: 189, funding: "$6.4B", growth: "+35%" },
                  { sector: "EdTech", deals: 167, funding: "$4.2B", growth: "+12%" }
                ].map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{sector.sector}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{sector.deals} deals</p>
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

        <TabsContent value="sectors" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Artificial Intelligence",
                marketSize: "$1.2T",
                growth: "+28%",
                avgValuation: "$45M",
                topCompanies: ["OpenAI", "Anthropic", "Stability AI"],
                riskLevel: "Medium-High"
              },
              {
                name: "Financial Technology",
                marketSize: "$800B",
                growth: "+15%",
                avgValuation: "$38M",
                topCompanies: ["Stripe", "Klarna", "Revolut"],
                riskLevel: "Medium"
              },
              {
                name: "Health Technology",
                marketSize: "$600B",
                growth: "+22%",
                avgValuation: "$42M",
                topCompanies: ["Teladoc", "Veracyte", "10x Genomics"],
                riskLevel: "Medium-Low"
              },
              {
                name: "Clean Technology",
                marketSize: "$400B",
                growth: "+35%",
                avgValuation: "$32M",
                topCompanies: ["Tesla", "Rivian", "QuantumScape"],
                riskLevel: "High"
              }
            ].map((sector, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {sector.name}
                    <Badge variant={sector.riskLevel === "High" ? "destructive" : sector.riskLevel === "Medium-High" ? "secondary" : "default"}>
                      {sector.riskLevel} Risk
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Market Size</p>
                      <p className="font-bold">{sector.marketSize}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
                      <p className="font-bold text-green-600">{sector.growth}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Avg. Valuation</p>
                    <p className="font-bold">{sector.avgValuation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Top Companies</p>
                    <div className="flex flex-wrap gap-1">
                      {sector.topCompanies.map((company) => (
                        <Badge key={company} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Trends</CardTitle>
                <CardDescription>Key trends shaping the investment landscape</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { trend: "AI Integration", impact: "High", adoption: "85%" },
                    { trend: "ESG Focus", impact: "Medium", adoption: "67%" },
                    { trend: "Remote-First", impact: "Medium", adoption: "72%" },
                    { trend: "Web3/Blockchain", impact: "High", adoption: "34%" },
                    { trend: "Sustainability", impact: "High", adoption: "78%" }
                  ].map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{trend.trend}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Impact: {trend.impact}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{trend.adoption}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Adoption</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Investment activity by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { region: "North America", percentage: "45%", funding: "$145B" },
                    { region: "Europe", percentage: "28%", funding: "$89B" },
                    { region: "Asia Pacific", percentage: "22%", funding: "$71B" },
                    { region: "Others", percentage: "5%", funding: "$16B" }
                  ].map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{region.region}</span>
                        <span className="text-sm">{region.funding}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2"
                          style={{ width: region.percentage }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Q4 2024 Venture Capital Report",
                description: "Comprehensive analysis of Q4 VC activity and trends",
                date: "Dec 2024",
                pages: "42 pages",
                type: "Quarterly Report"
              },
              {
                title: "AI Startup Ecosystem Analysis",
                description: "Deep dive into the AI startup landscape and opportunities",
                date: "Nov 2024",
                pages: "28 pages",
                type: "Sector Report"
              },
              {
                title: "European FinTech Investment Guide",
                description: "Regional analysis of FinTech investment opportunities",
                date: "Oct 2024",
                pages: "35 pages",
                type: "Regional Report"
              },
              {
                title: "Climate Tech Investment Outlook",
                description: "Analysis of climate technology investment trends and forecasts",
                date: "Sep 2024",
                pages: "31 pages",
                type: "Thematic Report"
              },
              {
                title: "Healthcare Innovation Report",
                description: "Comprehensive overview of healthcare technology investments",
                date: "Aug 2024",
                pages: "39 pages",
                type: "Sector Report"
              },
              {
                title: "Global Startup Valuation Trends",
                description: "Analysis of startup valuation patterns across markets",
                date: "Jul 2024",
                pages: "26 pages",
                type: "Market Report"
              }
            ].map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {report.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{report.date}</span>
                    <span>{report.pages}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 