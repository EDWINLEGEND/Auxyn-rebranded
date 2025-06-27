"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, TrendingUp, Star, Trash2, Edit, Plus, BarChart2, FileText, Users, DollarSign, Target } from "lucide-react";
import Link from "next/link";

// Mock data for investor's portfolio and watchlist
const mockInvestments = [
  {
    id: 1,
    title: "TechFlow Solutions",
    description: "AI-powered workflow automation platform for enterprise clients.",
    category: "SaaS",
    industry: "Enterprise Tech",
    stage: "Series A",
    investmentAmount: "$250K",
    currentValuation: "$15M",
    ownership: "2.5%",
    roi: "+35%",
    createdAt: "2023-08-15",
    status: "Active",
  },
  {
    id: 2,
    title: "GreenEnergy Innovations",
    description: "Solar panel technology startup with breakthrough efficiency improvements.",
    category: "Hardware",
    industry: "Clean Energy",
    stage: "Seed",
    investmentAmount: "$100K",
    currentValuation: "$8M",
    ownership: "1.8%",
    roi: "+120%",
    createdAt: "2023-06-03",
    status: "Active",
  },
  {
    id: 3,
    title: "HealthTech Analytics",
    description: "AI-driven healthcare data analytics platform for hospitals.",
    category: "SaaS",
    industry: "HealthTech",
    stage: "Series B",
    investmentAmount: "$500K",
    currentValuation: "$45M",
    ownership: "1.2%",
    roi: "+85%",
    createdAt: "2023-03-20",
    status: "Active",
  },
];

const mockWatchlist = [
  {
    id: 4,
    title: "EduTech Platform",
    description: "Online learning platform with personalized AI tutoring.",
    category: "EdTech",
    industry: "Education",
    stage: "Seed",
    fundingGoal: "$2M",
    currentRaise: "$1.2M",
    interest: "High",
  },
  {
    id: 5,
    title: "Logistics Optimizer",
    description: "Supply chain optimization software for e-commerce.",
    category: "SaaS",
    industry: "Logistics",
    stage: "Series A",
    fundingGoal: "$8M",
    currentRaise: "$5.5M",
    interest: "Medium",
  },
];

export default function InvestorDashboardPage() {
  const [activeTab, setActiveTab] = useState("portfolio");
  
  const totalInvestment = mockInvestments.reduce((sum, inv) => sum + parseFloat(inv.investmentAmount.replace('$', '').replace('K', '000')), 0);
  const averageROI = mockInvestments.reduce((sum, inv) => sum + parseFloat(inv.roi.replace('%', '').replace('+', '')), 0) / mockInvestments.length;
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Investment Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your portfolio and discover new opportunities</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Portfolio Size</CardTitle>
            <CardDescription>Total active investments</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{mockInvestments.length}</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Investment
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Invested</CardTitle>
            <CardDescription>Capital deployed</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">${(totalInvestment / 1000).toFixed(0)}K</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average ROI</CardTitle>
            <CardDescription>Portfolio performance</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">+{averageROI.toFixed(0)}%</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">Analytics</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Watchlist</CardTitle>
            <CardDescription>Opportunities tracking</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{mockWatchlist.length}</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">Browse More</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-clash font-semibold">Investment Overview</h2>
          <Button className="bg-gradient-to-r from-green-500 to-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            Discover Opportunities
          </Button>
        </div>
        
        <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="portfolio">Active Portfolio</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="completed">Exited</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-6">
            {mockInvestments.map((investment) => (
              <Card key={investment.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{investment.title}</h3>
                        <div className="flex gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                            {investment.category}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                            {investment.industry}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {investment.stage}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {investment.roi}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {investment.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Investment</p>
                        <p className="font-semibold">{investment.investmentAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Valuation</p>
                        <p className="font-semibold">{investment.currentValuation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Ownership</p>
                        <p className="font-semibold">{investment.ownership}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Invested</p>
                        <p className="font-semibold text-sm">{investment.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        investment.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {investment.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 divide-x md:divide-x-0 md:divide-y divide-slate-200 dark:divide-slate-700">
                    <Link href="/investor/market-research" className="flex-1 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center text-center">
                      <div>
                        <BarChart2 className="h-5 w-5 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">Market Analysis</span>
                      </div>
                    </Link>
                    
                    <Link href="/investor/pitch-deck" className="flex-1 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center text-center">
                      <div>
                        <FileText className="h-5 w-5 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">Due Diligence</span>
                      </div>
                    </Link>
                    
                    <Link href="/investor/progress" className="flex-1 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center text-center">
                      <div>
                        <TrendingUp className="h-5 w-5 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">Performance</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="watchlist" className="space-y-6">
            {mockWatchlist.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{opportunity.title}</h3>
                        <div className="flex gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                            {opportunity.category}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                            {opportunity.industry}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                            {opportunity.stage}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            opportunity.interest === 'High' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {opportunity.interest} Interest
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Target className="h-4 w-4 mr-2" />
                          Invest
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {opportunity.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Funding Goal</p>
                        <p className="font-semibold">{opportunity.fundingGoal}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Current Raise</p>
                        <p className="font-semibold">{opportunity.currentRaise}</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-green-500 to-teal-600 rounded-full h-2"
                        style={{ 
                          width: `${(parseFloat(opportunity.currentRaise.replace('$', '').replace('M', '')) / 
                                   parseFloat(opportunity.fundingGoal.replace('$', '').replace('M', ''))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Exited Investments
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your completed investments and exits will appear here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Overall investment returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">+{averageROI.toFixed(1)}%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average ROI across all investments</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sector Allocation</CardTitle>
                  <CardDescription>Investment distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">SaaS</span>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Clean Energy</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">HealthTech</span>
                      <span className="text-sm font-medium">11%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 