"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Presentation, 
  Check, 
  ArrowRight, 
  Loader2, 
  Search, 
  Download, 
  FileText, 
  Lightbulb, 
  Target, 
  Users, 
  BarChart3, 
  DollarSign,
  Zap,
  Award,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

const pitchDeckTypes = [
  {
    id: "business-model",
    name: "Business Model",
    description: "Focus on your business model, revenue streams, and operational structure.",
    slides: 12,
    icon: <BarChart3 className="h-5 w-5" />,
    color: "text-blue-600",
  },
  {
    id: "investor-pitch",
    name: "Investor Pitch",
    description: "Optimized for securing funding with market size, traction metrics, and financial projections.",
    slides: 15,
    icon: <DollarSign className="h-5 w-5" />,
    color: "text-green-600",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Highlight your branding, target audience, and go-to-market strategy.",
    slides: 10,
    icon: <Target className="h-5 w-5" />,
    color: "text-purple-600",
  },
  {
    id: "hackathon-pitch",
    name: "Hackathon Pitch",
    description: "Quick, concise overview of problem, solution, and technical implementation.",
    slides: 8,
    icon: <Zap className="h-5 w-5" />,
    color: "text-yellow-600",
  },
  {
    id: "sales-pitch",
    name: "Sales Pitch",
    description: "Focus on product benefits, objection handling, and call to action.",
    slides: 11,
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-red-600",
  },
  {
    id: "startup-pitch",
    name: "Startup Pitch",
    description: "Balanced overview of problem, solution, market, team, and traction.",
    slides: 14,
    icon: <Award className="h-5 w-5" />,
    color: "text-indigo-600",
  },
];

const templates = [
  {
    id: 1,
    name: "Classic Investor Deck",
    description: "Time-tested format that investors expect",
    slides: ["Problem", "Solution", "Market Size", "Business Model", "Traction", "Team", "Financials", "Funding", "Use of Funds"],
    usage: "Most Popular"
  },
  {
    id: 2,
    name: "Product-First Deck",
    description: "Lead with your product and user experience",
    slides: ["Product Demo", "Problem", "Solution", "Market", "Traction", "Business Model", "Team", "Financials"],
    usage: "Tech Startups"
  },
  {
    id: 3,
    name: "Traction-Heavy Deck",
    description: "Perfect for startups with strong metrics",
    slides: ["Traction Overview", "Problem", "Solution", "Market Validation", "Growth Metrics", "Business Model", "Team", "Funding"],
    usage: "Growth Stage"
  }
];

export default function PitchDeckPage() {
  const [selectedDeckType, setSelectedDeckType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("generator");
  const [generatedDeckUrl, setGeneratedDeckUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleGeneratePitchDeck = () => {
    if (!selectedDeckType) return;
    
    setIsGenerating(true);
    
    // Simulate deck generation
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDeckUrl("/demo-pitch-deck.pdf");
      setActiveTab("generated");
    }, 3000);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
          <Presentation className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Pitch Deck Generator</h1>
          <p className="text-slate-600 dark:text-slate-400">Create professional pitch decks tailored to your specific needs</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search pitch deck templates or types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">Deck Generator</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="tips">Best Practices</TabsTrigger>
          <TabsTrigger value="generated" disabled={!generatedDeckUrl}>Generated Deck</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Deck Types</CardTitle>
                <CardDescription>Available templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pitchDeckTypes.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Professional formats</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Slides</CardTitle>
                <CardDescription>Per deck type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Optimal length</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Success Rate</CardTitle>
                <CardDescription>Template effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Funding success</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Generation Time</CardTitle>
                <CardDescription>Average duration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3min</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI-powered</div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-clash font-semibold mb-6">Choose Your Pitch Deck Type</h2>
            
            <RadioGroup 
              value={selectedDeckType || ""} 
              onValueChange={setSelectedDeckType}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {pitchDeckTypes.map((deckType) => (
                <div key={deckType.id}>
                  <RadioGroupItem
                    value={deckType.id}
                    id={deckType.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={deckType.id}
                    className="flex flex-col h-full p-5 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer peer-data-[state=checked]:border-indigo-500 dark:peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 dark:peer-data-[state=checked]:bg-indigo-900/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${deckType.color}`}>
                        {deckType.icon}
                      </div>
                      <div className="w-5 h-5 border border-slate-300 dark:border-slate-600 rounded-full flex items-center justify-center peer-data-[state=checked]:bg-indigo-600 peer-data-[state=checked]:border-indigo-600">
                        {selectedDeckType === deckType.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="font-medium mb-2">{deckType.name}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex-1">{deckType.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{deckType.slides} slides</Badge>
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleGeneratePitchDeck}
                disabled={!selectedDeckType || isGenerating}
                className="bg-gradient-to-r from-indigo-500 to-purple-600"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Pitch Deck
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-8">
          <div className="grid gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <FileText className="h-5 w-5" />
                      {template.name}
                    </CardTitle>
                    <Badge variant="outline">{template.usage}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Slide Structure</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.slides.map((slide, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {index + 1}. {slide}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600">
                        <Download className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Know Your Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Research your investors' portfolio and preferences</li>
                  <li>• Tailor your message to their investment thesis</li>
                  <li>• Understand their typical check size and stage focus</li>
                  <li>• Prepare for their common questions and concerns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Tell a Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Start with a compelling problem statement</li>
                  <li>• Show clear progression from problem to solution</li>
                  <li>• Use real customer examples and testimonials</li>
                  <li>• Create emotional connection with your mission</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Show Traction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Lead with your strongest metrics</li>
                  <li>• Show consistent growth over time</li>
                  <li>• Include both quantitative and qualitative proof</li>
                  <li>• Address any concerning trends honestly</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Be Clear About Financials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Present realistic financial projections</li>
                  <li>• Explain your revenue model clearly</li>
                  <li>• Show path to profitability</li>
                  <li>• Be specific about funding use</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="generated">
          {generatedDeckUrl && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-clash font-semibold">Your Generated Pitch Deck</h2>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Download className="mr-2 h-4 w-4" />
                  Download Deck
                </Button>
              </div>
              
              <div className="aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                  <div className="text-center">
                    <Presentation className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-500 dark:text-slate-400">Preview would appear here in a real implementation</p>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Deck Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Slides:</span>
                        <span className="font-medium">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Time:</span>
                        <span className="font-medium">12 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Template:</span>
                        <span className="font-medium">Investor Pitch</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Export Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        PowerPoint
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Google Slides
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Practice Pitch
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Target className="mr-2 h-4 w-4" />
                        Find Investors
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Track Metrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Pitch Deck Resources
            </CardTitle>
            <CardDescription>Templates, examples, and best practices</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
              <Download className="mr-2 h-4 w-4" />
              Download Resource Pack
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              AI Pitch Coach
            </CardTitle>
            <CardDescription>Get personalized feedback on your pitch</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/ai">
              <Button variant="outline" className="w-full">
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Coaching
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 