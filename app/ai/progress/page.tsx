"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  CheckCircle, 
  Clock, 
  Flag, 
  ListChecks, 
  Target, 
  TrendingUp, 
  Calendar, 
  Circle, 
  Plus,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Download,
  ArrowRight,
  Trash2,
  Edit3
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Define types for our data
interface Milestone {
  id: number;
  title: string;
  description: string;
  completedTasks: number;
  totalTasks: number;
  status: "completed" | "in-progress" | "not-started";
  completedDate: string | null;
  targetDate: string;
}

interface KPI {
  id: number;
  name: string;
  current: number;
  target: number;
  progress: number;
  trend: string;
  timeframe: string;
  status: string;
  description: string;
}

interface Task {
  id: number;
  title: string;
  milestone: string;
  status: string;
  priority: string;
  dueDate: string;
  assignee: string;
  completedDate: string | null;
}

// Mock data for milestones
const milestones: Milestone[] = [
  {
    id: 1,
    title: "Problem Validation",
    description: "Validate the problem your startup is solving through customer interviews",
    completedTasks: 5,
    totalTasks: 5,
    status: "completed",
    completedDate: "2024-03-15",
    targetDate: "2024-03-15",
  },
  {
    id: 2,
    title: "MVP Development",
    description: "Build the minimum viable product to test with early adopters",
    completedTasks: 8,
    totalTasks: 12,
    status: "in-progress",
    completedDate: null,
    targetDate: "2024-05-30",
  },
  {
    id: 3,
    title: "First Paying Customer",
    description: "Acquire your first paying customer and implement feedback",
    completedTasks: 2,
    totalTasks: 8,
    status: "in-progress",
    completedDate: null,
    targetDate: "2024-07-15",
  },
  {
    id: 4,
    title: "Seed Funding",
    description: "Secure seed funding to accelerate growth and expand team",
    completedTasks: 0,
    totalTasks: 10,
    status: "not-started",
    completedDate: null,
    targetDate: "2024-09-30",
  },
  {
    id: 5,
    title: "Product Market Fit",
    description: "Achieve measurable product-market fit with sustainable growth",
    completedTasks: 0,
    totalTasks: 6,
    status: "not-started",
    completedDate: null,
    targetDate: "2024-12-15",
  },
];

// Mock data for KPIs
const kpis: KPI[] = [
  {
    id: 1,
    name: "Active Users",
    current: 1250,
    target: 5000,
    progress: 25,
    trend: "+18%",
    timeframe: "month",
    status: "on-track",
    description: "Monthly active users engaging with your product",
  },
  {
    id: 2,
    name: "Conversion Rate",
    current: 2.8,
    target: 5.0,
    progress: 56,
    trend: "+0.5%",
    timeframe: "month",
    status: "on-track",
    description: "Percentage of visitors that convert to customers",
  },
  {
    id: 3,
    name: "Customer Acquisition Cost",
    current: 120,
    target: 80,
    progress: 40,
    trend: "-10%",
    timeframe: "quarter",
    status: "needs-improvement",
    description: "Average cost to acquire a new customer",
  },
  {
    id: 4,
    name: "Revenue",
    current: 32500,
    target: 100000,
    progress: 32.5,
    trend: "+28%",
    timeframe: "quarter",
    status: "on-track",
    description: "Total revenue generated from your product",
  },
  {
    id: 5,
    name: "Churn Rate",
    current: 6.2,
    target: 4.0,
    progress: 30,
    trend: "-0.8%",
    timeframe: "month",
    status: "needs-improvement",
    description: "Percentage of customers that cancel subscription",
  },
];

// Mock data for tasks
const tasks: Task[] = [
  {
    id: 1,
    title: "Conduct 10 customer interviews",
    milestone: "Problem Validation",
    status: "completed",
    priority: "high",
    dueDate: "2024-03-10",
    assignee: "You",
    completedDate: "2024-03-08",
  },
  {
    id: 2,
    title: "Create landing page with value proposition",
    milestone: "MVP Development",
    status: "completed",
    priority: "high",
    dueDate: "2024-04-05",
    assignee: "You",
    completedDate: "2024-04-03",
  },
  {
    id: 3,
    title: "Implement user authentication system",
    milestone: "MVP Development",
    status: "completed",
    priority: "medium",
    dueDate: "2024-04-15",
    assignee: "You",
    completedDate: "2024-04-12",
  },
  {
    id: 4,
    title: "Design core user interface components",
    milestone: "MVP Development",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-04-20",
    assignee: "You",
    completedDate: null,
  },
  {
    id: 5,
    title: "Set up analytics tracking",
    milestone: "MVP Development",
    status: "not-started",
    priority: "medium",
    dueDate: "2024-05-01",
    assignee: "You",
    completedDate: null,
  },
  {
    id: 6,
    title: "Create outreach email template for beta users",
    milestone: "First Paying Customer",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-05-10",
    assignee: "You",
    completedDate: null,
  },
  {
    id: 7,
    title: "Implement payment processing system",
    milestone: "First Paying Customer",
    status: "not-started",
    priority: "high",
    dueDate: "2024-05-25",
    assignee: "You",
    completedDate: null,
  },
];

