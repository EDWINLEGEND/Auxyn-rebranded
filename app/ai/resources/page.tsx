"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  MessageSquare,
  TrendingUp,
  FileText,
  Download,
  Target,
  Lightbulb
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
    price: "$29/month",
    description: "Track and analyze key startup metrics with customizable dashboards and automated reporting.",
    link: "https://example.com/metricsdashboard",
  },
  {
    id: 4,
    title: "Legal Startup Guide",
    provider: "Startup Legal",
    type: "Guide",
    format: "PDF + Templates",
    duration: "Self-paced",
    topics: ["Legal Structure", "Contracts", "IP Protection"],
    level: "Beginner",
    rating: 4.5,
    reviews: 156,
    price: "$49",
    description: "Essential legal knowledge and document templates for startup founders.",
    link: "https://example.com/legalguide",
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
    title: "Former VP of Product at TechCorp",
    expertise: ["Product Strategy", "User Experience", "Team Leadership"],
    experience: "15 years",
    companies: ["TechCorp", "StartupX", "InnovateNow"],
    description: "Experienced product leader who has scaled products from MVP to millions of users.",
    rating: 4.9,
    sessions: 127,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Serial Entrepreneur & Angel Investor",
    expertise: ["Fundraising", "Business Development", "Growth Strategy"],
    experience: "12 years",
    companies: ["FounderCorp", "GrowthLabs", "ScaleUp"],
    description: "Built and sold two successful startups, now helping other founders navigate growth challenges.",
    rating: 4.8,
    sessions: 89,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600">
          <Briefcase className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Startup Resources</h1>
          <p className="text-slate-600 dark:text-slate-400">Tools, guides, and resources for successful entrepreneurship</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resources, courses, or funding opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-600">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resource Hub</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Learning Center</CardTitle>
                <CardDescription>Courses, guides, and educational content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Access Learning</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Funding Opportunities</CardTitle>
                <CardDescription>Grants, accelerators, and investor connections</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Find Funding</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Mentor Network</CardTitle>
                <CardDescription>Connect with experienced entrepreneurs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Find Mentors</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-teal-600 mb-2" />
                <CardTitle>Legal Templates</CardTitle>
                <CardDescription>Contracts, agreements, and legal documents</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Download Templates</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Analytics Tools</CardTitle>
                <CardDescription>Track metrics and measure progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Access Tools</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Growth Resources</CardTitle>
                <CardDescription>Marketing, sales, and scaling strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Explore Growth</Button>
              </CardContent>
            </Card>
          </div>

          {/* Featured Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Resources</CardTitle>
              <CardDescription>Handpicked resources for startup success</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockResources.slice(0, 3).map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{resource.provider} • {resource.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{resource.price}</div>
                      <div className="flex items-center text-sm text-yellow-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {resource.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-8">
          <div className="grid gap-6">
            {mockResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5" />
                      {resource.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{resource.type}</Badge>
                      <Badge variant="outline">{resource.level}</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {resource.price}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div>Provider: {resource.provider}</div>
                        <div>Format: {resource.format}</div>
                        <div>Duration: {resource.duration}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Topics Covered</h4>
                      <div className="flex flex-wrap gap-1">
                        {resource.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Rating</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{resource.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ({resource.reviews} reviews)
                        </span>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Access Resource
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="funding" className="space-y-8">
          <div className="grid gap-6">
            {mockGrants.map((grant) => (
              <Card key={grant.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5" />
                      {grant.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{grant.type}</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {grant.amount}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{grant.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Organization</h4>
                      <div className="space-y-2 text-sm">
                        <div>{grant.organization}</div>
                        <div>Deadline: {grant.deadline}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Focus Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {grant.focus.map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Eligibility</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {grant.eligibility}
                      </p>
                      <Button className="w-full" size="sm">
                        <Target className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentorship" className="space-y-8">
          <div className="grid gap-6">
            {mockMentors.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      {mentor.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{mentor.rating}</span>
                      </div>
                      <Badge variant="outline">{mentor.sessions} sessions</Badge>
                    </div>
                  </div>
                  <CardDescription>{mentor.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Experience</h4>
                      <div className="space-y-2 text-sm">
                        <div>{mentor.experience} experience</div>
                        <div>Companies: {mentor.companies.join(", ")}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">About</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {mentor.description}
                      </p>
                      <Button className="w-full" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
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
              Resource Library
            </CardTitle>
            <CardDescription>Download our complete startup resource pack</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600">
              <Download className="mr-2 h-4 w-4" />
              Download Resource Pack
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Get AI-powered resource recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/ai">
              <Button variant="outline" className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Recommendations
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 