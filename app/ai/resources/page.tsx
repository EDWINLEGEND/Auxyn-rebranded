"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  Search, 
  Filter, 
  ExternalLink, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar, 
  BookOpen, 
  Award, 
  Globe, 
  Star,
  Building,
  Heart,
  Info,
  BarChart,
  Plus,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for investors
const mockInvestors = [
  {
    id: 1,
    name: "Tech Ventures Capital",
    logo: "TVC",
    type: "Venture Capital",
    stage: ["Seed", "Series A"],
    focus: ["SaaS", "AI", "FinTech"],
    minimumInvestment: "$250,000",
    location: "San Francisco, CA",
    portfolio: 42,
    description: "Tech Ventures Capital invests in early-stage tech startups with disruptive technologies and scalable business models.",
    website: "https://example.com/tvc",
  },
  {
    id: 2,
    name: "Green Growth Partners",
    logo: "GGP",
    type: "Impact Investor",
    stage: ["Seed", "Series A", "Series B"],
    focus: ["CleanTech", "Sustainability", "AgTech"],
    minimumInvestment: "$500,000",
    location: "Boston, MA",
    portfolio: 28,
    description: "Green Growth Partners funds companies focused on environmental sustainability and measurable impact alongside financial returns.",
    website: "https://example.com/ggp",
  },
  {
    id: 3,
    name: "Health Innovation Fund",
    logo: "HIF",
    type: "Strategic Investor",
    stage: ["Series A", "Series B"],
    focus: ["HealthTech", "BioTech", "Medical Devices"],
    minimumInvestment: "$1,000,000",
    location: "New York, NY",
    portfolio: 35,
    description: "Health Innovation Fund partners with entrepreneurs building the future of healthcare with innovative technologies and services.",
    website: "https://example.com/hif",
  },
  {
    id: 4,
    name: "Startup Accelerator X",
    logo: "SAX",
    type: "Accelerator",
    stage: ["Pre-seed", "Seed"],
    focus: ["All Tech"],
    minimumInvestment: "$50,000",
    location: "Austin, TX",
    portfolio: 120,
    description: "Startup Accelerator X offers a 12-week program with mentorship, resources, and initial funding to help early-stage startups gain traction.",
    website: "https://example.com/sax",
  },
  {
    id: 5,
    name: "Global Angel Network",
    logo: "GAN",
    type: "Angel Group",
    stage: ["Pre-seed", "Seed"],
    focus: ["Marketplace", "E-commerce", "Consumer Apps"],
    minimumInvestment: "$25,000",
    location: "Multiple Locations",
    portfolio: 85,
    description: "Global Angel Network connects promising startups with experienced angel investors for funding and strategic guidance.",
    website: "https://example.com/gan",
  },
];

// Mock data for grants and programs
const mockGrants = [
  {
    id: 1,
    name: "Innovation Startup Grant",
    organization: "National Science Foundation",
    amount: "Up to $225,000",
    deadline: "2024-07-15",
    focus: ["Deep Tech", "Research Commercialization"],
    eligibility: "Early-stage deep tech startups with research-based innovations",
    description: "Non-dilutive funding for R&D and commercialization of breakthrough technologies with significant societal impact.",
    website: "https://example.com/nsfgrant",
  },
  {
    id: 2,
    name: "Climate Tech Accelerator",
    organization: "Sustainable Future Foundation",
    amount: "$100,000 + Resources",
    deadline: "2024-06-30",
    focus: ["CleanTech", "Renewable Energy", "Sustainability"],
    eligibility: "Early-stage startups addressing climate challenges",
    description: "6-month accelerator program with funding, mentorship, and resources for climate tech startups.",
    website: "https://example.com/climatefund",
  },
  {
    id: 3,
    name: "Social Impact Challenge",
    organization: "Global Good Initiative",
    amount: "$50,000 - $150,000",
    deadline: "2024-08-10",
    focus: ["EdTech", "HealthTech", "Social Enterprise"],
    eligibility: "Startups with measurable social impact metrics",
    description: "Competition-based grant program for startups working on solutions to pressing social challenges.",
    website: "https://example.com/impactchallenge",
  },
  {
    id: 4,
    name: "Founder Fellowship",
    organization: "Entrepreneur's Academy",
    amount: "$25,000 + Mentorship",
    deadline: "2024-05-20",
    focus: ["All Sectors"],
    eligibility: "First-time founders from underrepresented backgrounds",
    description: "12-month fellowship providing funding, mentorship, and resources to support diverse founders building innovative startups.",
    website: "https://example.com/fellowship",
  },
  {
    id: 5,
    name: "Industry Innovation Program",
    organization: "Manufacturing Future Institute",
    amount: "Up to $300,000",
    deadline: "2024-09-05",
    focus: ["Manufacturing", "Supply Chain", "Industry 4.0"],
    eligibility: "Startups with technologies applicable to manufacturing",
    description: "Milestone-based funding program for startups developing solutions that advance the future of manufacturing.",
    website: "https://example.com/industryprogram",
  },
];