// Add milestone images
const milestoneImages = {
  "Problem Validation": "/images/milestones/problem-validation.jpg",
  "MVP Development": "/images/milestones/mvp-development.jpg",
  "First Paying Customer": "/images/milestones/first-customer.jpg",
  "Seed Funding": "/images/milestones/seed-funding.jpg",
  "Product Market Fit": "/images/milestones/product-market-fit.jpg"
};

// Add KPI icons
const kpiIcons = {
  "Active Users": "/images/icons/active-users.png",
  "Conversion Rate": "/images/icons/conversion-rate.png",
  "Customer Acquisition Cost": "/images/icons/cac.png",
  "Revenue": "/images/icons/revenue.png",
  "Churn Rate": "/images/icons/churn.png"
};

export default function ProgressTrackingPage() {
  const [activeTab, setActiveTab] = useState("milestones");
  const [activeMilestone, setActiveMilestone] = useState<number>(2);
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Filter tasks based on selected status
  const filteredTasks = tasks.filter(task => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });
  
  // Calculate overall progress percentage
  const totalMilestoneProgress = milestones.reduce((acc, milestone) => {
    const milestonePercentage = milestone.status === "completed" 
      ? 100 
      : (milestone.completedTasks / milestone.totalTasks) * 100;
    return acc + milestonePercentage;
  }, 0) / milestones.length;
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <BarChart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Progress Tracking</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your startup's milestones, KPIs, and tasks</p>
        </div>
      </div>
      
      {/* Overview Section */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{Math.round(totalMilestoneProgress)}%</div>
              <div className="w-16 h-16 rounded-full border-4 border-emerald-100 dark:border-emerald-900/30 relative">
                <div 
                  className="absolute inset-0.5 rounded-full border-4 border-emerald-500"
                  style={{ 
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                    opacity: totalMilestoneProgress / 100 
                  }}
                ></div>
              </div>
            </div>
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Based on {milestones.length} milestones
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-medium">MVP Development</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-3.5 w-3.5 inline-block mr-1" />
                  Due in 12 days
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-medium">
                <span>67%</span>
                <span>complete</span>
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full" 
                style={{ width: "67%" }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Tasks Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">3</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Completed</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">2</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">In Progress</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">2</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Not Started</div>
              </div>
            </div>
            <div className="mt-4 flex">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Plus className="mr-1 h-3 w-3" />
                Add New Task
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="milestones" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="milestones" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="kpis" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Key Performance Indicators
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            Task Management
          </TabsTrigger>
        </TabsList>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Milestones</CardTitle>
                  <CardDescription>Track your key business milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {milestones.map((milestone) => (
                    <Button
                      key={milestone.id}
                      variant={activeMilestone === milestone.id ? "default" : "outline"}
                      className={`w-full justify-between text-left font-normal ${
                        activeMilestone === milestone.id ? "bg-gradient-primary" : ""
                      }`}
                      onClick={() => setActiveMilestone(milestone.id)}
                    >
                      <div className="flex items-center">
                        {milestone.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                        ) : milestone.status === "in-progress" ? (
                          <Circle className="h-4 w-4 mr-2 text-amber-500" />
                        ) : (
                          <Circle className="h-4 w-4 mr-2 text-slate-300" />
                        )}
                        <span>{milestone.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Milestone
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card className="h-full">
                <CardHeader className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative mr-2">
                          <Image
                            src={milestoneImages[milestones[activeMilestone - 1].title as keyof typeof milestoneImages] || "/images/milestones/default-milestone.jpg"}
                            alt={milestones[activeMilestone - 1].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardTitle className="text-2xl">{milestones[activeMilestone - 1].title}</CardTitle>
                        {milestones[activeMilestone - 1].status === "completed" ? (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                            Completed
                          </span>
                        ) : milestones[activeMilestone - 1].status === "in-progress" ? (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                            In Progress
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                            Not Started
                          </span>
                        )}
                      </div>
                      <CardDescription className="mt-1">{milestones[activeMilestone - 1].description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Completion</span>
                            <span className="text-sm font-medium">
                              {Math.round((milestones[activeMilestone - 1].completedTasks / milestones[activeMilestone - 1].totalTasks) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                milestones[activeMilestone - 1].status === "completed" 
                                  ? "bg-emerald-500" 
                                  : "bg-amber-500"
                              }`}
                              style={{ 
                                width: `${(milestones[activeMilestone - 1].completedTasks / milestones[activeMilestone - 1].totalTasks) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-sm">Tasks Completed:</div>
                            <div className="text-sm font-medium">
                              {milestones[activeMilestone - 1].completedTasks} / {milestones[activeMilestone - 1].totalTasks}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            View Tasks
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Timeline</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-sm">Target Date:</span>
                          </div>
                          <span className="text-sm font-medium">
                            {new Date(milestones[activeMilestone - 1].targetDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        {milestones[activeMilestone - 1].completedDate && (
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="text-sm">Completed:</span>
                            </div>
                            <span className="text-sm font-medium">
                              {new Date(milestones[activeMilestone - 1].completedDate as string).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        )}
                        
                        {!milestones[activeMilestone - 1].completedDate && (
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-amber-500" />
                              <span className="text-sm">Time Remaining:</span>
                            </div>
                            <span className="text-sm font-medium">
                              {Math.ceil((new Date(milestones[activeMilestone - 1].targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Related Tasks</h3>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add Task
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {tasks
                        .filter(task => task.milestone === milestones[activeMilestone - 1].title)
                        .map(task => (
                          <div 
                            key={task.id} 
                            className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center"
                          >
                            <div className="flex items-start gap-3">
                              {task.status === "completed" ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                              ) : task.status === "in-progress" ? (
                                <Circle className="h-5 w-5 text-amber-500 mt-0.5" />
                              ) : (
                                <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600 mt-0.5" />
                              )}
                              <div>
                                <div className="font-medium">{task.title}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                  Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`
                                px-2 py-0.5 text-xs rounded-full
                                ${task.priority === "high" 
                                  ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300" 
                                  : task.priority === "medium"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                    : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}
                              `}>
                                {task.priority}
                              </span>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* KPIs Tab */}
        <TabsContent value="kpis">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-medium">Key Performance Indicators</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Track the metrics that matter for your startup's success</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add KPI
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpis.map(kpi => (
              <Card key={kpi.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 p-1.5 flex-shrink-0">
                        <div className="relative w-full h-full">
                          <Image
                            src={kpiIcons[kpi.name as keyof typeof kpiIcons] || "/images/icons/default-kpi.png"}
                            alt={kpi.name}
                            width={40}
                            height={40}
                            className="h-10 w-10"
                          />
                        </div>
                      </div>
                      <CardTitle>{kpi.name}</CardTitle>
                    </div>
                    <span className={`
                      px-2 py-0.5 text-xs rounded-full font-medium flex items-center gap-1
                      ${kpi.status === "on-track" 
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" 
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"}
                    `}>
                      {kpi.trend.startsWith("+") ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingUp className="h-3 w-3 rotate-180" />
                      )}
                      {kpi.trend}
                    </span>
                  </div>
                  <CardDescription>{kpi.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Current: {kpi.current}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Target: {kpi.target}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          kpi.status === "on-track" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${kpi.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
                    <span>{kpi.progress}% of goal</span>
                    <span className="capitalize">Per {kpi.timeframe}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center p-8 h-[230px]">
              <div className="text-center">
                <Plus className="h-10 w-10 mx-auto mb-2 text-slate-400" />
                <h3 className="text-sm font-medium mb-1">Add New KPI</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">
                  Track additional metrics important for your startup's growth
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-medium">Task Management</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Organize and track tasks to hit your milestones</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center">
                <span className="text-sm mr-2">Filter:</span>
                <select 
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm px-3 py-1.5"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <div key={task.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        {task.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        ) : task.status === "in-progress" ? (
                          <Circle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <span className="flex items-center gap-1">
                              <Flag className="h-3 w-3" />
                              {task.milestone}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-8 md:ml-0">
                        <span className={`
                          px-2 py-0.5 text-xs rounded-full
                          ${task.priority === "high" 
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300" 
                            : task.priority === "medium"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}
                        `}>
                          {task.priority}
                        </span>
                        <span className={`
                          px-2 py-0.5 text-xs rounded-full
                          ${task.status === "completed" 
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" 
                            : task.status === "in-progress"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}
                        `}>
                          {task.status === "not-started" ? "Not Started" : task.status === "in-progress" ? "In Progress" : "Completed"}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-rose-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <ListChecks className="h-12 w-12 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
                    <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      {filterStatus === "all" 
                        ? "You don't have any tasks yet. Create a new task to get started."
                        : `You don't have any ${filterStatus.replace('-', ' ')} tasks.`}
                    </p>
                    <Button className="mt-4 bg-gradient-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Task
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 