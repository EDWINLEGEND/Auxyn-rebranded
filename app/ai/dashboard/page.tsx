"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Rocket, Star, Trash2, Edit, Plus, BarChart2, FileText, Users, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

// Mock data for user's startup ideas
const mockIdeas = [
  {
    id: 1,
    title: "AI-powered Resume Analyzer",
    description: "An AI tool that analyzes resumes and provides personalized feedback to job seekers.",
    category: "SaaS",
    industry: "HR Tech",
    stage: "Validation",
    progress: 35,
    fundingGoal: "$500K",
    currentRaise: "$125K",
    teamSize: 3,
    createdAt: "2023-10-15",
    status: "Active",
  },
  {
    id: 2,
    title: "Local Food Marketplace",
    description: "A platform connecting consumers directly with local farmers and food producers.",
    category: "Marketplace",
    industry: "Food",
    stage: "MVP",
    progress: 68,
    fundingGoal: "$2M",
    currentRaise: "$800K",
    teamSize: 5,
    createdAt: "2023-08-03",
    status: "Active",
  },
  {
    id: 3,
    title: "Remote Team Collaboration App",
    description: "An all-in-one tool for remote teams to collaborate more effectively.",
    category: "SaaS",
    industry: "Productivity",
    stage: "Idea",
    progress: 12,
    fundingGoal: "$1M",
    currentRaise: "$50K",
    teamSize: 2,
    createdAt: "2024-01-20",
    status: "Planning",
  },
];

const mockMilestones = [
  {
    id: 1,
    title: "MVP Launch",
    description: "Launch minimum viable product",
    dueDate: "2024-03-15",
    status: "In Progress",
  },
  {
    id: 2,
    title: "First 100 Users",
    description: "Acquire first 100 active users",
    dueDate: "2024-04-30",
    status: "Pending",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("ideas");
  
  const totalIdeas = mockIdeas.length;
  const activeIdeas = mockIdeas.filter(idea => idea.status === "Active").length;
  const averageProgress = mockIdeas.reduce((sum, idea) => sum + idea.progress, 0) / mockIdeas.length;
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Startup Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and track your startup ideas and projects</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Ideas</CardTitle>
            <CardDescription>Active startup projects</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{totalIdeas}</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Idea
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Progress</CardTitle>
            <CardDescription>Ideas in development</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{activeIdeas}</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg Progress</CardTitle>
            <CardDescription>Overall development</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-600">{averageProgress.toFixed(0)}%</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">Analytics</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Milestones</CardTitle>
            <CardDescription>Upcoming targets</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{mockMilestones.length}</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">Track Progress</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-clash font-semibold">Startup Overview</h2>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Plus className="mr-2 h-4 w-4" />
            Generate New Ideas
          </Button>
        </div>
        
        <Tabs defaultValue="ideas" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="ideas">My Ideas</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="mvp">Building MVP</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ideas" className="space-y-6">
            {mockIdeas.map((idea) => (
              <Card key={idea.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
                        <div className="flex gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                            {idea.category}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                            {idea.industry}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                            {idea.stage}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {idea.progress}%
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
                      {idea.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Funding Goal</div>
                        <div className="font-semibold">{idea.fundingGoal}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Raised</div>
                        <div className="font-semibold text-green-600">{idea.currentRaise}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Team Size</div>
                        <div className="font-semibold">{idea.teamSize}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Status</div>
                        <div className="font-semibold text-blue-600">{idea.status}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Created: {idea.createdAt}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <Star className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 divide-x md:divide-x-0 md:divide-y divide-slate-200 dark:divide-slate-700">
                    <Link href="/ai/market-research" className="flex-1 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center text-center">
                      <div>
                        <BarChart2 className="h-5 w-5 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">Market Research</span>
                      </div>
                    </Link>
                    
                    <Link href="/ai/pitch-deck" className="flex-1 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center text-center">
                      <div>
                        <FileText className="h-5 w-5 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">Pitch Deck</span>
                      </div>
                    </Link>
                    
                    <Link href="/ai/development" className="flex-1 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-center text-center">
                      <div>
                        <Users className="h-5 w-5 mx-auto mb-2 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">Team</span>
                      </div>
                    </Link>
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center">
                    <div className="w-full flex-1">
                      <div className="flex justify-between mb-1 text-xs">
                        <span>Progress</span>
                        <span>{idea.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-2"
                          style={{ width: `${idea.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Link href="/ai/progress">
                      <Button variant="ghost" size="sm" className="ml-4">
                        <Target className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="validation" className="space-y-6">
            <div className="text-center py-12">
              <Rocket className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-semibold mb-2">Validation Phase</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Ideas currently in validation phase will appear here
              </p>
              <Button>
                Start Validating Ideas
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="mvp" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-semibold mb-2">MVP Development</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Ideas in MVP development phase will appear here
              </p>
              <Button>
                Start Building MVP
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="milestones" className="space-y-6">
            {mockMilestones.map((milestone) => (
              <Card key={milestone.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      <CardDescription>{milestone.description}</CardDescription>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      milestone.status === 'In Progress' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Due: {milestone.dueDate}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Update Progress
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/ai">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Generate New Ideas
              </Button>
            </Link>
            <Link href="/ai/market-research">
              <Button variant="outline" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                Market Research
              </Button>
            </Link>
            <Link href="/ai/pitch-deck">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create Pitch Deck
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/ai/resources">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Learning Resources
              </Button>
            </Link>
            <Link href="/ai/development">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Team Building
              </Button>
            </Link>
            <Link href="/ai/progress">
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-4 w-4" />
                Track Progress
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 