// Mock data for resources and courses
const mockResources = [
  {
    id: 1,
    title: "Startup Founder's Playbook",
    provider: "Entrepreneur's Academy",
    type: "Course",
    format: "Online | Self-paced",
    duration: "8 weeks",
    topics: ["Business Model", "Market Validation", "Fundraising"],
    level: "Beginner",
    rating: 4.8,
    reviews: 425,
    price: "Free",
    description: "Comprehensive guide for first-time founders covering all aspects of building and scaling a startup.",
    link: "https://example.com/foundersplaybook",
  },
  {
    id: 2,
    title: "Pitch Deck Masterclass",
    provider: "Venture University",
    type: "Workshop",
    format: "Online | Live",
    duration: "3 hours",
    topics: ["Pitch Strategy", "Investor Communication", "Deck Design"],
    level: "Intermediate",
    rating: 4.7,
    reviews: 189,
    price: "$99",
    description: "Learn to create compelling pitch decks that resonate with investors and effectively communicate your startup's value.",
    link: "https://example.com/pitchmasterclass",
  },
  {
    id: 3,
    title: "Startup Metrics Dashboard",
    provider: "Growth Analytics",
    type: "Tool",
    format: "Software",
    duration: "Subscription",
    topics: ["Analytics", "KPIs", "Growth Tracking"],
    level: "All Levels",
    rating: 4.6,
    reviews: 312,
    price: "Free trial, then $29/month",
    description: "All-in-one analytics dashboard for tracking key startup metrics and making data-driven decisions.",
    link: "https://example.com/metricsdashboard",
  },
  {
    id: 4,
    title: "Legal Documents for Startups",
    provider: "Startup Legal Hub",
    type: "Resource",
    format: "Templates",
    duration: "N/A",
    topics: ["Legal", "Incorporation", "Agreements"],
    level: "All Levels",
    rating: 4.9,
    reviews: 567,
    price: "Free",
    description: "Collection of customizable legal templates essential for startup formation, hiring, and investor agreements.",
    link: "https://example.com/legaltemplates",
  },
  {
    id: 5,
    title: "Growth Hacking Strategies",
    provider: "Marketing Institute",
    type: "Course",
    format: "Online | Cohort-based",
    duration: "6 weeks",
    topics: ["Customer Acquisition", "Retention", "Virality"],
    level: "Advanced",
    rating: 4.5,
    reviews: 278,
    price: "$349",
    description: "Advanced strategies for scaling startup growth with limited resources and data-driven experimentation.",
    link: "https://example.com/growthhacking",
  },
];

