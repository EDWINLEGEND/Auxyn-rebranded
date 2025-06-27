"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, RefreshCw, X, MessageSquare } from "lucide-react";
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
        // Store startup ideas and show the grid
        setStartupIdeas(data.ideas || []);
        setSelectedIdeas(data.selectedIdeas || []);
        setShowIdeasGrid(true);
        setCurrentAction('showIdeas');
      }
      else if (data.action === 'developIdea') {
        // Add assistant message with the development response
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: `**Developing: ${data.selectedIdea.title}**\n\n${data.response}` 
          }
        ]);
        setShowIdeasGrid(false);
        setCurrentAction(null);
      }
      else {
        // Regular chat response
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            content: data.response 
          }
        ]);
        setCurrentAction(null);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Store the error message
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      
      // Add error message
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I'm sorry, I encountered an error while processing your request. Please try again later." 
        }
      ]);
      setCurrentAction(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectIdea = (ideaId: number) => {
    // Update selected ideas list
    if (selectedIdeas.includes(ideaId)) {
      // If already selected, develop this idea
      const selectedIdea = startupIdeas.find(idea => idea.id === ideaId);
      if (selectedIdea) {
        // Add a user message showing selection
        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            content: `I'd like to develop the "${selectedIdea.title}" idea.`
          }
        ]);
        
        // Send the selection to the API
        sendMessage(`Develop idea: ${selectedIdea.title}`, 'selectIdea', ideaId);
      }
    } else {
      // First selection - add to selected ideas
      setSelectedIdeas((prev) => [...prev, ideaId]);
    }
  };

  const handleRetry = () => {
    // Get the last user message
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === "user");
    
    if (lastUserMessage) {
      // Remove the last two messages (user message and error response)
      setMessages(messages.slice(0, -2));
      
      // Resend the last user message
      sendMessage(lastUserMessage.content);
    }
  };

  const handleShowIdeas = () => {
    if (currentAction === 'promptForIdeas') {
      sendMessage('Yes, show me some startup ideas', 'getIdeas', null);
    }
  };

  const handlePromptFromSurvey = (prompt: string) => {
    // Add the generated prompt to the chat as a user message
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
    setShowIdeasGrid(false);
    setCurrentAction(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Custom styled Botpress FAB button
  const CustomBotpressFab = () => {
    return (
      <Button
        onClick={toggleWebchat}
        variant="default"
        size="icon"
        className={cn(
          "h-12 w-12 rounded-full shadow-lg",
          "bg-gradient-to-br from-blue-500 to-blue-600",
          "hover:from-blue-600 hover:to-blue-700",
          "transition-all duration-300 ease-in-out",
          "flex items-center justify-center"
        )}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Botpress Webchat */}
      <div className="fixed bottom-20 right-8 z-40">
        {client && (
          <BotpressWebchatProvider client={client} configuration={configuration}>
            <CustomBotpressFab />
            <AnimatePresence>
              {isWebchatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "absolute bottom-16 right-0",
                    "w-80 md:w-96 h-[550px]",
                    "rounded-xl overflow-hidden",
                    "shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50",
                    "border border-slate-200 dark:border-slate-700"
                  )}
                >
                  <div className="relative h-full">
                    <div className="absolute top-3 right-3 z-10">
                      <Button
                        onClick={toggleWebchat}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="h-full">
                      <BotpressWebchat />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BotpressWebchatProvider>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden p-4 md:p-8 flex flex-col">
        {/* Main Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <AiChatMessage 
                  key={index} 
                  message={message} 
                  isLoading={isLoading && index === messages.length - 1 && message.role === "user"} 
                />
              ))}
              
              {/* Show ideas prompt buttons when appropriate */}
              {currentAction === 'promptForIdeas' && (
                <div className="flex justify-center space-x-3 mt-4">
                  <Button
                    onClick={handleShowIdeas}
                    variant="default"
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Yes, show me ideas
                  </Button>
                  <Button
                    onClick={() => {
                      sendMessage("No, I have my own idea", null, null);
                      setCurrentAction(null);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    No, I have my own idea
                  </Button>
                </div>
              )}
              
              {/* Startup Ideas Grid */}
              {showIdeasGrid && (
                <div className="my-6">
                  <StartupIdeasGrid
                    ideas={startupIdeas}
                    selectedIdeas={selectedIdeas}
                    onSelectIdea={handleSelectIdea}
                    onClose={() => setShowIdeasGrid(false)}
                  />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Error Message and Retry Button */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
              <div className="max-w-3xl mx-auto flex items-center justify-between">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
                <Button 
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="ml-4 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          )}
          
          {/* Chat Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <textarea
                  ref={inputRef}
                  className="w-full px-4 py-3 pr-12 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Ask me anything about your startup..."
                  rows={1}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 bg-transparent"
                  disabled={inputValue.trim() === "" || isLoading}
                >
                  <Send size={20} />
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Ideas Survey Modal */}
        <IdeasSurveyModal
          isOpen={showSurveyModal}
          onClose={() => setShowSurveyModal(false)}
          onGeneratePrompt={handlePromptFromSurvey}
        />
      </div>
    </div>
  );
}