"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Rocket, Star, Trash2, Edit, Plus, BarChart2, FileText, Users } from "lucide-react";
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
    createdAt: "2023-10-15",
  },
  {
    id: 2,
    title: "Local Food Marketplace",
    description: "A platform connecting consumers directly with local farmers and food producers.",
    category: "Marketplace",
    industry: "Food",
    stage: "MVP",
    progress: 68,
    createdAt: "2023-08-03",
  },
  {
    id: 3,
    title: "Remote Team Collaboration App",
    description: "An all-in-one tool for remote teams to collaborate more effectively.",
    category: "SaaS",
    industry: "Productivity",
    stage: "Idea",
    progress: 12,
    createdAt: "2024-01-20",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">My Startup Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and track your startup ideas and projects</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">My Ideas</CardTitle>
            <CardDescription>Track all your startup ideas</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{mockIdeas.length}</CardContent>
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
            <CardDescription>Ideas in active development</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">2</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Readiness Score</CardTitle>
            <CardDescription>Average investor readiness</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold">54%</CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">Improve Score</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-clash font-semibold">My Startup Ideas</h2>
          <Button className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add New Idea
          </Button>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Ideas</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="mvp">Building MVP</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                            {idea.stage}
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
                          className="bg-gradient-primary rounded-full h-2"
                          style={{ width: `${idea.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Link href="/ai/progress">
                      <Button variant="ghost" size="sm" className="ml-4">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="validation">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Rocket className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Ideas in Validation</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
                Ideas in the validation stage are being tested for market fit and feasibility. Add a new idea to get started.
              </p>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add New Idea
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="mvp">
            <Card key={mockIdeas[1].id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{mockIdeas[1].title}</h3>
                      <div className="flex gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                          {mockIdeas[1].category}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                          {mockIdeas[1].industry}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                          {mockIdeas[1].stage}
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
                    {mockIdeas[1].description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Created: {mockIdeas[1].createdAt}
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
                      <span>{mockIdeas[1].progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-primary rounded-full h-2"
                        style={{ width: `${mockIdeas[1].progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Link href="/ai/progress">
                    <Button variant="ghost" size="sm" className="ml-4">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="growth">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Rocket className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Ideas in Growth Stage</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
                Ideas in growth stage are scaling operations and focusing on customer acquisition. Move ideas to this stage when ready.
              </p>
              <Button className="bg-gradient-primary">
                View All Ideas
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your next steps to move forward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/20 flex-shrink-0 mt-0.5"></div>
                <div>
                  <h4 className="font-medium">Complete Market Research</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">For Local Food Marketplace</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/20 flex-shrink-0 mt-0.5"></div>
                <div>
                  <h4 className="font-medium">Create Pitch Deck</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">For AI-powered Resume Analyzer</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-100 dark:bg-emerald-900/20 flex-shrink-0 mt-0.5"></div>
                <div>
                  <h4 className="font-medium">Define MVP Features</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">For Remote Team Collaboration App</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Tasks</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
            <CardDescription>Helpful resources for your startups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2 flex-shrink-0">
                  <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h4 className="font-medium">Food Industry Market Report</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Relevant for Local Food Marketplace</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2 flex-shrink-0">
                  <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h4 className="font-medium">AI Startup Funding Guide</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Relevant for AI-powered Resume Analyzer</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-slate-100 dark:bg-slate-800 p-2 flex-shrink-0">
                  <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <h4 className="font-medium">Remote Work Tools Analysis</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Relevant for Remote Team Collaboration App</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Resources</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 