// Mock data for mentors
const mockMentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Serial Entrepreneur & Investor",
    avatar: "SJ",
    expertise: ["SaaS", "Growth Strategy", "Fundraising"],
    experience: "15+ years",
    companies: ["TechStart", "CloudScale", "DataSense"],
    availability: "2 hours/week",
    description: "Former founder of TechStart (acquired for $50M) who has helped over 100 startups with fundraising strategy and growth.",
    contact: "https://example.com/sarahjohnson",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Leader",
    avatar: "MC",
    expertise: ["Product Management", "UX Design", "MVP Development"],
    experience: "12+ years",
    companies: ["Google", "Airbnb", "Own Startup"],
    availability: "1 hour/week",
    description: "Product leader who built products used by millions. Specializes in helping startups find product-market fit.",
    contact: "https://example.com/michaelchen",
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Marketing Executive",
    avatar: "PP",
    expertise: ["Digital Marketing", "Brand Strategy", "Customer Acquisition"],
    experience: "10+ years",
    companies: ["Mastercard", "Shopify", "BrandGenius"],
    availability: "3 hours/week",
    description: "Marketing executive with experience scaling startups from zero to millions of users through innovative marketing strategies.",
    contact: "https://example.com/priyapatel",
  },
  {
    id: 4,
    name: "David Rodriguez",
    title: "Tech CTO",
    avatar: "DR",
    expertise: ["Technical Architecture", "Team Building", "AI/ML"],
    experience: "18+ years",
    companies: ["Microsoft", "AWS", "TechFoundry"],
    availability: "2 hours/week",
    description: "Experienced CTO who has built engineering teams at startups and Fortune 500 companies. Expert in scalable architecture.",
    contact: "https://example.com/davidrodriguez",
  },
  {
    id: 5,
    name: "Elena Kim",
    title: "Sales & Business Development",
    avatar: "EK",
    expertise: ["B2B Sales", "Strategic Partnerships", "Revenue Growth"],
    experience: "14+ years",
    companies: ["Salesforce", "Oracle", "SalesPro"],
    availability: "2 hours/week",
    description: "Sales leader who has helped startups develop and execute go-to-market strategies that drive significant revenue growth.",
    contact: "https://example.com/elenakim",
  },
];

// Add investor logos
const investorLogos = {
  "Tech Ventures Capital": "/images/logos/tvc-logo.png",
  "Green Growth Partners": "/images/logos/ggp-logo.png",
  "Health Innovation Fund": "/images/logos/hif-logo.png", 
  "Startup Accelerator X": "/images/logos/sax-logo.png",
  "Global Angel Network": "/images/logos/gan-logo.png"
};

// Add mentor profile images
const mentorImages = {
  "Sarah Johnson": "/images/mentors/sarah-johnson.jpg",
  "Michael Chen": "/images/mentors/michael-chen.jpg",
  "Priya Patel": "/images/mentors/priya-patel.jpg",
  "David Rodriguez": "/images/mentors/david-rodriguez.jpg",
  "Elena Kim": "/images/mentors/elena-kim.jpg"
};

