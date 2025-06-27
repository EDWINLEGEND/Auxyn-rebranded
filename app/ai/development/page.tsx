"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plus, 
  X, 
  Edit, 
  Trash2, 
  Download, 
  FileText, 
  User, 
  ChevronsUpDown, 
  Clock, 
  DollarSign, 
  Award,
  PieChart,
  CheckCircle2,
  Briefcase,
  UserPlus,
  Search,
  Target,
  TrendingUp,
  Building,
  Lightbulb
} from "lucide-react";
import Link from "next/link";

// Mock data for team roles
const mockRoles = [
  {
    id: 1,
    title: "Chief Technology Officer (CTO)",
    type: "Technical",
    priority: "High",
    status: "To be filled",
    skills: ["Engineering Leadership", "System Architecture", "Technology Strategy", "Team Management"],
    responsibilities: [
      "Define the overall technology vision and strategy for the company",
      "Lead the engineering team and manage technical resources",
      "Make high-level technical decisions and oversee implementation",
      "Ensure technology stack is scalable, secure, and aligned with business goals"
    ],
    timeline: "Immediate",
    compensation: {
      type: "Equity + Salary",
      equity: "2-5%",
      salary: "$0-$120,000 (depending on funding)"
    },
    equityRationale: "High equity reflects foundational role in building the technical infrastructure and leading the engineering team",
    notes: "Consider fractional CTO initially if funding is limited",
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    type: "Technical",
    priority: "High",
    status: "To be filled",
    skills: ["JavaScript", "React", "Node.js", "Database Management", "API Development"],
    responsibilities: [
      "Build and maintain the core product features on both front-end and back-end",
      "Implement responsive UI designs and ensure cross-browser compatibility",
      "Optimize applications for maximum speed and scalability", 
      "Collaborate with designers and product team on feature implementation"
    ],
    timeline: "Immediate",
    compensation: {
      type: "Salary + Options",
      equity: "0.5-1%",
      salary: "$80,000-$110,000"
    },
    equityRationale: "Equity options align developer interests with company growth and product success",
    notes: "Consider part-time or contract initially until more funding is secured",
  },
  {
    id: 3,
    title: "Product Manager",
    type: "Product",
    priority: "Medium",
    status: "To be filled",
    skills: ["Product Strategy", "User Research", "Roadmap Planning", "Agile Methodologies"],
    responsibilities: [
      "Define product vision, strategy, and roadmap based on market research and user feedback",
      "Prioritize features and manage product backlog",
      "Work closely with engineering and design to deliver high-quality products",
      "Analyze product metrics and make data-driven decisions"
    ],
    timeline: "3-6 months",
    compensation: {
      type: "Salary + Options",
      equity: "0.5-1.5%",
      salary: "$70,000-$100,000"
    },
    equityRationale: "Equity reflects importance of product leadership in shaping the core offering",
    notes: "Could be founder responsibility initially; hire when product complexity increases",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    type: "Design",
    priority: "Medium",
    status: "To be filled",
    skills: ["User Interface Design", "User Experience", "Wireframing", "Prototyping", "Design Systems"],
    responsibilities: [
      "Create intuitive, engaging user interfaces and experiences",
      "Develop wireframes, prototypes, and mockups for new features",
      "Establish and maintain design system and guidelines",
      "Conduct user research and usability testing"
    ],
    timeline: "3-6 months",
    compensation: {
      type: "Salary + Options",
      equity: "0.25-0.75%",
      salary: "$60,000-$90,000"
    },
    equityRationale: "Equity options incentivize creating exceptional user experiences that drive user adoption",
    notes: "Consider freelancers for initial design work before full-time hire",
  },
  {
    id: 5,
    title: "Marketing Lead",
    type: "Marketing",
    priority: "Low",
    status: "Future hire",
    skills: ["Digital Marketing", "Content Strategy", "Growth Marketing", "Analytics", "SEO/SEM"],
    responsibilities: [
      "Develop and execute marketing strategy to drive user acquisition and growth",
      "Manage content creation, social media presence, and email campaigns",
      "Analyze marketing metrics and optimize campaigns for ROI",
      "Build brand identity and messaging"
    ],
    timeline: "6-12 months",
    compensation: {
      type: "Salary + Options",
      equity: "0.25-1%",
      salary: "$65,000-$90,000"
    },
    equityRationale: "Equity aligns with driving growth milestones that increase company valuation",
    notes: "Initially outsource to agencies or consultants until consistent growth needs justify full-time hire",
  },
];

