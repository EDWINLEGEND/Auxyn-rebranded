"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, RefreshCw, X, MessageSquare } from "lucide-react";
import { AiChatMessage } from "@/components/ai-chat-message";
import { InvestorSurveyModal } from "@/components/investor-survey-modal";
import { InvestmentOpportunitiesGrid } from "@/components/investment-opportunities-grid";
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

interface InvestmentOpportunity {
  id: number;
  title: string;
  description: string;
  marketOpportunity: string;
  valuation: string;
  stage: string;
  sector: string;
}

// Botpress webchat configuration
const clientId = "a0f3470d-e74a-465e-994a-c80c6398124f";
const configuration: Configuration = {
  color: '#000',
  // Custom styling will be added via CSS
};

export default function InvestorChatPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm your AI investment advisor. I'm here to help you discover and analyze investment opportunities. What type of investments are you looking for?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [investmentOpportunities, setInvestmentOpportunities] = useState<InvestmentOpportunity[]>([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState<number[]>([]);
  const [showOpportunitiesGrid, setShowOpportunitiesGrid] = useState(false);
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  
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
        --bp-webchat-border-radius: 0.75rem;
        --bp-webchat-font-family: 'Inter', sans-serif;
      }
      .bpw-chat-bubble-user {
        background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%) !important;
        color: #ffffff !important;
        border-radius: 0.75rem !important;
      }
      .bpw-chat-bubble-bot {
        background-color: #f1f5f9 !important;
        color: #0f172a !important;
        border-radius: 0.75rem !important;
      }
      .bpw-layout {
        border-radius: 0.75rem !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
        overflow: hidden;
      }
      .bpw-header-container {
        background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%) !important;
      }
      .bpw-header-title-container {
        color: #ffffff !important;
      }
      .bpw-send-button {
        background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%) !important;
        border-radius: 9999px !important;
      }
      .bpw-composer {
        padding: 0.75rem !important;
        border-top: 1px solid #e2e8f0 !important;
      }
      .bpw-composer textarea {
        border-radius: 0.5rem !important;
        border: 1px solid #e2e8f0 !important;
        padding: 0.5rem 0.75rem !important;
      }
      .bp-message {
        padding: 0.75rem 1rem !important;
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

  const sendMessage = async (content: string, action: string | null = null, opportunityId: number | null = null) => {
    // Clear any previous errors
    setError(null);
    
    // Add user message if it's a regular chat message
    if (!action || action === 'getOpportunities') {
      setMessages((prev) => [...prev, { role: "user", content }]);
    }
    
    // Clear input and set loading
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Prepare the request body
      const requestBody: any = { message: content, userType: 'investor' };
      
      // Add action and opportunityId if provided
      if (action) {
        requestBody.action = action;
      }
      
      if (opportunityId !== null) {
        requestBody.opportunityId = opportunityId;
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
      if (data.action === 'promptForOpportunities') {
        // Add assistant message with prompt for opportunities
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: data.response 
          }
        ]);
        setCurrentAction('promptForOpportunities');
      }
      else if (data.action === 'showOpportunities') {
        // Show investment opportunities
        setInvestmentOpportunities(data.opportunities || []);
        setShowOpportunitiesGrid(true);
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: data.response || "Here are some investment opportunities that match your criteria:" 
          }
        ]);
      }
      else {
        // Regular chat response
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: data.response || data.message || "I'm here to help with your investment decisions."
          }
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOpportunity = (opportunityId: number) => {
    setSelectedOpportunities(prev => 
      prev.includes(opportunityId) 
        ? prev.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    );
  };

  const handleAnalyzeOpportunities = () => {
    if (selectedOpportunities.length === 0) return;
    
    const selectedTitles = investmentOpportunities
      .filter(opp => selectedOpportunities.includes(opp.id))
      .map(opp => opp.title)
      .join(', ');
    
    sendMessage(`Please provide detailed analysis for these investment opportunities: ${selectedTitles}`, 'analyzeOpportunities');
    setShowOpportunitiesGrid(false);
    setSelectedOpportunities([]);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(false);
  };

  const handleShowOpportunities = () => {
    sendMessage("Show me investment opportunities", 'getOpportunities');
  };

  const handlePromptFromSurvey = (prompt: string) => {
    setShowSurveyModal(false);
    sendMessage(prompt);
  };

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm your AI investment advisor. I'm here to help you discover and analyze investment opportunities. What type of investments are you looking for?",
      },
    ]);
    setError(null);
    setCurrentAction(null);
    setShowOpportunitiesGrid(false);
    setSelectedOpportunities([]);
    setInvestmentOpportunities([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const CustomBotpressFab = () => {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleWebchat}
          className="rounded-full w-14 h-14 bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Investment Advisor
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get personalized investment guidance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowOpportunities}
              disabled={isLoading}
            >
              Browse Opportunities
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <AiChatMessage
            key={index}
            message={message}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-xs shadow-sm">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Analyzing opportunities...
                </span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex justify-start">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
              <div className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-red-700 dark:text-red-300 mb-2">
                    {error}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    className="text-red-700 dark:text-red-300 border-red-300 dark:border-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Investment Opportunities Grid */}
      {showOpportunitiesGrid && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Investment Opportunities
              </h3>
              <div className="flex items-center gap-2">
                {selectedOpportunities.length > 0 && (
                  <Button
                    onClick={handleAnalyzeOpportunities}
                    size="sm"
                    className="bg-gradient-primary"
                  >
                    Analyze Selected ({selectedOpportunities.length})
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOpportunitiesGrid(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <InvestmentOpportunitiesGrid
              opportunities={investmentOpportunities}
              selectedOpportunities={selectedOpportunities}
              onSelectOpportunity={handleSelectOpportunity}
            />
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask about investment opportunities, market analysis, or portfolio advice..."
              className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[52px] max-h-[120px]"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || inputValue.trim() === ""}
            className="bg-gradient-primary hover:opacity-90 px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Survey Modal */}
      {showSurveyModal && (
        <InvestorSurveyModal
          onSubmit={handlePromptFromSurvey}
          onClose={() => setShowSurveyModal(false)}
        />
      )}

      {/* Custom Botpress FAB */}
      <CustomBotpressFab />

      {/* Botpress Webchat */}
      {isWebchatOpen && client && (
        <div className="fixed bottom-24 right-6 z-40">
          <BotpressWebchatProvider client={client} configuration={configuration}>
            <div className="w-80 h-96">
              <BotpressWebchat />
            </div>
          </BotpressWebchatProvider>
        </div>
      )}
    </div>
  );
} 