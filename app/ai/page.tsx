"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  RefreshCw, 
  X, 
  MessageSquare, 
  Lightbulb, 
  Search, 
  Sparkles, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  BarChart3,
  Zap,
  Rocket
} from "lucide-react";
import { AiChatMessage } from "@/components/ai-chat-message";
import { IdeasSurveyModal } from "@/components/ideas-survey-modal";
import { StartupIdeasGrid } from "@/components/startup-ideas-grid";
import dynamic from 'next/dynamic';

// Dynamically import Botpress components to avoid SSR issues
const BotpressWebchat = dynamic(
  () => import('@botpress/webchat').then((mod) => mod.Webchat),
  { ssr: false }
);

const BotpressWebchatProvider = dynamic(
  () => import('@botpress/webchat').then((mod) => mod.WebchatProvider),
  { ssr: false }
);

import { Configuration } from '@botpress/webchat';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface StartupIdea {
  id: number;
  title: string;
  description: string;
  marketOpportunity: string;
}

// Botpress webchat configuration
const clientId = "a0f3470d-e74a-465e-994a-c80c6398124f";
const configuration: Configuration = {
  color: '#000',
  // Custom styling will be added via CSS
};

export default function AiChatPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm your AI startup mentor. I'm here to help you validate and develop your startup idea. What are you working on?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startupIdeas, setStartupIdeas] = useState<StartupIdea[]>([]);
  const [selectedIdeas, setSelectedIdeas] = useState<number[]>([]);
  const [showIdeasGrid, setShowIdeasGrid] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [searchTerm, setSearchTerm] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Initialize Botpress client - moved to useEffect to avoid SSR issues
  const [client, setClient] = useState<any>(null);
  
  useEffect(() => {
    // Dynamically import getClient to avoid SSR issues
    import('@botpress/webchat').then(({ getClient }) => {
      const botpressClient = getClient({
        clientId,
      });
      setClient(botpressClient);
    }).catch(error => {
      console.error('Failed to load Botpress client:', error);
    });
  }, []);

  // Add custom styles to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bp-webchat-border-radius: 1rem;
        --bp-webchat-font-family: 'Inter', sans-serif;
      }
      .bpw-chat-bubble-user {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
        color: #ffffff !important;
        border-radius: 1rem !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
      }
      .bpw-chat-bubble-bot {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
        color: #0f172a !important;
        border-radius: 1rem !important;
        border: 1px solid #e2e8f0 !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
      }
      .bpw-layout {
        border-radius: 1rem !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        overflow: hidden;
        border: 1px solid #e2e8f0 !important;
      }
      .bpw-header-container {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
        padding: 1rem !important;
      }
      .bpw-header-title-container {
        color: #ffffff !important;
        font-weight: 600 !important;
      }
      .bpw-send-button {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%) !important;
        border-radius: 0.75rem !important;
        padding: 0.5rem !important;
        transition: all 0.2s ease !important;
      }
      .bpw-send-button:hover {
        transform: scale(1.05) !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
      }
      .bpw-composer {
        padding: 1rem !important;
        border-top: 1px solid #e2e8f0 !important;
        background: #fafafa !important;
      }
      .bpw-composer textarea {
        border-radius: 0.75rem !important;
        border: 1px solid #e2e8f0 !important;
        padding: 0.75rem 1rem !important;
        background: #ffffff !important;
        transition: all 0.2s ease !important;
      }
      .bpw-composer textarea:focus {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
      }
      .bp-message {
        padding: 1rem !important;
        margin: 0.5rem 0 !important;
      }
      .bpw-typing-bubble {
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%) !important;
        border-radius: 1rem !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "" || isLoading) return;

    sendMessage(inputValue);
  };

  const sendMessage = async (content: string, action: string | null = null, ideaId: number | null = null) => {
    // Clear any previous errors
    setError(null);
    
    // Add user message if it's a regular chat message
    if (!action || action === 'getIdeas') {
      setMessages((prev) => [...prev, { role: "user", content }]);
    }
    
    // Clear input and set loading
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Prepare the request body
      const requestBody: any = { message: content };
      
      // Add action and ideaId if provided
      if (action) {
        requestBody.action = action;
      }
      
      if (ideaId !== null) {
        requestBody.ideaId = ideaId;
      }
      
      // Send message to ChatGPT via our API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to get response from ChatGPT');
      }
      
      // Handle different response types based on action
      if (data.action === 'promptForIdeas') {
        // Add assistant message with prompt for ideas
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: data.response 
          }
        ]);
        setCurrentAction('promptForIdeas');
      }
      else if (data.action === 'showIdeas') {
        // Display startup ideas
        setStartupIdeas(data.ideas || []);
        setShowIdeasGrid(true);
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: data.response || "Here are some startup ideas based on your interests:" 
          }
        ]);
      }
      else {
        // Regular chat response
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      }
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to send message. Please try again.');
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectIdea = (ideaId: number) => {
    if (selectedIdeas.includes(ideaId)) {
      setSelectedIdeas(selectedIdeas.filter(id => id !== ideaId));
    } else {
      setSelectedIdeas([...selectedIdeas, ideaId]);
    }
  };

  const handleAnalyzeSelectedIdeas = () => {
    if (selectedIdeas.length === 0) {
      setError("Please select at least one idea to analyze.");
      return;
    }

    const selectedIdeaTitles = startupIdeas
      .filter(idea => selectedIdeas.includes(idea.id))
      .map(idea => idea.title)
      .join(", ");

    sendMessage(`Please analyze these startup ideas: ${selectedIdeaTitles}`, 'analyzeIdeas');
    setShowIdeasGrid(false);
    setSelectedIdeas([]);
  };

  const handleRetry = () => {
    if (messages.length > 1) {
      const lastUserMessage = messages.slice().reverse().find(msg => msg.role === "user");
      if (lastUserMessage) {
        // Remove the last assistant message (which was likely an error)
        setMessages(prev => prev.slice(0, -1));
        sendMessage(lastUserMessage.content);
      }
    }
  };

  const handleShowIdeas = () => {
    sendMessage("Show me some startup ideas", 'getIdeas');
  };

  const handlePromptFromSurvey = (prompt: string) => {
    setShowSurveyModal(false);
    sendMessage(prompt);
  };

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm your AI startup mentor. I'm here to help you validate and develop your startup idea. What are you working on?",
      },
    ]);
    setError(null);
    setCurrentAction(null);
    setShowIdeasGrid(false);
    setSelectedIdeas([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const CustomBotpressFab = () => {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={toggleWebchat}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-20" />
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">AI Startup Mentor</h1>
          <p className="text-slate-600 dark:text-slate-400">Get personalized guidance for your startup journey</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Ask me anything about startups, business models, or entrepreneurship..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Search className="h-4 w-4 mr-2" />
            Ask AI
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="ideas">Idea Generator</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Chats</CardTitle>
                <CardDescription>Conversations today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current session</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Messages</CardTitle>
                <CardDescription>In this chat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{messages.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total exchanges</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">AI Response</CardTitle>
                <CardDescription>Average time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Lightning fast</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Topics Covered</CardTitle>
                <CardDescription>Discussion areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Business areas</div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI Startup Mentor</h3>
                    <p className="text-white/80 text-sm">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleNewChat} className="text-white hover:bg-white/20">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <AiChatMessage
                    key={index}
                    message={message}
                    isLoading={index === messages.length - 1 && isLoading}
                  />
                ))}
                {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                  <AiChatMessage isLoading={true} />
                )}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                    <Button variant="ghost" size="sm" onClick={handleRetry} className="text-red-700 dark:text-red-400">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask me anything about your startup..."
                    className="w-full min-h-[44px] max-h-32 resize-none rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    rows={1}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || inputValue.trim() === ""}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-8">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Idea Generator
                </CardTitle>
                <CardDescription>Generate personalized startup ideas based on your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleShowIdeas} className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Ideas
                </Button>
              </CardContent>
            </Card>

            {showIdeasGrid && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <StartupIdeasGrid
                  ideas={startupIdeas}
                  selectedIdeas={selectedIdeas}
                  onSelectIdea={handleSelectIdea}
                  onAnalyzeSelected={handleAnalyzeSelectedIdeas}
                />
              </motion.div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Market Validation</CardTitle>
                <CardDescription>Validate your startup idea with AI analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Validate Idea</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Business Model</CardTitle>
                <CardDescription>Design and optimize your business model</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Build Model</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Customer Analysis</CardTitle>
                <CardDescription>Understand your target customers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Analyze Customers</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Financial Planning</CardTitle>
                <CardDescription>Create financial projections and models</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Plan Finances</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle>Growth Strategy</CardTitle>
                <CardDescription>Develop strategies for rapid growth</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Plan Growth</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Launch Plan</CardTitle>
                <CardDescription>Create a comprehensive launch strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Plan Launch</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-8">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights Dashboard</CardTitle>
                <CardDescription>Personalized recommendations based on your conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Market Opportunity</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Based on your discussions, there's significant potential in the AI/ML space</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">Next Steps</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">Consider validating your idea with potential customers</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">Resources</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Check out our pitch deck generator for investor presentations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Survey Modal */}
      <AnimatePresence>
        {showSurveyModal && (
          <IdeasSurveyModal
            onClose={() => setShowSurveyModal(false)}
            onSubmit={handlePromptFromSurvey}
          />
        )}
      </AnimatePresence>

      {/* Botpress Webchat */}
      {client && (
        <BotpressWebchatProvider client={client} configuration={configuration}>
          <div style={{ display: isWebchatOpen ? 'block' : 'none' }}>
            <div className="fixed bottom-24 right-6 z-40 w-80 h-96">
              <BotpressWebchat />
            </div>
          </div>
        </BotpressWebchatProvider>
      )}

      {/* Custom FAB */}
      <CustomBotpressFab />
    </div>
  );
}