// Job description template
const jobDescriptionTemplate = `
# [JOB_TITLE] at [COMPANY_NAME]

## About Us
[COMPANY_NAME] is [COMPANY_DESCRIPTION].

## The Role
We're looking for a talented [JOB_TITLE] to join our team and help us [MAIN_RESPONSIBILITY].

## Responsibilities
[RESPONSIBILITIES]

## Requirements
[SKILLS]

## Preferred Qualifications
- Experience in a startup environment
- Passion for [COMPANY_INDUSTRY]
- Strong problem-solving abilities
- Excellent communication skills

## Compensation
- [COMPENSATION_DETAILS]
- Flexible work arrangements
- Opportunity to shape a product from the ground up
- Work with a talented, motivated team

## How to Apply
Please send your resume and a brief introduction to [EMAIL]. Include "[JOB_TITLE]" in the subject line.

[COMPANY_NAME] is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
`;

// Team structure templates
const teamTemplates = [
  {
    id: 1,
    name: "Lean Startup Team",
    description: "Minimal core team focused on MVP development and validation",
    roles: [
      "Technical Co-founder/CTO",
      "Product-focused CEO",
      "Full-Stack Developer",
    ],
    timeline: "Pre-seed to Seed",
    fundingStage: "$0 - $500K",
    pros: ["Low burn rate", "Fast decision making", "Clear ownership"],
    cons: ["Limited bandwidth", "Potential skill gaps", "Risk of burnout"]
  },
  {
    id: 2,
    name: "Balanced Early-Stage Team",
    description: "Well-rounded team with technical, product, and business expertise",
    roles: [
      "CTO",
      "CEO/Business Lead",
      "Product Manager",
      "Senior Developer",
      "UI/UX Designer",
    ],
    timeline: "Seed to Series A",
    fundingStage: "$500K - $2M",
    pros: ["Diverse expertise", "Scalable structure", "Reduced founder dependency"],
    cons: ["Higher burn rate", "More complex coordination", "Equity dilution"]
  },
  {
    id: 3,
    name: "Growth-Focused Team",
    description: "Expanded team structure optimized for scaling and growth",
    roles: [
      "CTO",
      "CEO",
      "VP of Product",
      "Engineering Team Lead",
      "Multiple Developers",
      "Design Lead",
      "Marketing Director",
      "Customer Success Manager",
      "Operations Manager"
    ],
    timeline: "Series A and beyond",
    fundingStage: "$2M+",
    pros: ["Specialized roles", "Scalable structure", "Comprehensive expertise"],
    cons: ["High burn rate", "Management overhead", "Potential agility loss"]
  },
];

// Define interfaces for role typing
interface Compensation {
  type: string;
  equity: string;
  salary: string;
}

interface Role {
  id: number;
  title: string;
  type: string;
  priority: string;
  status: string;
  responsibilities: string[];
  skills: string[];
  compensation: Compensation;
  timeline: string;
}

