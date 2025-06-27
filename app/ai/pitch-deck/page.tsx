"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Presentation, Check, ArrowRight, Loader2 } from "lucide-react";

const pitchDeckTypes = [
  {
    id: "business-model",
    name: "Business Model",
    description: "Focus on your business model, revenue streams, and operational structure.",
    slides: 12,
  },
  {
    id: "investor-pitch",
    name: "Investor Pitch",
    description: "Optimized for securing funding with market size, traction metrics, and financial projections.",
    slides: 15,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Highlight your branding, target audience, and go-to-market strategy.",
    slides: 10,
  },
  {
    id: "hackathon-pitch",
    name: "Hackathon Pitch",
    description: "Quick, concise overview of problem, solution, and technical implementation.",
    slides: 8,
  },
  {
    id: "sales-pitch",
    name: "Sales Pitch",
    description: "Focus on product benefits, objection handling, and call to action.",
    slides: 11,
  },
  {
    id: "startup-pitch",
    name: "Startup Pitch",
    description: "Balanced overview of problem, solution, market, team, and traction.",
    slides: 14,
  },
  {
    id: "technical-pitch",
    name: "Technical Pitch",
    description: "Detailed technical architecture, implementation, and product roadmap.",
    slides: 13,
  },
];

export default function PitchDeckPage() {
  const [selectedDeckType, setSelectedDeckType] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("select");
  const [generatedDeckUrl, setGeneratedDeckUrl] = useState("");

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
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-primary">
          <Presentation className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Pitch Deck Generator</h1>
          <p className="text-slate-600 dark:text-slate-400">Create professional pitch decks tailored to your specific needs</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="select">Select Deck Type</TabsTrigger>
          <TabsTrigger value="generated" disabled={!generatedDeckUrl}>View Generated Deck</TabsTrigger>
        </TabsList>
        
        <TabsContent value="select">
          <div className="space-y-6">
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
                      className="flex flex-col h-full p-5 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer peer-data-[state=checked]:border-sky-500 dark:peer-data-[state=checked]:border-sky-600 peer-data-[state=checked]:bg-sky-50 dark:peer-data-[state=checked]:bg-sky-900/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium">{deckType.name}</div>
                        <div className="w-5 h-5 border border-slate-300 dark:border-slate-600 rounded-full flex items-center justify-center peer-data-[state=checked]:bg-sky-600 peer-data-[state=checked]:border-sky-600">
                          {selectedDeckType === deckType.id && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{deckType.description}</p>
                      <div className="mt-auto pt-3 text-xs text-slate-500 dark:text-slate-500">{deckType.slides} slides</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleGeneratePitchDeck}
                  disabled={!selectedDeckType || isGenerating}
                  className="bg-gradient-primary"
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
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-clash font-semibold mb-4">How It Works</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">1. Select Deck Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Choose the type of pitch deck that best fits your current needs and goals.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">2. AI Generation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Our AI analyzes your startup data and creates a tailored pitch deck structure.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">3. Customize & Export</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Edit the generated content, add your branding, and export in multiple formats.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="generated">
          {generatedDeckUrl && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-clash font-semibold">Your Generated Pitch Deck</h2>
                <Button className="bg-gradient-primary">
                  Download Deck
                </Button>
              </div>
              
              <div className="aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                  <p className="text-slate-500 dark:text-slate-400">Preview would appear here in a real implementation</p>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Deck Slides</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i}
                        className="aspect-[16/9] bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400"
                      >
                        Slide {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Customize Content</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Edit text and add your specific details to make the deck truly yours.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Add Visuals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Enhance with product screenshots, charts, and your company branding.</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Practice Delivery</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Rehearse your pitch with our AI coach for personalized feedback.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 