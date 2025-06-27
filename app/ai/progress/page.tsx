"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  Edit3,
  Search,
  Activity,
  Award,
  Lightbulb
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
    title: "Build core product features",
    milestone: "MVP Development",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-05-15",
    assignee: "Development Team",
    completedDate: null,
  },
  {
    id: 4,
    title: "Set up analytics tracking",
    milestone: "MVP Development",
    status: "pending",
    priority: "medium",
    dueDate: "2024-05-20",
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "in-progress": return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
      case "not-started": return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
      case "on-track": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "needs-improvement": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
      case "low": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Progress Tracking</h1>
          <p className="text-slate-600 dark:text-slate-400">Monitor your startup's growth and milestones</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search milestones, KPIs, or tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Completion Rate</CardTitle>
                <CardDescription>Overall progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(totalMilestoneProgress)}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">+12% this month</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Milestones</CardTitle>
                <CardDescription>In progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">3 completed</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">KPIs On Track</CardTitle>
                <CardDescription>Meeting targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">60% success rate</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tasks Completed</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{filteredTasks.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">8 pending</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.filter(m => m.status === "completed").slice(0, 3).map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">{milestone.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Completed {milestone.completedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks and milestones due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.filter(t => t.status !== "completed").slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Due {task.dueDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-8">
          <div className="grid gap-6">
            {milestones.map((milestone) => (
              <Card key={milestone.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Flag className="h-5 w-5" />
                      {milestone.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status.replace("-", " ")}
                      </Badge>
                      <Badge variant="outline">
                        {milestone.completedTasks}/{milestone.totalTasks} tasks
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{milestone.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(milestone.completedTasks / milestone.totalTasks) * 100}%` }}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Progress</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round((milestone.completedTasks / milestone.totalTasks) * 100)}% complete
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Target Date</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.targetDate}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Status</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {milestone.status === "completed" ? `Completed ${milestone.completedDate}` : "In Progress"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kpis" className="space-y-8">
          <div className="grid gap-6">
            {kpis.map((kpi) => (
              <Card key={kpi.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <BarChart className="h-5 w-5" />
                      {kpi.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(kpi.status)}>
                        {kpi.status.replace("-", " ")}
                      </Badge>
                      <Badge variant="outline">{kpi.trend}</Badge>
                    </div>
                  </div>
                  <CardDescription>{kpi.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${kpi.progress}%` }}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Current</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {typeof kpi.current === 'number' && kpi.current > 1000 
                            ? `${(kpi.current / 1000).toFixed(1)}K` 
                            : kpi.current}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Target</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {typeof kpi.target === 'number' && kpi.target > 1000 
                            ? `${(kpi.target / 1000).toFixed(1)}K` 
                            : kpi.target}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Progress</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.progress}%</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Timeframe</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Per {kpi.timeframe}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-8">
          <div className="grid gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <ListChecks className="h-5 w-5" />
                      {task.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>Milestone: {task.milestone}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Assignee</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{task.assignee}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Due Date</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{task.dueDate}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Status</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.completedDate ? `Completed ${task.completedDate}` : task.status}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Actions</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        {task.status !== "completed" && (
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600">
                            <CheckCircle2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Progress Report
            </CardTitle>
            <CardDescription>Download detailed progress analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              AI Progress Insights
            </CardTitle>
            <CardDescription>Get personalized recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/ai">
              <Button variant="outline" className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Insights
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 