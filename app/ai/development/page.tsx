"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  UserPlus
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
      "Growth Marketer"
    ],
    timeline: "Seed to Series A",
    fundingStage: "$500K - $2M",
    pros: ["Diverse skill set", "Specialized expertise", "Sustainable workload"],
    cons: ["Higher burn rate", "More complex coordination", "Potential communication challenges"]
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
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  
  // Filter roles based on priority or type
  const [roleFilter, setRoleFilter] = useState("all");
  
  const filteredRoles = mockRoles.filter(role => {
    if (roleFilter === "all") return true;
    if (roleFilter === "high") return role.priority === "High";
    if (roleFilter === "medium") return role.priority === "Medium";
    if (roleFilter === "low") return role.priority === "Low";
    return role.type === roleFilter;
  });
  
  // Generate job description from a role
  const generateJobDescription = (role: Role) => {
    const company = {
      name: "Your Startup",
      description: "a fast-growing startup focused on building innovative solutions that...",
      industry: "your industry",
      email: "careers@yourstartup.com"
    };
    
    let description = jobDescriptionTemplate
      .replace(/\[JOB_TITLE\]/g, role.title)
      .replace(/\[COMPANY_NAME\]/g, company.name)
      .replace(/\[COMPANY_DESCRIPTION\]/g, company.description)
      .replace(/\[COMPANY_INDUSTRY\]/g, company.industry)
      .replace(/\[MAIN_RESPONSIBILITY\]/g, role.responsibilities[0])
      .replace(/\[EMAIL\]/g, company.email);
    
    // Format responsibilities as bullet points
    const responsibilitiesHTML = role.responsibilities
      .map((r: string) => `- ${r}`)
      .join('\n');
    description = description.replace('[RESPONSIBILITIES]', responsibilitiesHTML);
    
    // Format skills as bullet points
    const skillsHTML = role.skills
      .map((s: string) => `- ${s}`)
      .join('\n');
    description = description.replace('[SKILLS]', skillsHTML);
    
    // Format compensation
    const compensationDetails = `${role.compensation.type} (${role.compensation.equity} equity, ${role.compensation.salary} salary range)`;
    description = description.replace('[COMPENSATION_DETAILS]', compensationDetails);
    
    return description;
  };
  
  // Calculate team costs
  const calculateTeamCosts = () => {
    // Parse salary ranges to get average values
    const getAverageSalary = (salaryRange: string) => {
      const matches = salaryRange.match(/\$(\d+),(\d+)-\$(\d+),(\d+)/);
      if (!matches) return 0;
      
      const min = parseInt(matches[1] + matches[2]);
      const max = parseInt(matches[3] + matches[4]);
      return (min + max) / 2;
    };
    
    const monthlyCost = mockRoles.reduce((total, role) => {
      if (role.status !== "To be filled") return total;
      return total + (getAverageSalary(role.compensation.salary) / 12);
    }, 0);
    
    const annualCost = monthlyCost * 12;
    
    return {
      monthly: monthlyCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      annual: annualCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    };
  };
  
  const teamCosts = calculateTeamCosts();
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Team Development</h1>
          <p className="text-slate-600 dark:text-slate-400">Build the perfect team to execute your startup vision</p>
        </div>
      </div>
      
      <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Key Roles & Responsibilities
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Structure Templates
          </TabsTrigger>
          <TabsTrigger value="costs" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Team Cost Planning
          </TabsTrigger>
        </TabsList>
        
        {/* Roles Tab */}
        <TabsContent value="roles">
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
            
            <Button className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add New Role
            </Button>
          </div>
          
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
                    
                    <div className="mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                      >
                        {selectedRole === role.id ? "Hide Details" : "View Details"}
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
                            <span 
                              key={i} 
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-medium mb-3">Compensation Details</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-slate-500" />
                              <span className="text-sm">Salary Range: {role.compensation.salary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-slate-500" />
                              <span className="text-sm">Equity: {role.compensation.equity}</span>
                            </div>
                            <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                              <span className="font-medium">Rationale:</span> {role.equityRationale}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium mb-3">Notes & Considerations</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            {role.notes}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Start Recruiting
                        </Button>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Job Description
                        </Button>
                        <Button variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
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
        
        {/* Team Templates Tab */}
        <TabsContent value="templates">
          <div className="mb-6">
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
              Choose a team structure template based on your startup's stage, funding level, and goals. These templates provide recommended team compositions and can be customized to your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`${
                  selectedTeam === template.id 
                    ? 'ring-2 ring-sky-500 dark:ring-sky-400' 
                    : 'hover:border-sky-200 dark:hover:border-sky-800 transition-colors cursor-pointer'
                }`}
                onClick={() => setSelectedTeam(selectedTeam === template.id ? null : template.id)}
              >
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <h4 className="font-medium">Core Team Roles</h4>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      {template.roles.map((role, i) => (
                        <li key={i}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-500 flex-shrink-0" />
                      <span className="text-sm">Best for: {template.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-slate-500 flex-shrink-0" />
                      <span className="text-sm">Funding: {template.fundingStage}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">Pros</h5>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {template.pros.map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Cons</h5>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        {template.cons.map((con, i) => (
                          <li key={i}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-gradient-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Apply template logic would go here
                    }}
                  >
                    Use This Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-medium mb-4">Team Building Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Early-Stage (Pre-seed to Seed)</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>Focus on generalists who can wear multiple hats</li>
                  <li>Prioritize core product development and market validation</li>
                  <li>Consider part-time or fractional roles for specialized needs</li>
                  <li>Maximize equity allocation for critical early team members</li>
                  <li>Establish clear founder responsibilities and decision processes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Growth Stage (Series A and beyond)</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>Shift toward specialists as product and market mature</li>
                  <li>Implement structured hiring processes and clear role definitions</li>
                  <li>Develop career ladders and growth paths within the organization</li>
                  <li>Balance team for scalability, stability, and innovation</li>
                  <li>Create management layers as team size increases</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Team Costs Tab */}
        <TabsContent value="costs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Projected Team Size</CardTitle>
                <CardDescription>Based on defined roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{mockRoles.filter(r => r.status === "To be filled").length}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Initial team members</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Monthly Burn Rate</CardTitle>
                <CardDescription>Estimated team salary costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{teamCosts.monthly}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Average monthly spend</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Annual Team Budget</CardTitle>
                <CardDescription>Projected yearly cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{teamCosts.annual}</div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total annual compensation</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-medium mb-4">Team Composition Breakdown</h3>
            
            <div className="relative overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Priority</th>
                    <th className="px-4 py-3 font-medium">Timeline</th>
                    <th className="px-4 py-3 font-medium">Equity</th>
                    <th className="px-4 py-3 font-medium">Salary Range</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRoles.map((role) => (
                    <tr key={role.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="px-4 py-3 font-medium">{role.title}</td>
                      <td className="px-4 py-3">{role.type}</td>
                      <td className="px-4 py-3">
                        <span className={`
                          inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                          ${role.priority === "High" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300" : 
                            role.priority === "Medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300" :
                            "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"}
                        `}>
                          {role.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">{role.timeline}</td>
                      <td className="px-4 py-3">{role.compensation.equity}</td>
                      <td className="px-4 py-3">{role.compensation.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alternative Hiring Options</CardTitle>
                <CardDescription>Cost-effective strategies for early-stage startups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Part-time & Fractional Roles</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Engage experienced professionals on a part-time basis to reduce costs while accessing expertise.
                    </p>
                    <div className="flex items-center justify-between text-sm bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                      <span>Example: Fractional CTO (10hrs/week)</span>
                      <span className="font-medium">$3,000-5,000/month</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Contractors & Freelancers</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Engage specialists for specific projects or deliverables without long-term commitments.
                    </p>
                    <div className="flex items-center justify-between text-sm bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                      <span>Example: UI/UX Designer (project-based)</span>
                      <span className="font-medium">$3,000-8,000/project</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Advisors & Mentors</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Bring on strategic advisors for guidance in exchange for small equity grants.
                    </p>
                    <div className="flex items-center justify-between text-sm bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                      <span>Example: Industry Expert Advisor</span>
                      <span className="font-medium">0.1-0.5% equity vested over 2 years</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Equity Allocation Strategy</CardTitle>
                <CardDescription>Guidelines for distributing equity to your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Employee Option Pool</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Recommended allocation for your employee equity pool based on stage.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Pre-seed/Seed:</span>
                        <span className="font-medium">10-15% of cap table</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Series A:</span>
                        <span className="font-medium">15-20% of cap table</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Equity Guidelines by Role</h4>
                    <div className="relative overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                      <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                          <tr>
                            <th className="px-3 py-2 text-left font-medium">Role Level</th>
                            <th className="px-3 py-2 text-right font-medium">Typical Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-3 py-2">C-Level/VP (First 3 hires)</td>
                            <td className="px-3 py-2 text-right">1-5%</td>
                          </tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-3 py-2">Directors/Team Leads</td>
                            <td className="px-3 py-2 text-right">0.5-1.5%</td>
                          </tr>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <td className="px-3 py-2">Senior Individual Contributors</td>
                            <td className="px-3 py-2 text-right">0.25-1%</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Junior/Mid-level</td>
                            <td className="px-3 py-2 text-right">0.05-0.25%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 