// Add resource cover images
const resourceCovers = {
  "Startup Founder's Playbook": "/images/resources/founders-playbook.jpg",
  "Pitch Deck Masterclass": "/images/resources/pitch-deck.jpg",
  "Startup Metrics Dashboard": "/images/resources/metrics-dashboard.jpg",
  "Legal Documents for Startups": "/images/resources/legal-docs.jpg",
  "Growth Hacking Strategies": "/images/resources/growth-hacking.jpg"
};

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("investors");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Investor filters
  const [selectedInvestorType, setSelectedInvestorType] = useState("All Types");
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedFocus, setSelectedFocus] = useState("All Industries");
  
  const investorTypes = ["All Types", "Venture Capital", "Angel Group", "Accelerator", "Impact Investor", "Strategic Investor"];
  const stages = ["All Stages", "Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
  const industries = ["All Industries", "SaaS", "AI", "FinTech", "HealthTech", "CleanTech", "E-commerce", "BioTech", "AgTech"];
  
  // Grant filters
  const [selectedGrantFocus, setSelectedGrantFocus] = useState("All Focus Areas");
  const grantFocus = ["All Focus Areas", "Deep Tech", "CleanTech", "Social Impact", "Healthcare", "Education", "Manufacturing"];
  
  // Resource filters
  const [selectedResourceType, setSelectedResourceType] = useState("All Types");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  
  const resourceTypes = ["All Types", "Course", "Workshop", "Tool", "Resource", "Template", "Guide"];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
  
  // Mentor filters
  const [selectedExpertise, setSelectedExpertise] = useState("All Expertise");
  const expertise = [
    "All Expertise", 
    "Fundraising", 
    "Product Management", 
    "Marketing", 
    "Sales", 
    "Technology", 
    "Legal", 
    "Finance", 
    "Growth Strategy"
  ];
  
  // Filter functions
  const filterInvestors = () => {
    return mockInvestors.filter(investor => {
      const matchesSearch = 
        searchQuery === "" || 
        investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investor.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = 
        selectedInvestorType === "All Types" || 
        investor.type === selectedInvestorType;
      
      const matchesStage = 
        selectedStage === "All Stages" || 
        investor.stage.includes(selectedStage);
      
      const matchesFocus = 
        selectedFocus === "All Industries" || 
        investor.focus.some(f => f === selectedFocus);
      
      return matchesSearch && matchesType && matchesStage && matchesFocus;
    });
  };
  
  const filterGrants = () => {
    return mockGrants.filter(grant => {
      const matchesSearch = 
        searchQuery === "" || 
        grant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grant.organization.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFocus = 
        selectedGrantFocus === "All Focus Areas" || 
        grant.focus.some(f => f.includes(selectedGrantFocus));
      
      return matchesSearch && matchesFocus;
    });
  };
  
  const filterResources = () => {
    return mockResources.filter(resource => {
      const matchesSearch = 
        searchQuery === "" || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = 
        selectedResourceType === "All Types" || 
        resource.type === selectedResourceType;
      
      const matchesLevel = 
        selectedLevel === "All Levels" || 
        resource.level.includes(selectedLevel);
      
      return matchesSearch && matchesType && matchesLevel;
    });
  };
  
  const filterMentors = () => {
    return mockMentors.filter(mentor => {
      const matchesSearch = 
        searchQuery === "" || 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesExpertise = 
        selectedExpertise === "All Expertise" || 
        mentor.expertise.some(e => e.includes(selectedExpertise));
      
      return matchesSearch && matchesExpertise;
    });
  };
  
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Briefcase className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Resource Hub</h1>
          <p className="text-slate-600 dark:text-slate-400">Find funding, mentors, and resources to help your startup succeed</p>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for investors, grants, resources, or mentors..."
            className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="investors" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="investors" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Investors
          </TabsTrigger>
          <TabsTrigger value="grants" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Grants & Programs
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources & Courses
          </TabsTrigger>
          <TabsTrigger value="mentors" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Find a Mentor
          </TabsTrigger>
        </TabsList>
        
        {/* Investors Tab */}
        <TabsContent value="investors">
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={selectedInvestorType}
                onChange={(e) => setSelectedInvestorType(e.target.value)}
              >
                {investorTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="space-y-6">
            {filterInvestors().length > 0 ? (
              filterInvestors().map((investor) => (
                <Card key={investor.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:border-r border-slate-200 dark:border-slate-700 md:w-72 flex flex-col">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-gradient-primary text-white flex items-center justify-center text-sm font-bold overflow-hidden relative">
                          {investorLogos[investor.name as keyof typeof investorLogos] ? (
                            <Image 
                              src={investorLogos[investor.name as keyof typeof investorLogos]} 
                              alt={investor.name} 
                              fill 
                              className="object-cover"
                            />
                          ) : (
                            investor.logo
                          )}
                        </div>
                        <h3 className="text-xl font-semibold">{investor.name}</h3>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <Building className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span>{investor.type}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span>{investor.location}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <DollarSign className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span>Min: {investor.minimumInvestment}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                          <span>{investor.portfolio} Portfolio Companies</span>
                        </div>
                      </div>
                      
                      <a 
                        href={investor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-auto text-sm flex items-center gap-1 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Visit Website
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    
                    <div className="flex-1 p-6">
                      <h4 className="text-lg font-medium mb-2">About</h4>
                      <p className="text-slate-600 dark:text-slate-400 mb-6">
                        {investor.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <h5 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Investment Stage</h5>
                          <div className="flex flex-wrap gap-2">
                            {investor.stage.map((s) => (
                              <span 
                                key={s} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Industry Focus</h5>
                          <div className="flex flex-wrap gap-2">
                            {investor.focus.map((f) => (
                              <span 
                                key={f} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex gap-4">
                        <Button className="bg-gradient-primary">
                          Contact Investor
                        </Button>
                        <Button variant="outline">
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Building className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No investors found</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-4">
                  Try adjusting your filters or search terms, or check back later as we're constantly adding new investors.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Grants Tab */}
        <TabsContent value="grants">
          <div className="mb-6">
            <div className="relative w-full sm:w-64">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={selectedGrantFocus}
                onChange={(e) => setSelectedGrantFocus(e.target.value)}
              >
                {grantFocus.map((focus) => (
                  <option key={focus} value={focus}>
                    {focus}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="space-y-6">
            {filterGrants().length > 0 ? (
              filterGrants().map((grant) => (
                <Card key={grant.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold">{grant.name}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                            {grant.amount}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          By {grant.organization}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">
                          Application Deadline: {new Date(grant.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {grant.focus.map((f) => (
                        <span 
                          key={f} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Eligibility</h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{grant.eligibility}</p>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {grant.description}
                    </p>
                    
                    <div className="flex gap-4">
                      <a 
                        href={grant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-primary hover:opacity-90 focus:outline-none"
                      >
                        Apply Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                      <Button variant="outline">
                        Save for Later
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <DollarSign className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No grants or programs found</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-4">
                  Try adjusting your search terms or filters, or check back later as we regularly update our database of funding opportunities.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources">
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={selectedResourceType}
                onChange={(e) => setSelectedResourceType(e.target.value)}
              >
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterResources().length > 0 ? (
              filterResources().map((resource) => (
                <Card key={resource.id} className="flex flex-col h-full">
                  <CardHeader>
                    <div className="relative w-full h-32 mb-4 -mt-2 -mx-2 overflow-hidden rounded-t-lg">
                      <Image 
                        src={resourceCovers[resource.title as keyof typeof resourceCovers] || "/images/resources/default-resource.jpg"} 
                        alt={resource.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <CardTitle className="text-lg mb-1 drop-shadow-sm">{resource.title}</CardTitle>
                        <CardDescription className="text-slate-200">By {resource.provider}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-start justify-end">
                      <span className={`
                        px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${resource.price === "Free" 
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" 
                          : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                        }
                      `}>
                        {resource.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                        {resource.type}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                        {resource.format}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                        <Star className="fill-amber-500 text-amber-500 h-3.5 w-3.5" />
                        {resource.rating}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Topics Covered</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {resource.topics.map((topic) => (
                          <span 
                            key={topic} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                        <span className="text-xs">{resource.level}</span>
                      </div>
                      {resource.duration && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          <span className="text-xs">{resource.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
                        <span className="text-xs">{resource.reviews} reviews</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {resource.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-primary hover:opacity-90 focus:outline-none"
                    >
                      Access Resource
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
                <BookOpen className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-4">
                  Try adjusting your filters or search terms to find the resources you're looking for.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Mentors Tab */}
        <TabsContent value="mentors">
          <div className="mb-6">
            <div className="relative w-full sm:w-64">
              <select
                className="appearance-none w-full pl-4 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
              >
                {expertise.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filterMentors().length > 0 ? (
              filterMentors().map((mentor) => (
                <Card key={mentor.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 relative">
                        <div className="w-16 h-16 rounded-lg bg-gradient-primary text-white flex items-center justify-center text-xl font-bold flex-shrink-0 overflow-hidden relative">
                          {mentorImages[mentor.name as keyof typeof mentorImages] ? (
                            <Image 
                              src={mentorImages[mentor.name as keyof typeof mentorImages]}
                              alt={mentor.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            mentor.avatar
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{mentor.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{mentor.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Award className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium">{mentor.experience} experience</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((exp) => (
                          <span 
                            key={exp} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Previous Companies</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.companies.map((company) => (
                          <span 
                            key={company} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span>Available for {mentor.availability}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {mentor.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-4">
                      <a 
                        href={mentor.contact} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-primary hover:opacity-90 focus:outline-none"
                      >
                        Request Mentorship
                      </a>
                      <Button variant="outline">
                        <Heart className="mr-2 h-4 w-4" />
                        Save Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                <Users className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No mentors found</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-4">
                  Try adjusting your search terms or expertise filter to find a mentor that matches your needs.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-10 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="text-sky-600 dark:text-sky-400 h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium mb-2">Need Help Finding Resources?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Our AI assistant can help you identify the most relevant funding sources, resources, and mentors based on your specific startup needs.
            </p>
            <Button className="bg-gradient-primary">
              <BarChart className="mr-2 h-4 w-4" />
              Get Personalized Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 