export default function DevelopmentPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter roles based on priority, type, and search term
  const filteredRoles = mockRoles.filter(role => {
    const matchesFilter = roleFilter === "all" || 
                         role.priority.toLowerCase() === roleFilter.toLowerCase() ||
                         role.type === roleFilter;
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const generateJobDescription = (role: Role) => {
    return jobDescriptionTemplate
      .replace(/\[JOB_TITLE\]/g, role.title)
      .replace(/\[COMPANY_NAME\]/g, "Your Startup")
      .replace(/\[COMPANY_DESCRIPTION\]/g, "an innovative startup focused on [your mission]")
      .replace(/\[MAIN_RESPONSIBILITY\]/g, role.responsibilities[0].toLowerCase())
      .replace(/\[RESPONSIBILITIES\]/g, role.responsibilities.map(r => `- ${r}`).join('\n'))
      .replace(/\[SKILLS\]/g, role.skills.map(s => `- ${s}`).join('\n'))
      .replace(/\[COMPENSATION_DETAILS\]/g, `${role.compensation.type}: ${role.compensation.salary}, Equity: ${role.compensation.equity}`)
      .replace(/\[EMAIL\]/g, "hiring@yourstartup.com")
      .replace(/\[COMPANY_INDUSTRY\]/g, "your industry");
  };

  const downloadJobDescription = (role: Role) => {
    const jobDescription = generateJobDescription(role);
    const blob = new Blob([jobDescription], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${role.title.replace(/\s+/g, '_')}_Job_Description.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const calculateTeamCosts = () => {
    const getAverageSalary = (salaryRange: string) => {
      const matches = salaryRange.match(/\$([0-9,]+)-?\$?([0-9,]*)/);
      if (!matches) return 0;
      const min = parseInt(matches[1].replace(/,/g, ''));
      const max = matches[2] ? parseInt(matches[2].replace(/,/g, '')) : min;
      return (min + max) / 2;
    };

    const totalAnnualCost = mockRoles.reduce((total, role) => {
      if (role.status !== "Future hire") {
        return total + getAverageSalary(role.compensation.salary);
      }
      return total;
    }, 0);

    const monthlyCost = totalAnnualCost / 12;
    const annualCost = totalAnnualCost;

    return {
      monthly: monthlyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      annual: annualCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    };
  };

  const teamCosts = calculateTeamCosts();

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Team Development</h1>
          <p className="text-slate-600 dark:text-slate-400">Build and manage your startup team effectively</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search roles, skills, or team templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-teal-600">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Team Overview</TabsTrigger>
          <TabsTrigger value="roles">Open Roles</TabsTrigger>
          <TabsTrigger value="templates">Team Templates</TabsTrigger>
          <TabsTrigger value="planning">Hiring Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Team Size</CardTitle>
                <CardDescription>Current members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">2</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Founders</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Open Positions</CardTitle>
                <CardDescription>Roles to fill</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">5</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Key hires needed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Monthly Cost</CardTitle>
                <CardDescription>Team expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{teamCosts.monthly}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Estimated burn</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Equity Pool</CardTitle>
                <CardDescription>Reserved for team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">15%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Employee options</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-green-600" />
                  Post New Role
                </CardTitle>
                <CardDescription>Create and publish job listings</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Team Templates
                </CardTitle>
                <CardDescription>Use proven team structures</CardDescription>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Hiring Plan
                </CardTitle>
                <CardDescription>Plan your hiring timeline</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          {/* Role Filters */}
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={roleFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("all")}
              >
                All Roles
              </Button>
              <Button 
                variant={roleFilter === "high" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("high")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                High Priority
              </Button>
              <Button 
                variant={roleFilter === "medium" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("medium")}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Medium Priority
              </Button>
              <Button 
                variant={roleFilter === "low" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("low")}
                className="bg-slate-500 hover:bg-slate-600 text-white"
              >
                Low Priority
              </Button>
              <Button 
                variant={roleFilter === "Technical" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("Technical")}
              >
                Technical
              </Button>
              <Button 
                variant={roleFilter === "Product" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("Product")}
              >
                Product
              </Button>
              <Button 
                variant={roleFilter === "Design" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("Design")}
              >
                Design
              </Button>
              <Button 
                variant={roleFilter === "Marketing" ? "default" : "outline"} 
                size="sm"
                onClick={() => setRoleFilter("Marketing")}
              >
                Marketing
              </Button>
            </div>
            
            <Button className="bg-gradient-to-r from-green-500 to-teal-600">
              <Plus className="mr-2 h-4 w-4" />
              Add New Role
            </Button>
          </div>
          
          {/* Roles List */}
          <div className="space-y-6">
            {filteredRoles.map((role) => (
              <Card 
                key={role.id} 
                className={`overflow-hidden ${selectedRole === role.id ? 'ring-2 ring-sky-500 dark:ring-sky-400' : ''}`}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 md:border-r border-slate-200 dark:border-slate-700 md:w-64 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{role.title}</h3>
                        <div className="flex gap-2">
                          <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 mt-1">
                        {role.type}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <ChevronsUpDown className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Priority</div>
                          <span className={`
                            inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                            ${role.priority === "High" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" : 
                              role.priority === "Medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" :
                              "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"}
                          `}>
                            {role.priority} Priority
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Status</div>
                          <span className="text-sm">{role.status}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Timeline</div>
                          <span className="text-sm">{role.timeline}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Compensation</div>
                          <span className="text-sm">{role.compensation.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                      >
                        {selectedRole === role.id ? "Hide Details" : "View Details"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => downloadJobDescription(role)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Job Description
                      </Button>
                    </div>
                  </div>
                  
                  {selectedRole === role.id && (
                    <div className="flex-1 p-6">
                      <div className="mb-6">
                        <h4 className="text-lg font-medium mb-3">Key Responsibilities</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {role.responsibilities.map((resp, i) => (
                            <li key={i} className="text-slate-600 dark:text-slate-400">{resp}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-medium mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-medium mb-3">Compensation Details</h4>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">Type</div>
                              <div className="font-medium">{role.compensation.type}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">Salary Range</div>
                              <div className="font-medium">{role.compensation.salary}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">Equity Range</div>
                              <div className="font-medium">{role.compensation.equity}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="bg-gradient-to-r from-green-500 to-teal-600">
                          <FileText className="h-4 w-4 mr-2" />
                          Post Job
                        </Button>
                        <Button variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Role
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Roles</h4>
                    <div className="space-y-1">
                      {template.roles.map((role, i) => (
                        <div key={i} className="text-sm text-slate-600 dark:text-slate-400">• {role}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500 dark:text-slate-400">Timeline</div>
                      <div className="font-medium">{template.timeline}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400">Funding Stage</div>
                      <div className="font-medium">{template.fundingStage}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium text-green-600">Pros</div>
                      {template.pros.map((pro, i) => (
                        <div key={i} className="text-xs text-slate-600 dark:text-slate-400">• {pro}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-600">Cons</div>
                      {template.cons.map((con, i) => (
                        <div key={i} className="text-xs text-slate-600 dark:text-slate-400">• {con}</div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600">
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                6-Month Hiring Roadmap
              </CardTitle>
              <CardDescription>Strategic timeline for building your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Months 1-2 */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-400">Months 1-2: Foundation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Build core technical capabilities</p>
                  <div className="space-y-1">
                    <div className="text-sm">• Hire CTO or Lead Developer</div>
                    <div className="text-sm">• Establish development processes</div>
                    <div className="text-sm">• Set up technical infrastructure</div>
                  </div>
                </div>
                
                {/* Months 3-4 */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400">Months 3-4: Product Focus</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Enhance product development capabilities</p>
                  <div className="space-y-1">
                    <div className="text-sm">• Hire Product Manager</div>
                    <div className="text-sm">• Bring on UI/UX Designer</div>
                    <div className="text-sm">• Implement user feedback systems</div>
                  </div>
                </div>
                
                {/* Months 5-6 */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-400">Months 5-6: Growth Preparation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Prepare for scaling and market expansion</p>
                  <div className="space-y-1">
                    <div className="text-sm">• Hire Marketing Lead</div>
                    <div className="text-sm">• Add Customer Success role</div>
                    <div className="text-sm">• Plan for Series A team expansion</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h5 className="font-medium mb-2">Budget Planning</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Estimated Monthly Cost</div>
                    <div className="font-semibold text-lg">{teamCosts.monthly}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 dark:text-slate-400">Annual Team Budget</div>
                    <div className="font-semibold text-lg">{teamCosts.annual}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 